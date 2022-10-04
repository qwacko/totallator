<script lang="ts">
	import { getUserData } from '$lib/graphqlClient/frontendHelpers/getUserData';
	import { getContextClient } from '@urql/svelte';
	import { get, set } from 'lodash-es';

	import Select from '../Basic/Select.svelte';
	import { generateDateRangeOptions, getDates } from './dateRangeHandler';
	import { generalFilterStore } from './generalFilterStore';

	const client = getContextClient();
	const userData = getUserData(client);

	$: fyFirstMonth = $userData?.data?.user?.firstMonthFY || 1;

	$: dateRangeStart = get($generalFilterStore, 'date.gte', undefined) as string | undefined;
	$: dateRangeEnd = get($generalFilterStore, 'date.lte', undefined) as string | undefined;
	$: selectConfig = generateDateRangeOptions({
		start: dateRangeStart,
		end: dateRangeEnd,
		fyFirstMonth
	});

	const handleChange = (e: Event) => {
		const chosenValue = e.currentTarget ? (e.currentTarget as HTMLInputElement).value : 'Custom';
		const chosenDates = getDates({
			start: dateRangeStart,
			end: dateRangeEnd,
			fyFirstMonth,
			value: chosenValue
		});
		let localFilterStore = $generalFilterStore;
		set(localFilterStore, 'date.gte', chosenDates.start);
		set(localFilterStore, 'date.lte', chosenDates.end);
		$generalFilterStore = localFilterStore;
	};
</script>

<div class="flex flex-row gap-2">
	<Select
		placeholder="Date Range"
		id="dateRange"
		name="dateRange"
		value={selectConfig.value}
		options={selectConfig.options}
		displayType="default"
		on:change={handleChange} />
</div>
