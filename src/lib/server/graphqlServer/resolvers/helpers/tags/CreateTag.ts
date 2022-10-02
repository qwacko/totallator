import type { CreateTagInput } from '$lib/server/graphqlServer/types/generated-resolvers';
import { tagInclude } from '$lib/server/graphqlServer/types/models';
import type { Prisma, PrismaClient } from '@prisma/client';

import { basicStatusToDBRequired } from '../general/basicStatusToDB';
import { checkAGAccess } from '../general/checkAGAccess';
import { type CreateTagValidatedData, TagCreateValidation } from './TagCreateUpdateValidation';
import { generateTagTitle } from './generateTagTitle';

export const CreateTag = async ({
	client,
	userId,
	admin,
	data
}: {
	client: Prisma.TransactionClient | PrismaClient;
	userId: string;
	admin: boolean;
	data: CreateTagValidatedData | CreateTagInput;
}) => {
	const validatedInput = TagCreateValidation.parse(data);

	const { accountGroupingId, ...rest } = validatedInput;

	//Check Account Grouping Access
	await checkAGAccess({ accountGroupingId, admin, userId, needsAdminAccess: true });

	return client.tag.create({
		data: {
			...rest,
			accountGrouping: { connect: { id: accountGroupingId } },
			...basicStatusToDBRequired(rest.status),
			...generateTagTitle({
				group: rest.group,
				single: rest.single
			})
		},
		include: tagInclude
	});
};
