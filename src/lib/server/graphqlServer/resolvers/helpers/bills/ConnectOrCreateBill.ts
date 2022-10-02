import type { BillFilter, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import { billInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

import { BillCreateValidation, type CreateBillValidatedData } from './BillCreateUpdateValidation';
import { CreateBill } from './CreateBill';
import { billFilterBuilder } from './billFilterBuilder';

export const BillCreateValidatedToFilter = (
	data: CreateBillValidatedData
): InputMaybe<BillFilter> => ({
	status: { equals: data.status },
	title: { equals: data.title },
	accountGroupingId: { equals: data.accountGroupingId }
});

export const ConnectOrCreateBill = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
	data?: CreateBillValidatedData;
}) => {
	if (!data) {
		return undefined;
	}

	const validatedData = BillCreateValidation.parse(data);

	const foundBills = await client.bill.findMany({
		where: billFilterBuilder({
			filter: BillCreateValidatedToFilter(validatedData),
			userId,
			admin,
			requireAdmin: true
		}),
		include: billInclude
	});
	if (foundBills.length > 1) {
		throw new GraphQLYogaError('More than one matching bill. Cannot Link or Create');
	} else if (foundBills.length === 1) {
		return foundBills[0];
	}

	return CreateBill({ client, data, userId, admin });
};
