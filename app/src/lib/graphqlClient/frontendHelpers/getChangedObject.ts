export const getChangedObject = <T extends Record<string, unknown>>(current: T, newValue: T) => {
	const modifiedNewValue = { ...newValue };
	const keys: (keyof T)[] = Object.keys(modifiedNewValue) as (keyof T)[];
	keys.forEach((currentKey) => {
		if (current[currentKey] === modifiedNewValue[currentKey]) {
			delete modifiedNewValue[currentKey];
		}
	});

	return modifiedNewValue;
};
