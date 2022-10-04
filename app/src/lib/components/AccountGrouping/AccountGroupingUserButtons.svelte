<script lang="ts">
	import {
		setUserToAGAdminMutation,
		setUserToAGViewMutation
	} from '$lib/graphqlClient/frontendHelpers/changeUserAGPermissions';
	import type {
		SetUserToAdminResultStore,
		SetUserToViewResultStore
	} from '$lib/graphqlClient/frontendHelpers/changeUserAGPermissions';
	import { removeUserFromAG } from '$lib/graphqlClient/frontendHelpers/removeUserFromAG';
	import type { GetAccountGroupingsQuery } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import Buttons from '../Basic/Buttons.svelte';
	import type { ButtonsOptions } from '../Basic/ButtonsOptions';
	import toastsStore from '../Toasts/toastsStore';

	const client = getContextClient();

	export let ag: GetAccountGroupingsQuery['accountGroupings'][0];
	export let user: {
		id?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		admin?: boolean;
	};

	let buttonOptions: ButtonsOptions = [];

	let result: SetUserToAdminResultStore | SetUserToViewResultStore | undefined;
	$: loading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'User Permissions Change Error',
			description: $result.error.message
		});
	}

	$: buttonOptions = [
		{
			colour: 'blue',
			label: 'Admin',
			value: 'admin',
			selected: user.admin || false,
			onClick: () =>
				setUserToAGAdminMutation({
					ag,
					userID: user.id || '',
					client,
					setOperationResult: (val) => (result = val)
				})
		},
		{
			colour: 'blue',
			label: 'View',
			value: 'view',
			selected: !user.admin || false,
			onClick: () =>
				setUserToAGViewMutation({
					ag,
					userID: user.id || '',
					client,
					setOperationResult: (val) => (result = val)
				})
		},
		{
			colour: 'red',
			label: 'Delete',
			value: 'delete',
			selected: false,
			onClick: () =>
				removeUserFromAG({
					ag,
					userID: user.id || '',
					client,
					setOperationResult: (val) => (result = val)
				})
		}
	];
</script>

<Buttons class={$$props.class} {loading} options={buttonOptions} />
