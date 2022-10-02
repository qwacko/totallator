<script lang="ts">
	import {
		updateAccountGroupingData,
		type updateAccountGroupingResultStore
	} from '$lib/graphqlClient/frontendHelpers/updateAccountGroupingData';
	import type { GetAccountGroupingsQuery } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import InlineText from '../InlineEdit/InlineText.svelte';
	import toastsStore from '../Toasts/toastsStore';

	export let id: string;
	export let value: string;
	export let disabled: boolean;
	export let ag: GetAccountGroupingsQuery['accountGroupings'][0];
	export let textCenter: boolean = false;

	const updateTime = new Date();

	const client = getContextClient();
	let result: updateAccountGroupingResultStore | undefined;
	$: loading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			type: 'error',
			style: 'filled',
			title: 'Account Grouping Update Error',
			description: $result.error.message
		});
	}
</script>

<InlineText
	{id}
	class={$$props.class}
	{value}
	{disabled}
	{loading}
	{textCenter}
	{updateTime}
	on:enterOrBlur={(e) => {
		updateAccountGroupingData({
			id,
			value: { title: e.detail },
			currentAccountGrouping: ag,
			setOperationResult: (val) => (result = val),
			client
		});
	}} />
