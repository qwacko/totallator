<script lang="ts">
	import {
		updateAccountGroupingData,
		type updateAccountGroupingResultStore
	} from '$lib/graphqlClient/frontendHelpers/updateAccountGroupingData';
	import type { GetAccountGroupingsQuery, StatusEnum } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import Buttons from '../Basic/Buttons.svelte';
	import type { ButtonsOptions } from '../Basic/ButtonsOptions';

	export let id: string;
	export let value = '';
	export let ag: GetAccountGroupingsQuery['accountGroupings'][0];

	let result: updateAccountGroupingResultStore | undefined;
	$: loading = $result?.fetching || false;

	const client = getContextClient();
	const changeStatus = (target: StatusEnum) => {
		updateAccountGroupingData({
			id,
			value: { status: target },
			currentAccountGrouping: ag,
			client,
			setOperationResult: (val) => (result = val)
		});
	};

	const optionList: ButtonsOptions = [
		{
			value: 'Active',
			label: 'Active',
			colour: 'blue',
			selected: false,
			onClick: () => changeStatus('Active' as StatusEnum)
		},
		{
			value: 'Disabled',
			label: 'Disabled',
			colour: 'blue',
			selected: false,
			onClick: () => changeStatus('Disabled' as StatusEnum)
		},
		{
			value: 'Deleted',
			label: 'Deleted',
			colour: 'red',
			selected: false,
			onClick: () => changeStatus('Deleted' as StatusEnum)
		}
	];

	$: options = optionList.map((item) =>
		item.value === value ? { ...item, selected: true } : { ...item, selected: false }
	);
</script>

<Buttons {loading} class={$$props.class} {options} />
