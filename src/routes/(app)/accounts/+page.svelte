<script lang="ts">
	import AccountCreate from '$lib/components/Account/AccountCreate.svelte';
	import AccountTable from '$lib/components/Account/AccountTable.svelte';
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';

	let showModal = false;
	let loading = false;
</script>

<Modal bind:show={showModal}
	><div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Account</div>
		<AccountCreate on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex flex-col">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Accounts</div>
		<Button
			class="self-center rounded-full text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<AccountTable bind:loading />
</div>
