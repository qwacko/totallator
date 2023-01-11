import { Prisma } from "@prisma/client";

import type { JournalSortValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const orderByToSQLQuery = ({
  orderBy
}: {
  orderBy: JournalSortValidation | undefined;
}) => {
  if (!orderBy) {
    return Prisma.sql` "JournalEntryView"."date" DESC, "JournalEntryView"."amount" ASC, "JournalEntryView"."createdAt" ASC, "JournalEntryView"."id" ASC`;
  }

  let hasDate = false;
  let hasAmount = false;
  let hasCreatedAt = false;

  const data = orderBy.map((item) => {
    let returnData = Prisma.sql`${Prisma.empty}`;

    if (item.key === "account") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."accountTitle"`;
    } else if (item.key === "amount") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."amount"`;
      hasAmount = true;
    } else if (item.key === "bill") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."billTitle"`;
    } else if (item.key === "budget") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."budgetTitle"`;
    } else if (item.key === "category") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."categoryTitle"`;
    } else if (item.key === "tag") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."tagTitle"`;
    } else if (item.key === "date") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."date"`;
      hasDate = true;
    } else if (item.key === "description") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."description"`;
    } else if (item.key === "createdAt") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."createdAt"`;
      hasCreatedAt = true;
    } else if (item.key === "updatedAt") {
      returnData = Prisma.sql`${returnData} "JournalEntryView"."updatedAt"`;
    }

    if (item.direction === "asc") {
      return Prisma.sql`${returnData} ASC`;
    }
    return Prisma.sql`${returnData} DESC`;
  });

  return Prisma.sql`${Prisma.join(data, ",")} ${
    hasDate ? Prisma.empty : Prisma.sql` , "JournalEntryView"."date" DESC`
  } ${
    hasAmount ? Prisma.empty : Prisma.sql` , "JournalEntryView"."amount" DESC`
  } ${
    hasCreatedAt
      ? Prisma.empty
      : Prisma.sql` , "JournalEntryView"."createdAt" DESC`
  } , "JournalEntryView"."id" ASC `;
};
