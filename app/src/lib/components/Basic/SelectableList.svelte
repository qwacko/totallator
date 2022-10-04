<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import type { SelectableListItemType } from '../Basic/SelectableListTypes';

	const dispatch = createEventDispatcher();

	type T = $$Generic;

	export let fixedItems: SelectableListItemType<T>[];
	export let scrollItems: SelectableListItemType<T>[];
	export let searchValue: string | undefined;
	let arraySelected: ArrayType | undefined;
	let selectedIndex: number | undefined;

	type ArrayType = 'fixed' | 'scroll';

	onMount(() => {
		arraySelected = 'fixed';
		selectedIndex = 0;
		updateFocus(arraySelected, selectedIndex);
	});

	const updateFocus = (targetArray: ArrayType | undefined, targetIndex: number | undefined) => {
		if (targetArray && targetIndex !== undefined) {
			if (targetArray === 'fixed') {
				const target = fixedItems[targetIndex];
				if (target && target.item) {
					target.item.focus();
				}
			} else if (targetArray === 'scroll') {
				const target = scrollItems[targetIndex];
				if (target && target.item) {
					target.item.focus();
				}
			}
		}
	};

	const keyPressHandler = (e: KeyboardEvent) => {
		if (selectedIndex === undefined || !arraySelected) {
			return;
		}

		if (e.key === 'Escape') {
			dispatch('close');
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (arraySelected === 'fixed' && selectedIndex > 0) {
				updateFocus('fixed', 0);
			} else if (arraySelected === 'scroll' && selectedIndex < 1) {
				updateFocus('fixed', fixedItems.length - 1);
			} else if (arraySelected === 'scroll') {
				updateFocus('scroll', selectedIndex - 1);
			}
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();

			if (arraySelected === 'fixed' && selectedIndex < fixedItems.length - 1) {
				updateFocus('fixed', selectedIndex + 1);
			} else if (arraySelected === 'fixed' && selectedIndex >= fixedItems.length - 1) {
				if (scrollItems.length >= 1) {
					updateFocus('scroll', 0);
				}
			} else if (arraySelected === 'scroll' && selectedIndex < scrollItems.length - 1) {
				updateFocus('scroll', selectedIndex + 1);
			}
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			const currentItem =
				arraySelected === 'fixed' ? fixedItems[selectedIndex] : scrollItems[selectedIndex];
			if (
				(currentItem && currentItem.type === 'data') ||
				(currentItem && currentItem.type === 'clear')
			) {
				currentItem.onClick && currentItem.onClick();
			}
		}
	};
</script>

<div class="flex w-full flex-col">
	<div class="flex flex-col">
		{#each fixedItems as currentItem, index}
			{#if currentItem.type === 'search'}
				<input
					bind:this={currentItem.item}
					bind:value={searchValue}
					class="selectableItem p-2 outline-none"
					tabindex="0"
					on:focus={() => {
						selectedIndex = index;
						arraySelected = 'fixed';
					}}
					on:keydown={keyPressHandler} />
			{:else if currentItem.type === 'clear'}
				<div
					bind:this={currentItem.item}
					class="clearItem"
					tabindex="0"
					on:focus={() => {
						selectedIndex = index;
						arraySelected = 'fixed';
					}}
					on:keydown={keyPressHandler}
					on:click={() => (currentItem.onClick ? currentItem.onClick() : undefined)}>
					Clear
				</div>
			{:else if currentItem.type === 'data'}
				<div
					bind:this={currentItem.item}
					class="selectableItem "
					tabindex="0"
					on:focus={() => {
						selectedIndex = index;
						arraySelected = 'fixed';
					}}
					on:keydown={keyPressHandler}
					on:click={() => (currentItem.onClick ? currentItem.onClick() : undefined)}>
					<slot name="fixed" data={currentItem} />
				</div>
			{/if}
		{/each}
	</div>
	<div class="flex w-full flex-col overflow-y-scroll">
		{#each scrollItems as currentItem, index}
			<div
				bind:this={currentItem.item}
				class="selectableItem "
				tabindex="0"
				on:focus={() => {
					selectedIndex = index;
					arraySelected = 'scroll';
				}}
				on:click={() =>
					currentItem.type === 'data' && currentItem.onClick ? currentItem.onClick() : undefined}
				on:keydown={keyPressHandler}>
				<slot name="scroll" data={currentItem} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.selectableItem {
		@apply w-full outline-none hover:bg-blue-100 focus:bg-blue-300;
	}

	.clearItem {
		@apply w-full p-2 outline-none hover:bg-blue-100 focus:bg-blue-300;
	}
</style>
