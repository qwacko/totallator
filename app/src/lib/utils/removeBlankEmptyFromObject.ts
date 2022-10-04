import { isEmpty } from 'lodash-es';

export const removeBlankEmptyFromObject = <T>(input: T): T => {
	const keys = Object.keys(input);

	keys.forEach((currentKey) => {
		if (typeof input[currentKey] === 'object') {
			removeBlankEmptyFromObject(input[currentKey]);
		}

		if (isEmpty(input[currentKey]) || input[currentKey] === undefined) {
			delete input[currentKey];
		}
	});

	return { ...input };
};
