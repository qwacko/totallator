import type { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { basicStatusToDBRequired } from '$lib/validation/basicStatusToDB';
import type { createBudgetValidationType } from '$lib/validation/budget/createBudgetValidation';
import type { updateBudgetDataValidationType } from '$lib/validation/budget/updateBudgetValidation';

import type { UpsertActions } from '../types';

export type UpsertBudgetData = createBudgetValidationType | updateBudgetDataValidationType;

export const upsertBudget = async ({
	data,
	id,
	accountGroupingId,
	userId,
	userAdmin = false,
	prisma,
	action
}: {
	data: UpsertBudgetData;
	id?: string | undefined;
	accountGroupingId?: string;
	userId: string;
	userAdmin?: boolean;
	prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
	action: UpsertActions;
}) => {
	if (id) {
		const found = await prisma.budget.findFirst({
			where: {
				id,
				accountGroupingId,
				...(!userAdmin ? { accountGrouping: { adminUsers: { some: { id: userId } } } } : {})
			}
		});
		if (found && action === 'Create') {
			throw new TRPCError({
				message: 'Budget Found But Action Is Only Create, cannot update',
				code: 'BAD_REQUEST'
			});
		} else if (found) {
			return prisma.budget.update({
				where: { id: found.id },
				data: {
					title: data.title,
					...(data.status ? basicStatusToDBRequired(data.status) : {})
				}
			});
		}
	}
	if (action === 'Update') {
		throw new TRPCError({
			message: 'No budget found to update',
			code: 'BAD_REQUEST'
		});
	}
	if (accountGroupingId && data.title) {
		return prisma.budget.create({
			data: {
				title: data.title,
				accountGroupingId,
				...basicStatusToDBRequired(data.status || 'Active')
			}
		});
	}
	throw new TRPCError({
		message: 'Cannot Create Budget Without Account Grouping Or Title',
		code: 'BAD_REQUEST'
	});
};
