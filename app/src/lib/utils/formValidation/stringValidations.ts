import { z, type ZodString } from 'zod';

type StringFieldValidation = {
	value: string | undefined;
	validation: ZodString;
	hasError: boolean;
	error?: string;
	touched: boolean;
	validate: StringValidationFunc;
};

type StringValidationFunc = (value: StringFieldValidation) => StringFieldValidation;

const stringValidation: StringValidationFunc = (value) => {
	try {
		value.validation.parse(value.value);
	} catch (e) {
		if (e instanceof z.ZodError) {
			return {
				...value,
				hasError: true,
				error: e.errors[0].message,
				touched: true
			};
		}
	}
	return { ...value, hasError: false, error: undefined, touched: true };
};

export const stringField = ({
	value,
	title,
	validation
}: {
	value?: string;
	title: string;
	validation?: ZodString;
}): StringFieldValidation => ({
	value,
	validation: validation
		? validation
		: z.string({ required_error: `${title} Required` }).min(1, `${title} Required`),
	hasError: false,
	error: undefined,
	touched: false,
	validate: stringValidation
});

export const passwordRegex = new RegExp(
	'^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()_+.]){1,}).{8,}$'
);

export const passwordField = ({
	value = undefined
}: { value?: string } = {}): StringFieldValidation => ({
	value,
	validation: z
		.string({ required_error: 'Password Required' })
		.min(8, 'Minimum Length of 8 Characters')
		.regex(passwordRegex, 'Password requires 2 Uppercase, 3 Lowercase, 1 Special, and 2 Numbers'),
	hasError: false,
	error: undefined,
	touched: false,
	validate: stringValidation
});

export const emailField = ({
	value = undefined
}: { value?: string } = {}): StringFieldValidation => ({
	value,
	validation: z.string({ required_error: 'Email Required' }).email(),
	hasError: false,
	error: undefined,
	touched: false,
	validate: stringValidation
});
