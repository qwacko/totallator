const notUndefinedGuard = <T>(item: T | undefined | null): item is T => {
	return !!item;
};
export const removeUndefined = <T>(item: (T | undefined | null)[]) => {
	return item.filter(notUndefinedGuard);
};
export const removeUndefinedAndDuplicates = <T>(input: (T | undefined | null)[]) => {
	return [...new Set(removeUndefined(input))];
};
export const makeToSet = (input: (string | undefined | null)[] | undefined) => {
	return input ? removeUndefinedAndDuplicates(input) : [];
};
