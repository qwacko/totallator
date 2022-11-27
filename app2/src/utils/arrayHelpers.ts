export const notUndefinedGuard = <T>(item: T | undefined): item is T => {
  return !!item;
};
export const removeUndefined = <T>(item: (T | undefined)[]) => {
  return item.filter(notUndefinedGuard);
};
export const removeUndefinedAndDuplicates = <T>(input: (T | undefined)[]) => {
  return [...new Set(removeUndefined(input))];
};
export const makeToSet = (input: (string | undefined)[] | undefined) => {
  return input ? removeUndefinedAndDuplicates(input) : [];
};
