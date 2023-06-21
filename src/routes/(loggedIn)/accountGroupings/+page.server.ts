import { logging } from '$lib/server/logging.js';
import { createAccountGroupingValidation } from '$lib/validation/accountGrouping/createAccountGroupingValidation.js';
import { updateAccountGroupingValidation } from '$lib/validation/accountGrouping/updateAccountGroupingValidation.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const load = async (event) => {
	const user = await event.locals.auth.validateUser();
	const accountGroupings = event.locals.trpc.accountGroupings.get();

	const createForm = superValidate(event, createAccountGroupingValidation, { id: 'createFormId' });
	const updateForms = await Promise.all(
		(
			await accountGroupings
		).map(async (ag) => {
			return await superValidate(
				{ id: ag.id, title: ag.title, status: ag.status },
				updateAccountGroupingValidation,
				{ id: ag.id }
			);
		})
	);

	return {
		accountGroupings,
		createForm,
		updateForms,
		user
	};
};

export const actions = {
	create: async (event) => {
		const createForm = await superValidate(event, createAccountGroupingValidation, {
			id: 'createFormId'
		});

		if (!createForm.valid) {
			return fail(400, { createForm });
		}

		try {
			await event.locals.trpc.accountGroupings.create(createForm.data);

			return { createForm };
		} catch (e) {
			logging.error('Error Creating Account Grouping', e);
			return setError(createForm, null, 'Unable To Create Account Grouping');
		}
	},

	update: async (event) => {
		const updateFormMid = await superValidate(event, updateAccountGroupingValidation);
		const updateForm = await superValidate(updateFormMid.data, updateAccountGroupingValidation, {
			id: updateFormMid.data.id
		});

		if (!updateForm.valid) {
			return fail(400, { updateForm });
		}

		try {
			await event.locals.trpc.accountGroupings.update(updateForm.data);

			return { updateForm };
		} catch (e) {
			logging.error('Error Updating Account Grouping', e);
			return setError(updateForm, null, 'Unable To Update Account Grouping');
		}
	},
	setUserAdmin: async (event) => {
		const setUserAdminForm = await superValidate(
			event,
			z.object({
				userId: z.string().cuid(),
				accountGroupingId: z.string().cuid()
			})
		);

		if (!setUserAdminForm.valid) {
			return fail(400, { setUserAdminForm });
		}

		try {
			await event.locals.trpc.accountGroupings.setUserAdmin(setUserAdminForm.data);

			return { setUserAdminForm };
		} catch (e) {
			logging.error('Error Setting User Admin', e);
			return setError(setUserAdminForm, null, 'Unable To Set User Admin');
		}
	},
	setUserView: async (event) => {
		const setUserViewForm = await superValidate(
			event,
			z.object({
				userId: z.string().cuid(),
				accountGroupingId: z.string().cuid()
			})
		);

		if (!setUserViewForm.valid) {
			return fail(400, { setUserViewForm });
		}

		try {
			await event.locals.trpc.accountGroupings.setUserView(setUserViewForm.data);

			return { setUserViewForm };
		} catch (e) {
			logging.error('Error Setting User View', e);
			return setError(setUserViewForm, null, 'Unable To Set User View');
		}
	}
};
