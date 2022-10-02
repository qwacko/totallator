import { z } from 'zod';

export const userCurrencyFormatValidation = z.enum(['USD', 'GBP', 'EUR', 'JPY']);
export const userFirstMonthFYValidation = z.number().int().max(12).min(1);

export const userReadSettingsValidation = z
	.object({
		currencyFormat: userCurrencyFormatValidation.default('USD'),
		firstMonthFY: userFirstMonthFYValidation.default(1)
	})
	.strict();

export const userWriteSettingsValidation = z
	.object({
		currencyFormat: userCurrencyFormatValidation.default('USD'),
		firstMonthFY: userFirstMonthFYValidation.default(1)
	})
	.strict();
