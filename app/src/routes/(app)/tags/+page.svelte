<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import TagCreate from '$lib/components/Tag/TagCreate.svelte';
	import TagTable from '$lib/components/Tag/TagTable.svelte';
	import type { InputMaybe, TagFilter, TagSort } from '$lib/graphqlClient/generated';

	let showModal = false;

	let loading = false;
	let sort: InputMaybe<TagSort | TagSort[]> | undefined;
	let filter: InputMaybe<TagFilter> | undefined;
</script>

<Modal bind:show={showModal}
	><div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Tag</div>
		<TagCreate on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex flex-col">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Tags</div>
		<Button
			class="self-center rounded-full text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<TagTable bind:sort bind:filter bind:loading />
</div>
