import { TRPCError } from '@trpc/server';

import { removeUndefinedAndDuplicates } from 'src/utils/arrayHelpers';

import { type UpsertReturnType } from './types';

export const populateRemainingIds = async <T extends { id: string; [key: string]: unknown }>({
	returnData,
	idList,
	getMatching,
	itemsType
}: {
	returnData: UpsertReturnType<T>;
	idList?: (string | undefined)[];
	getMatching: (idList: string[]) => Promise<T[]>;
	itemsType: string;
}) => {
	if (idList) {
		const filteredIdList = removeUndefinedAndDuplicates(idList);
		const allFound = Object.keys(returnData.allLookup);
		const remainingIds = filteredIdList.filter((item) => !allFound.includes(item));

		const foundItems = await getMatching(remainingIds);

		const otherItems = foundItems.reduce<Record<string, T>>(
			(prev, current) => ({ ...prev, [current.id]: current }),
			{}
		);

		returnData.allLookup = { ...returnData.allLookup, ...otherItems };
		const allLookupKeys = Object.keys(returnData.allLookup);
		const newRemainingIds = filteredIdList.filter((item) => !allLookupKeys.includes(item));

		if (newRemainingIds.length > 0) {
			throw new TRPCError({
				message: `Not All ${itemsType} Found. Remaining Ids = ${newRemainingIds}`,
				code: 'INTERNAL_SERVER_ERROR'
			});
		}
	}
};
