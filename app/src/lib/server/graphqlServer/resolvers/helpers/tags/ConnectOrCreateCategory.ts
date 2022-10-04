import type { InputMaybe, TagFilter } from '$lib/server/graphqlServer/types/generated-resolvers';
import { tagInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

import { CreateTag } from './CreateTag';
import { type CreateTagValidatedData, TagCreateValidation } from './TagCreateUpdateValidation';
import { tagFilterBuilder } from './tagFilterBuilder';

export const TagCreateValidatedToFilter = (
	data: CreateTagValidatedData
): InputMaybe<TagFilter> => ({
	status: { equals: data.status },
	group: { equals: data.group },
	single: { equals: data.single },
	accountGroupingId: { equals: data.accountGroupingId }
});

export const ConnectOrCreateTag = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
	data?: CreateTagValidatedData;
}) => {
	if (!data) {
		return undefined;
	}

	const validatedData = TagCreateValidation.parse(data);

	const foundTags = await client.tag.findMany({
		where: tagFilterBuilder({
			filter: TagCreateValidatedToFilter(validatedData),
			userId,
			admin,
			requireAdmin: true
		}),
		include: tagInclude
	});
	if (foundTags.length > 1) {
		throw new GraphQLYogaError('More than one matching Tag Cannot Link or Create');
	} else if (foundTags.length === 1) {
		return foundTags[0];
	}

	return CreateTag({ client, data, userId, admin });
};
