import { Prisma, type PrismaClient } from "@prisma/client";
import { z } from "zod";

import type {
  JournalFilterValidation,
  JournalSortValidation
} from "src/utils/validation/journalEntries/getJournalValidation";

import { rawJournalQueryReturnValidation } from "../../../../../utils/validation/category/rawJournalQueryReturnValidation";
import { filtersToSQLQuery } from "./filtersToSQLQuery";
import { orderByToSQLQuery } from "./orderByToSQLQuery";

const addIsAdminSQL = ({
  userId
}: {
  userId: string;
}) => Prisma.sql`(SELECT COUNT(*) > 0 as count
FROM "AccountGrouping"
LEFT JOIN "_AdminUsers" ON "_AdminUsers"."A" = "AccountGrouping".ID
LEFT JOIN "User" ON "User".ID = "_AdminUsers"."B"
WHERE "AccountGrouping".ID = THEJOURNAL."accountGroupingId"
  AND "User".id = ${userId}) as "isAdmin"`;

const addOtherJournalsSQL = Prisma.sql`ARRAY_TO_JSON(ARRAY
  (SELECT JSON_BUILD_OBJECT('transactionId',
                "Transaction".ID,
                'journalId',
                "otherJournal"."id",
                'amount',
                "otherJournal"."amount") AS DATA
    FROM "Transaction"
    LEFT JOIN "JournalEntry" "otherJournal" ON "Transaction".ID = "otherJournal"."transactionId"
    WHERE "Transaction".ID = THEJOURNAL."transactionId"
      AND "otherJournal".ID != THEJOURNAL.ID )) AS OTHERJOURNALS`;

export const journalsWithStatsSQL = async ({
  prisma,
  orderByInput,
  take,
  skip,
  filters,
  userId
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  orderBy?:
    | Prisma.Enumerable<Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput>
    | undefined;
  orderByInput?: JournalSortValidation;
  take: number;
  skip: number;
  filters: JournalFilterValidation[] | undefined;
  userId: string;
}) => {
  const id = new Date().toISOString();

  console.time(`${id} - rawTimer`);

  const filtersSql = await filtersToSQLQuery({ filters, userId, prisma });
  const orderBySql = orderByToSQLQuery({ orderBy: orderByInput });

  const combinedSQL = Prisma.sql`
        SELECT THEJOURNAL.*,
          ${addOtherJournalsSQL},
          ${addIsAdminSQL({ userId })}
        FROM
          (SELECT *
            FROM "JournalEntryView"
            WHERE ${filtersSql}
            ORDER BY ${orderBySql}
            LIMIT ${take}
            OFFSET ${Math.max(skip, 0)}) AS THEJOURNAL;`;

  const combinedSQLTotal = Prisma.sql`
            SELECT sum(amount) as total
            FROM
              (SELECT amount
                FROM "JournalEntryView"
                WHERE ${filtersSql}
                ORDER BY ${orderBySql}
                OFFSET ${Math.max(skip, 0) + take}) AS THEJOURNAL;`;

  const combinedSQLCount = Prisma.sql`
            SELECT count(*) as "journalCount"
            FROM
                  (SELECT *
                    FROM "JournalEntryView"
                    WHERE ${filtersSql}
                    ORDER BY ${orderBySql}) as THEJOURNAL;`;

  console.log("Offset", skip);
  const [rawResult, rawCountResult, rawTotalResult] = await Promise.all([
    prisma.$queryRaw`${combinedSQL}`,
    prisma.$queryRaw`${combinedSQLCount}`,
    prisma.$queryRaw`${combinedSQLTotal}`
  ]);
  const rawResultsProcessed = rawJournalQueryReturnValidation.parse(rawResult);
  const journalCount = z
    .array(
      z.object({
        journalCount: z.bigint()
      })
    )
    .transform((data) => {
      if (data[0]) {
        return Number(data[0].journalCount);
      }
      return 0;
    })
    .parse(rawCountResult);

  const total = z
    .array(z.object({ total: z.unknown() }))
    .transform((data) => {
      if (data[0]) {
        const val = data[0].total as Prisma.Decimal | null;
        return val ? val.toNumber() : 0;
      }
      return 0;
    })
    .parse(rawTotalResult);

  console.timeEnd(`${id} - rawTimer`);

  console.log("First Result", rawResultsProcessed[0]);

  return { total, journalCount, journals: rawResultsProcessed };
};
