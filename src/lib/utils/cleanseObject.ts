import { isEmpty, isUndefined, mapValues, omitBy } from 'lodash-es';

export const cleanseObject = <
	InType extends Record<string, unknown>,
	OutType extends Record<string, unknown>
>(
	input: InType | undefined
): OutType | undefined => {
	if (input) {
		const withoutUndefined = omitBy(input, isUndefined);
		const arraysMapped = mapValues(withoutUndefined, (item) => {
			if (typeof item === 'object') {
				if (Array.isArray(item)) {
					return item;
				}
				const output = cleanseObject<InType, OutType>(item as InType);
				return output;
			}
			return item;
		});
		const omitEmpty = omitBy(arraysMapped, isEmpty);

		return omitEmpty as OutType;
	}
	return undefined;
};
