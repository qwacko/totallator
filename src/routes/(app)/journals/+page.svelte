<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import AccountTypeSelection from '$lib/components/CommonItems/AccountTypeSelection.svelte';
	import DateRangeSelection from '$lib/components/CommonItems/DateRangeSelection.svelte';
	import GlobalAccountSelection from '$lib/components/CommonItems/GlobalAccountSelection.svelte';
	import { generalFilterStore } from '$lib/components/CommonItems/generalFilterStore';
	import CreateTransaction from '$lib/components/JournalEntries/CreateTransaction.svelte';
	import JournalTable from '$lib/components/JournalEntries/JournalTable.svelte';

	let loading = false;
	let showModal = false;
</script>

<Modal bind:show={showModal}>
	<div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Journal</div>
		<CreateTransaction on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex w-full flex-col items-center gap-2 p-2">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Journals</div>
		<Button
			class="self-center rounded-full text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<div class="flex flex-row gap-2">
		<DateRangeSelection />
		<AccountTypeSelection />
		<GlobalAccountSelection />
	</div>
	<JournalTable bind:loading externalFilter={$generalFilterStore} />
</div>
