import type {
	AccountFilter,
	InputMaybe,
	JournalEntryFilter
} from '$lib/server/graphqlServer/types/generated-resolvers';
import { accountInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

import { AccountCreateValidation } from './AccountCreateUpdateValidation';
import type { CreateAccountValidatedData } from './AccountCreateUpdateValidation';
import { CreateAccount } from './CreateAccount';
import { accountFilterBuilder } from './accountFilterBuilder';

export const AccountCreateValidatedToFilter = (
	data: CreateAccountValidatedData
): InputMaybe<JournalEntryFilter> => {
	const filter: InputMaybe<AccountFilter> = {
		accountGroup: data.accountGroup ? { equals: data.accountGroup } : undefined,
		accountGroup2: data.accountGroup2 ? { equals: data.accountGroup2 } : undefined,
		accountGroup3: data.accountGroup3 ? { equals: data.accountGroup3 } : undefined,
		accountGroupingId: { equals: data.accountGroupingId },
		endDate: data.endDate ? { equals: data.endDate } : undefined,
		startDate: data.startDate ? { equals: data.startDate } : undefined,
		isCash: data.startDate ? { equals: data.isCash } : undefined,
		isNetWorth: data.startDate ? { equals: data.isNetWorth } : undefined,
		status: { equals: data.status },
		title: { equals: data.title },
		type: { equals: data.type }
	};

	return filter;
};

export const ConnectOrCreateAccount = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
	data?: CreateAccountValidatedData;
}) => {
	if (!data) {
		return undefined;
	}

	const validatedData = AccountCreateValidation.parse(data);

	const foundAccounts = await client.account.findMany({
		where: accountFilterBuilder({
			filter: AccountCreateValidatedToFilter(validatedData),
			userId,
			admin,
			requireAdmin: true
		}),
		include: accountInclude
	});
	if (foundAccounts.length > 1) {
		throw new GraphQLYogaError('More than one matching account. Cannot Link or Create');
	} else if (foundAccounts.length === 1) {
		return foundAccounts[0];
	}

	return CreateAccount({ client, data });
};
