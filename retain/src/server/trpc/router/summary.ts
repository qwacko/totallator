import type { Decimal } from '@prisma/client/runtime';

import { summaryInputValidation } from '$lib/validation/summary/summaryInputValidation';
import { summaryReturnValidation } from '$lib/validation/summary/summaryReturnValidation';

import { protectedProcedure, router } from '../trpc';
import { getUserInfo } from './helpers/getUserInfo';
import { filtersToQuery } from './helpers/journals/journalsWithStats';

const sumDecimalObjectToNumber = <T extends { amount: Decimal | null; [key: string]: unknown }>(
	data: T
) => {
	const { amount, ...otherData } = data;
	return {
		...otherData,
		amount: amount === null ? null : amount.toNumber()
	};
};

export const summaryRouter = router({
	getTimeData: protectedProcedure
		.input(summaryInputValidation)
		.output(summaryReturnValidation)
		.query(async ({ ctx, input }) => {
			const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

			const groupedJournals = (
				await ctx.prisma.journalEntry.groupBy({
					where: {
						AND: await filtersToQuery({
							prisma: ctx.prisma,
							user: user,
							filters: input.filters
						})
					},
					_sum: { amount: true },
					_min: { date: true, amount: true },
					_max: { date: true, amount: true },
					_count: { _all: true },
					by: input.groupingList
				})
			).map((item) => ({
				...item,
				_sum: sumDecimalObjectToNumber(item._sum),
				_max: sumDecimalObjectToNumber(item._max),
				_min: sumDecimalObjectToNumber(item._min)
			}));

			return groupedJournals;
		})
});
