import type { CreateBillInput } from '$lib/server/graphqlServer/types/generated-resolvers';
import { billInclude } from '$lib/server/graphqlServer/types/models';
import type { Prisma, PrismaClient } from '@prisma/client';

import { basicStatusToDBRequired } from '../general/basicStatusToDB';
import { checkAGAccess } from '../general/checkAGAccess';
import { BillCreateValidation, type CreateBillValidatedData } from './BillCreateUpdateValidation';

export const CreateBill = async ({
	client,
	userId,
	admin,
	data
}: {
	client: Prisma.TransactionClient | PrismaClient;
	userId: string;
	admin: boolean;
	data: CreateBillValidatedData | CreateBillInput;
}) => {
	const validatedInput = BillCreateValidation.parse(data);

	const { accountGroupingId, ...rest } = validatedInput;

	//Check Account Grouping Access
	await checkAGAccess({ accountGroupingId, admin, userId, needsAdminAccess: true });

	return client.bill.create({
		data: {
			...rest,
			accountGrouping: { connect: { id: accountGroupingId } },
			...basicStatusToDBRequired(rest.status)
		},
		include: billInclude
	});
};
