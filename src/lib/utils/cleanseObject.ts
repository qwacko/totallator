import { chain, isEmpty, isUndefined, omitBy } from 'lodash-es';

export const cleanseObject = <
	InType extends Record<string, unknown>,
	OutType extends Record<string, unknown>
>(
	input: InType | undefined
): OutType | undefined => {
	if (input) {
		console.log({ cleanseObject: true, input });
		console.log({ chain: chain(input).value() });
		console.log({ firstOmit: chain(input).omitBy(isUndefined).value() });
		console.log({
			mapped: chain(input)
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
				.value()
		});

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
