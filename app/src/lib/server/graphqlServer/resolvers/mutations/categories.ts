import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { categoryInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { CategoryUpdateValidation } from '../helpers/categories/CategoryCreateUpdateValidation';
import { CreateCategory } from '../helpers/categories/CreateCategory';
import { categoryFilterBuilder } from '../helpers/categories/categoryFilterBuilder';
import { generateCategoryTitle } from '../helpers/categories/generateCategoryTitle';
import { basicStatusToDB } from '../helpers/general/basicStatusToDB';

export const createCategory: GraphqlMutationResolvers['createCategory'] = async (
	_,
	args,
	context
) => CreateCategory({ client: prisma, data: args.input, ...authCheckPrisma(context) });

export const updateCategories: GraphqlMutationResolvers['updateCategories'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);
	const validatedInput = CategoryUpdateValidation.parse(args.input);

	const targetCategories = await prisma.category.findMany({
		where: categoryFilterBuilder({
			admin,
			filter: args.filter,
			userId,
			requireAdmin: true
		})
	});

	return prisma.$transaction(
		targetCategories.map((category) => {
			const newTitleInfo = {
				group: validatedInput.group !== undefined ? validatedInput.group : category.group,
				single: validatedInput.single !== undefined ? validatedInput.single : category.single
			};

			return prisma.category.update({
				where: { id: category.id },
				data: {
					...validatedInput,
					...(validatedInput.status ? basicStatusToDB(validatedInput.status) : {}),
					...(validatedInput.group || validatedInput.single
						? generateCategoryTitle(newTitleInfo)
						: {})
				},
				include: categoryInclude
			});
		})
	);
};
