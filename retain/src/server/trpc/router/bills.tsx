import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createBillValidation } from 'src/utils/validation/bill/createBillValidation';
import { getBillInputValidation } from 'src/utils/validation/bill/getBillInputValidation';
import { updateBillValidation } from 'src/utils/validation/bill/updateBillValidation';

import { protectedProcedure, router } from '../trpc';
import { billSortToOrderBy } from './helpers/bills/billSortToOrderBy';
import { upsertBill } from './helpers/bills/upsertBill';
import {
	accountGroupingFilter,
	checkAccountGroupingAccess
} from './helpers/checkAccountGroupingAccess';
import { getUserInfo } from './helpers/getUserInfo';

export const billRouter = router({
	get: protectedProcedure.input(getBillInputValidation).query(async ({ ctx, input }) => {
		const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

		//Pagination
		const take = input.pagination.pageSize;
		const skip = input.pagination.pageNo * input.pagination.pageSize;

		const where: Prisma.BillWhereInput = {
			AND: [
				{ accountGrouping: { viewUsers: { some: { id: user.id } } } },
				...(input.filters ? input.filters : [])
			]
		};
		const bills = await ctx.prisma.bill.findMany({
			where,
			orderBy: billSortToOrderBy(input.sort),
			take,
			skip,
			include: {
				accountGrouping: { include: { adminUsers: true } },
				_count: { select: { journalEntries: true } }
			}
		});

		const count = await ctx.prisma.bill.count({ where });

		const processedData = bills.map((bill) => {
			const { accountGrouping, ...otherData } = bill;
			return {
				...otherData,
				userIsAdmin: Boolean(accountGrouping.adminUsers.find((agUser) => agUser.id === user.id))
			};
		});

		return { data: processedData, count };
	}),
	getDropdown: protectedProcedure
		.input(
			z
				.object({
					accountGroupingId: z.string().optional(),
					includeOnlyAdmin: z.boolean().optional().default(false)
				})
				.optional()
				.default({})
		)
		.query(async ({ ctx, input }) => {
			const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

			const bills = await ctx.prisma.bill.findMany({
				where: {
					AND: [
						{
							accountGrouping: input.includeOnlyAdmin
								? { adminUsers: { some: { id: user.id } } }
								: { viewUsers: { some: { id: user.id } } }
						},
						input?.accountGroupingId ? { accountGroupingId: input.accountGroupingId } : {}
					]
				}
			});

			const returnData = bills
				.map((item) => ({ label: item.title, value: item.id }))
				.sort((a, b) => a.label.localeCompare(b.label));

			return returnData;
		}),
	create: protectedProcedure.input(createBillValidation).mutation(async ({ ctx, input }) => {
		const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

		await checkAccountGroupingAccess({
			accountGroupingId: input.accountGroupingId,
			prisma: ctx.prisma,
			user,
			adminRequired: true
		});

		await upsertBill({
			prisma: ctx.prisma,
			userId: user.id,
			userAdmin: user.admin,
			action: 'Create',
			data: input,
			accountGroupingId: input.accountGroupingId
		});

		return true;
	}),
	update: protectedProcedure.input(updateBillValidation).mutation(async ({ ctx, input }) => {
		const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

		await upsertBill({
			prisma: ctx.prisma,
			userId: user.id,
			userAdmin: user.admin,
			data: input.data,
			id: input.id,
			action: 'Update'
		});

		return true;
	}),
	clone: protectedProcedure
		.input(z.object({ id: z.string().cuid() }))
		.mutation(async ({ ctx, input }) => {
			const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

			const targetBill = await ctx.prisma.bill.findFirst({
				where: {
					id: input.id,
					...accountGroupingFilter(user.id)
				}
			});

			if (!targetBill) {
				throw new TRPCError({
					message: "Cannot find bill or user doesn't have admin accces",
					code: 'FORBIDDEN'
				});
			}

			await upsertBill({
				userId: user.id,
				userAdmin: user.admin,
				prisma: ctx.prisma,
				data: { ...targetBill, title: `${targetBill.title} (Clone)` },
				action: 'Create',
				accountGroupingId: targetBill.accountGroupingId
			});

			return true;
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.string().cuid() }))
		.mutation(async ({ ctx, input }) => {
			const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

			const targetBill = await ctx.prisma.bill.findFirst({
				where: {
					id: input.id,
					...accountGroupingFilter(user.id)
				},
				include: { _count: { select: { journalEntries: true } } }
			});

			if (!targetBill) {
				throw new TRPCError({
					message: "Cannot find bill or user doesn't have admin accces",
					code: 'FORBIDDEN'
				});
			}
			if (targetBill._count.journalEntries > 0) {
				throw new TRPCError({
					message: 'Cannot remove bill that has journal entries associated',
					code: 'FORBIDDEN'
				});
			}
			await ctx.prisma.bill.delete({
				where: { id: targetBill.id }
			});

			return true;
		})
});
