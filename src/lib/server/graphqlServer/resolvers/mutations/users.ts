import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { checkAUserExists } from '$lib/server/auth/checkAUserExists';
import { auth } from '$lib/server/auth/lucia';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { envVariables } from '$lib/server/utils/variables';
import { dateFormats } from '$lib/utils/dateFormats';
import { passwordRegex } from '$lib/utils/formValidation/stringValidations';
import { GraphQLYogaError } from '@graphql-yoga/common';
import { z } from 'zod';

import { GraphqlUserFromDBUser } from '../helpers/users/GraphqlUserFromDBUser';
import {
	userCurrencyFormatValidation,
	userFirstMonthFYValidation,
	userWriteSettingsValidation
} from '../helpers/users/UserSettingsValidation';

const createUserValidation = z.object({
	admin: z.boolean().optional().default(false),
	email: z.string().email(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	password: z
		.string()
		.min(8)
		.regex(passwordRegex, 'Password requires 2 Uppercase, 3 Lowercase, 1 Special, and 2 Numbers')
});

export const createUser: GraphqlMutationResolvers['createUser'] = async (_, args, context) => {
	const userExists = await checkAUserExists();
	const requestorUserId = context?.locals?.lucia?.user?.user_id || undefined;
	const requestorUserAdmin = context?.locals?.lucia?.user?.admin || false;
	const admin = args?.data?.admin ? true : false;
	const allowUserCreation = envVariables.allowSignup;

	//User Can Only Be Created If A User Doesn't exist or user creation is allowed.
	if (!allowUserCreation && userExists) {
		throw new GraphQLYogaError('Cannot Create A User');
	}

	//User Cannot be made admin unless there is someone logged in or there is no users
	if (admin && userExists && requestorUserId === undefined) {
		throw new GraphQLYogaError('Cannot Create An Admin User');
	}

	if (admin && userExists && !requestorUserAdmin) {
		throw new GraphQLYogaError('Cannot Create An Admin User');
	}

	try {
		const { password, ...validatedData } = createUserValidation.parse(args?.data);
		const newUser = await auth.createUser('email', validatedData.email.toLowerCase(), {
			password: password,
			user_data: {
				...validatedData,
				dateFormat: 'YYYYMMDD',
				darkMode: false,
				email: validatedData.email.toLowerCase()
			}
		});

		return newUser.user.user_id;
	} catch (e) {
		if (e instanceof z.ZodError) {
			const errorItem = e.errors[0];
			throw new GraphQLYogaError(`${errorItem.path} : ${errorItem.message}`);
		}

		throw new GraphQLYogaError('Error Creating User');
	}
};

const updateUserValidation = z
	.object({
		firstName: z.string().min(1).optional(),
		lastName: z.string().min(1).optional(),
		darkMode: z.boolean().optional(),
		dateFormat: z
			.enum(dateFormats.map((currentFormat) => currentFormat.dbValue) as [string, ...string[]])
			.optional(),
		currencyFormat: userCurrencyFormatValidation.optional(),
		firstMonthFY: userFirstMonthFYValidation.optional()
	})
	.strict();

export const updateUser: GraphqlMutationResolvers['updateUser'] = async (_, args, context) => {
	const { userId } = authCheckPrisma(context);

	const checkedArgs = updateUserValidation.parse(args.input);

	const { currencyFormat, firstMonthFY, ...directCheckedArgs } = checkedArgs;

	const settings = userWriteSettingsValidation.parse({ currencyFormat, firstMonthFY });

	const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: { ...directCheckedArgs, settings }
	});

	if (updatedUser) {
		return GraphqlUserFromDBUser(updatedUser);
	}

	throw new GraphQLYogaError('Error Retrieving User Info');
};
