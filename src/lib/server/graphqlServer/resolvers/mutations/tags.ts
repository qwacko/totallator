import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { tagInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { basicStatusToDB } from '../helpers/general/basicStatusToDB';
import { CreateTag } from '../helpers/tags/CreateTag';
import { TagUpdateValidation } from '../helpers/tags/TagCreateUpdateValidation';
import { generateTagTitle } from '../helpers/tags/generateTagTitle';
import { tagFilterBuilder } from '../helpers/tags/tagFilterBuilder';

export const createTag: GraphqlMutationResolvers['createTag'] = async (_, args, context) =>
	CreateTag({ client: prisma, data: args.input, ...authCheckPrisma(context) });

export const updateTags: GraphqlMutationResolvers['updateTags'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);
	const validatedInput = TagUpdateValidation.parse(args.input);

	const targetTags = await prisma.tag.findMany({
		where: tagFilterBuilder({
			admin,
			filter: args.filter,
			userId,
			requireAdmin: true
		})
	});

	return prisma.$transaction(
		targetTags.map((tag) => {
			const newTitleInfo = {
				group: validatedInput.group !== undefined ? validatedInput.group : tag.group,
				single: validatedInput.single !== undefined ? validatedInput.single : tag.single
			};

			return prisma.tag.update({
				where: { id: tag.id },
				data: {
					...validatedInput,
					...(validatedInput.status ? basicStatusToDB(validatedInput.status) : {}),
					...(validatedInput.group || validatedInput.single ? generateTagTitle(newTitleInfo) : {})
				},
				include: tagInclude
			});
		})
	);
};
