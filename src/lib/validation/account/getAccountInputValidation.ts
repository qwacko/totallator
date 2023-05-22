import { z } from 'zod';

import { PrismaAccountTypeEnumValidation } from '../PrismaAccountTypeEnumValidation';
import { booleanFilter } from '../journalEntries/booleanFilter';
import { dateFilter } from '../journalEntries/dateFilter';
import { idFilter } from '../journalEntries/idFilter';
import { paginationValidation } from '../journalEntries/paginationValidation';
import { stringFilter } from '../journalEntries/stringFilter';
import { statusFilter } from './statusFilter';

const accountSortValidation = z.array(
	z.object({
		key: z.enum([
			'title',
			'type',
			'isCash',
			'isNetWorth',
			'accountGroup',
			'accountGroup2',
			'accountGroup3',
			'accountGroupCombined',
			'accountTitleCombined',
			'startDate',
			'endDate',

			'status',
			'deleted',
			'active',
			'disabled',
			'allowUpdate',
			'createdAt',
			'updatedAt'
		]),
		direction: z.enum(['asc', 'desc'])
	})
);

export type AccountSortValidation = z.infer<typeof accountSortValidation>;

const accountTypeFilter = z
	.object({ in: z.array(PrismaAccountTypeEnumValidation).optional() })
	.optional();

export const accountFilterNew = z.object({
	id: idFilter,
	title: stringFilter,
	isCash: booleanFilter,
	isNetWorth: booleanFilter,
	type: accountTypeFilter,
	accountGroup: stringFilter,
	accountGroup2: stringFilter,
	accountGroup3: stringFilter,
	accountGroupCombined: stringFilter,
	accountTitleCombined: stringFilter,
	startDate: dateFilter,
	endDate: dateFilter,
	updatedAt: dateFilter,
	createdAt: dateFilter,
	status: statusFilter,
	deleted: booleanFilter,
	allowUpdate: booleanFilter,
	active: booleanFilter,
	disabled: booleanFilter
});

export type AccountFilterValidation = z.infer<typeof accountFilterNew>;
export type AccountFilterInputValidation = z.input<typeof accountFilterNew>;

export const getAccountInputValidation = z.object({
	filters: z.array(accountFilterNew).optional(),
	pagination: paginationValidation.optional().default({ pageNo: 0, pageSize: 10 }),
	sort: accountSortValidation.optional().default([{ key: 'title', direction: 'asc' }])
});
