<script lang="ts">
	import { CategoriesDropdownDocument } from '$lib/graphqlClient/generated';
	import { getContextClient, queryStore } from '@urql/svelte';
	import { createEventDispatcher } from 'svelte';

	import SelectableList from '../Basic/SelectableList.svelte';
	import type { SelectableListItemType } from '../Basic/SelectableListTypes';
	import TableDropdownItem from '../Table/TableDropdownItem.svelte';
	import type { CategorySelectInfo } from '../Table/TableTypes';
	import CategoryInlineDisplay from './CategoryInlineDisplay.svelte';

	const dispatch = createEventDispatcher();

	export let value: CategorySelectInfo | undefined;
	export let accountGrouping: string;
	export let disabled = false;
	export let loading = false;
	export let textCenter = false;
	export let ring = false;
	export let noDisabled = false;
	export let id: string;
	export let clearable = false;
	export let includeNew = true;
	export let preloadSearch = false;

	let dropdownOpen = false;
	let searchText: string | undefined;
	let searchTextDebounced = '';
	type searchType = { type: 'search' };
	type dataType = CategorySelectInfo | undefined;
	let fixedItems: SelectableListItemType<dataType | searchType>[] = [];
	let timer = setTimeout(() => undefined, 0);

	// Handles to initial load of the values to make sure the serach box tracks the selected value.
	const updateSearch = () => {
		if (preloadSearch) {
			searchText = value?.title || '';
			searchTextDebounced = searchText;
		}
	};

	//Debouncing to reduce the amount of searching
	const searchValueChanged = (newValue: string | undefined) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			searchTextDebounced = newValue || '';
		}, 300);
	};
	$: searchValueChanged(searchText);

	//Updates the search text when the dropdown opens
	$: dropdownOpen && updateSearch();

	//Function to update the fixed items. Used for stability (a reactive line of code causes reference issues)
	const updateFixedItems = () => {
		if (includeNew) {
			fixedItems = [
				{ type: 'search' },
				{
					type: 'clear',
					onClick: () => {
						dispatch('update', 'clear');
						closeDropdown();
					}
				}
			];
		} else {
			fixedItems = [{ type: 'search' }];
		}
	};
	$: (value || searchText) && updateFixedItems();

	//Query to get the items to populate the dropdown with
	const client = getContextClient();
	$: categoriesList = queryStore({
		client,
		query: CategoriesDropdownDocument,
		variables: { search: searchTextDebounced, accountGrouping }
	});

	//Made this into a standalone function, as having this code directly in the "onClick" causes the funciton to not work correctly
	const closeDropdown = () => {
		dropdownOpen = false;
	};

	//Builds the list of scrollable items from server graphql response.
	let scrollItems: SelectableListItemType<dataType>[];
	$: scrollItems = $categoriesList?.data?.categories?.categories
		? $categoriesList.data.categories.categories.map((item) => ({
				type: 'data',
				onClick: () => {
					dispatch('update', item);
					closeDropdown();
				},
				data: {
					id: item.id,
					title: item.title
				}
		  }))
		: [];
</script>

<TableDropdownItem
	{id}
	{clearable}
	{disabled}
	{loading}
	{textCenter}
	{noDisabled}
	{ring}
	bind:dropdownOpen>
	<svelte:fragment slot="mainContent">
		{#if value}
			<CategoryInlineDisplay {value} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="dropdownContent">
		<SelectableList
			bind:scrollItems
			bind:fixedItems
			bind:searchValue={searchText}
			on:close={() => (dropdownOpen = false)}>
			<svelte:fragment slot="fixed" let:data>
				<CategoryInlineDisplay value={data.data} />
			</svelte:fragment>
			<svelte:fragment slot="scroll" let:data
				><CategoryInlineDisplay value={data.data} /></svelte:fragment>
		</SelectableList>
	</svelte:fragment>
</TableDropdownItem>
