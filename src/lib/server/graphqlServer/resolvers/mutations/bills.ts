import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { billInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { BillUpdateValidation } from '../helpers/bills/BillCreateUpdateValidation';
import { CreateBill } from '../helpers/bills/CreateBill';
import { billFilterBuilder } from '../helpers/bills/billFilterBuilder';
import { basicStatusToDB } from '../helpers/general/basicStatusToDB';

export const createBill: GraphqlMutationResolvers['createBill'] = async (_, args, context) => {
	return CreateBill({ data: args.input, client: prisma, ...authCheckPrisma(context) });
};

export const updateBills: GraphqlMutationResolvers['updateBills'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);
	const validatedInput = BillUpdateValidation.parse(args.input);

	const targetBills = await prisma.bill.findMany({
		where: billFilterBuilder({
			admin,
			filter: args.filter,
			userId,
			requireAdmin: true
		})
	});

	return prisma.$transaction(
		targetBills.map((bill) => {
			return prisma.bill.update({
				where: { id: bill.id },
				data: {
					...validatedInput,
					...(validatedInput.status ? basicStatusToDB(validatedInput.status) : {})
				},
				include: billInclude
			});
		})
	);
};
