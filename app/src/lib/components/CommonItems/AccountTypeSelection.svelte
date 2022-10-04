<script lang="ts">
	import { get, set } from 'lodash-es';

	import Select from '../Basic/Select.svelte';
	import { getAccountTypeOptionsAndValue, getAccountTypes } from './accountTypeHandler';
	import { generalFilterStore } from './generalFilterStore';

	$: accountTypeSelection = get($generalFilterStore, 'account.type.in', undefined);
	$: selectConfig = getAccountTypeOptionsAndValue({ selection: accountTypeSelection });

	const handleChange = (e: Event) => {
		const chosenValue = e.currentTarget ? (e.currentTarget as HTMLInputElement).value : 'default';
		const chosenOptions = getAccountTypes(chosenValue);
		let localFilterStore = $generalFilterStore;
		set(localFilterStore, 'account.type.in', chosenOptions);
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
