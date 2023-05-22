import { z } from 'zod';

const currencyFormats = ['EUR', 'GBP', 'JPY', 'USD'] as const;
export type currencyFormatTypes = 'EUR' | 'GBP' | 'JPY' | 'USD';

export const currencyFormatValidation = z.enum(currencyFormats);

export const currencyFormatter = (currencyFormat: currencyFormatTypes) => {
	if (currencyFormat === 'USD') {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	} else if (currencyFormat === 'EUR') {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR'
		});
	} else if (currencyFormat === 'GBP') {
		return new Intl.NumberFormat('en-UK', {
			style: 'currency',
			currency: 'GBP'
		});
	} else if (currencyFormat === 'JPY') {
		return new Intl.NumberFormat('ja-JP', {
			style: 'currency',
			currency: 'JPY'
		});
	}
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
};

export const currencyFormatsSelectOptions: {
	value: currencyFormatTypes;
	label: string;
}[] = [
	{ value: 'USD', label: currencyFormatter('USD').format(1234.56) },
	{ value: 'GBP', label: currencyFormatter('GBP').format(1234.56) },
	{ value: 'JPY', label: currencyFormatter('JPY').format(1234.56) },
	{ value: 'EUR', label: currencyFormatter('EUR').format(1234.56) }
];
