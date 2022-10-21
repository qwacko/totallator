import { z } from 'zod';
import { parse } from 'date-fns';

export const validateDate = z
	.string()
	.regex(new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'), {
		message: 'Date must be of format YYYY-MM-DD'
	})
	.refine(
		(arg) => {
			const newDate = parse(arg, 'yyyy-MM-dd', new Date());
			if (isNaN(newDate.valueOf())) {
				return false;
			}

			return true;
		},
		{ message: 'Date Must Be Valid' }
	);
