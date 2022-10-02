type dateFormatType = { dbValue: string; dateFnFormat: string };

export const dateFormats: dateFormatType[] = [
	{ dbValue: 'DashDDMMYYYY', dateFnFormat: 'dd-MM-yyyy' },
	{ dbValue: 'DashMMDDYYYY', dateFnFormat: 'MM-dd-yyyy' },
	{ dbValue: 'SlashDDMMYY', dateFnFormat: 'dd/MM/yyyy' },
	{ dbValue: 'SlashMMDDYY', dateFnFormat: 'MM/dd/yyyy' },
	{ dbValue: 'TextWithDOW', dateFnFormat: "EEE do LLL ''yy" },
	{ dbValue: 'TextShort', dateFnFormat: "do LLL ''yy" },
	{ dbValue: 'TextShortest', dateFnFormat: 'dd LLL yy' },
	{ dbValue: 'DashYYYYMMDD', dateFnFormat: 'yyyy-MM-dd' },
	{ dbValue: 'YYYYMMDD', dateFnFormat: 'yyyyMMdd' }
];
