import { endOfYear, format, set, startOfYear, subYears } from 'date-fns';

import type { SelectOptionType } from '../Basic/Select';

const dateFormat = 'yyyy-MM-dd';

const getFYFromDate = (inputDate: Date, fyStart: number) => {
	let startOfFY = inputDate;
	let endOfFY = inputDate;
	const currentMonth = inputDate.getMonth() + 1;

	if (currentMonth >= fyStart) {
		startOfFY = set(inputDate, { year: inputDate.getFullYear(), month: fyStart, date: 1 });
		endOfFY = set(inputDate, { year: inputDate.getFullYear() + 1, month: fyStart, date: 0 });
	} else {
		startOfFY = set(inputDate, { year: inputDate.getFullYear() - 1, month: fyStart, date: 1 });
		endOfFY = set(inputDate, { year: inputDate.getFullYear(), month: fyStart, date: 0 });
	}

	return { start: startOfFY, end: endOfFY };
};

const buildDateRangeList = ({
	fyFirstMonth
}: {
	fyFirstMonth: number;
}): { value: string; label: string; start?: string; end?: string }[] => {
	const firstMonthFiltered = Math.min(Math.max(1, fyFirstMonth), 12);
	const currentDate = new Date();

	return [
		{
			label: 'All Dates',
			value: 'All'
		},
		{
			label: 'Current Year',
			value: 'CurrentYear',
			start: format(startOfYear(currentDate), dateFormat),
			end: format(endOfYear(currentDate), dateFormat)
		},
		{
			label: 'Last Year',
			value: 'LastYear',
			start: format(startOfYear(subYears(currentDate, 1)), dateFormat),
			end: format(endOfYear(subYears(currentDate, 1)), dateFormat)
		},
		{
			label: 'Current FY',
			value: 'CurrentFY',
			start: format(getFYFromDate(currentDate, firstMonthFiltered).start, dateFormat),
			end: format(getFYFromDate(currentDate, firstMonthFiltered).end, dateFormat)
		},
		{
			label: 'Previous FY',
			value: 'PreviousFY',
			start: format(getFYFromDate(subYears(currentDate, 1), firstMonthFiltered).start, dateFormat),
			end: format(getFYFromDate(subYears(currentDate, 1), firstMonthFiltered).end, dateFormat)
		}
	];
};

export const generateDateRangeOptions = ({
	start,
	end,
	fyFirstMonth
}: {
	start: string | undefined;
	end: string | undefined;
	fyFirstMonth: number;
}): { options: SelectOptionType; value: string } => {
	const defaultOptions = buildDateRangeList({ fyFirstMonth });

	const options = defaultOptions.map((item) => ({ value: item.value, label: item.label }));
	const valueExists = defaultOptions.find((item) => item.start === start && item.end === end);

	const finalOptions = valueExists
		? options
		: [{ label: `${start} - ${end}`, value: 'Custom', start, end }, ...options];
	const value = valueExists ? valueExists.value : 'Custom';

	return { options: finalOptions, value };
};

export const getDates = ({
	start,
	end,
	fyFirstMonth,
	value
}: {
	start: string | undefined;
	end: string | undefined;
	fyFirstMonth: number;
	value: string;
}) => {
	const defaultOptions = buildDateRangeList({ fyFirstMonth });

	if (value === 'Custom') {
		return { start, end };
	} else {
		const chosenValue = defaultOptions.find((item) => item.value === value);
		if (!chosenValue) {
			return { start, end };
		} else {
			return {
				start: chosenValue.start ? chosenValue.start : undefined,
				end: chosenValue.end ? chosenValue.end : undefined
			};
		}
	}
};
