<script lang="ts">
	import Icon from '@iconify/svelte';

	export let numberItems = 1000;
	export let pageSize = 20;
	export let pageNumber = 30;
	export let offset = 30;

	$: maxPages = Math.ceil(numberItems / pageSize);
	$: maxPageIndex = maxPages - 1;
	$: numberItems && setPage(0);

	const changePageSize = (newPageSize: number) => {
		const currentOffset = offset;
		const newPage = Math.round(currentOffset / newPageSize);

		setPage(newPage);
	};

	$: changePageSize(pageSize);

	const nextPage = () => {
		if (pageNumber <= maxPageIndex) {
			setPage(pageNumber + 1);
		}
	};

	const prevPage = () => {
		if (pageNumber > 0) {
			setPage(pageNumber - 1);
		}
	};

	const firstPage = () => {
		setPage(0);
	};

	const lastPage = () => {
		setPage(maxPageIndex);
	};

	const setPage = (page: number) => {
		let newPage = page;
		if (newPage >= maxPageIndex) {
			newPage = maxPageIndex;
		}
		if (newPage <= 0) {
			newPage = 0;
		}

		pageNumber = newPage;
		offset = newPage * pageSize;
	};

	$: pageOptions = Array(maxPages).fill('A');
	$: hasNoPrev = pageNumber <= 0 || numberItems === 0;
	$: hasNoNext = pageNumber >= maxPageIndex || numberItems === 0;
</script>

<div class="flex flex-row flex-wrap {$$props.class}">
	<div class="buttonCore flex flex-row">
		{#if numberItems > 0}
			<div class="flex font-bold">
				<select
					name="pageNumber"
					id="pageNumber"
					class="text-right"
					on:change={(e) => setPage(parseInt(e?.target?.value ? e.target.value : pageNumber))}>
					{#each pageOptions as val, index}
						<option value={index} selected={index === pageNumber}
							>{index * pageSize + 1} - {Math.min((index + 1) * pageSize, numberItems)}</option>
					{/each}
				</select>
			</div>
			<div class="flex">
				of {numberItems} (
			</div>
		{:else}
			<div class="flex">No Results (</div>
		{/if}

		<select class="ml-4 flex font-bold" on:change={(e) => (pageSize = parseInt(e.target.value))}>
			<option value={10} selected={pageSize === 10}>10</option>
			<option value={25} selected={pageSize === 25}>25</option>
			<option value={50} selected={pageSize === 50}>50</option>
			<option value={100} selected={pageSize === 100}>100</option>
			<option value={500} selected={pageSize === 500}>500</option>
		</select>
		<div>/ page )</div>
	</div>
	<button
		class="pageButton buttonCore"
		class:disabled={hasNoPrev}
		disabled={hasNoPrev}
		on:click={() => firstPage()}>
		<Icon icon="material-symbols:keyboard-double-arrow-left-rounded" width="25" />
	</button>
	<button
		class="pageButton buttonCore"
		class:disabled={hasNoPrev}
		disabled={hasNoPrev}
		on:click={() => prevPage()}>
		<Icon icon="material-symbols:chevron-left" width="25" />
	</button>
	<button
		class="pageButton buttonCore"
		class:disabled={hasNoNext}
		disabled={hasNoNext}
		on:click={() => nextPage()}>
		<Icon icon="material-symbols:chevron-right" width="25" />
	</button>
	<button
		class="pageButton buttonCore"
		class:disabled={hasNoNext}
		disabled={hasNoNext}
		on:click={() => lastPage()}>
		<Icon icon="material-symbols:keyboard-double-arrow-right-rounded" width="25" />
	</button>
</div>

<style lang="postcss">
	select {
		@apply mx-1 rounded-md px-1 outline-none hover:bg-blue-100 hover:text-blue-500 focus:bg-blue-100 focus:text-blue-500;
	}

	option {
		@apply bg-white;
	}
	
	.buttonCore {
		@apply m-0.5 flex place-items-center rounded-full p-2 text-center  text-gray-400  outline-none;
	}

	.pageButton:focus,
	.pageButton:hover {
		@apply bg-blue-100 text-blue-500;
	}
	.pageButton:hover.disabled {
		@apply bg-transparent text-gray-100;
	}

	.disabled {
		@apply text-gray-100;
	}
</style>
