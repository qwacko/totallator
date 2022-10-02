import { chain, isEmpty, isUndefined } from 'lodash-es';

export const cleanseObject = <
	InType extends Record<string, unknown>,
	OutType extends Record<string, unknown>
>(
	input: InType | undefined
): OutType | undefined => {
	if (input) {
		return chain(input)
			.omitBy(isUndefined)
			.mapValues((item) => {
				if (typeof item === 'object') {
					if (Array.isArray(item)) {
						return item;
					}
					const output = cleanseObject<InType, OutType>(item as InType);
					return output;
				}
				return item;
			})
			.omitBy(isEmpty)
			.value() as OutType;
	}
	return undefined;
};
