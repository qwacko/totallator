<script lang="ts">
	import ExpandableCard from '$lib/components/ExpandableCard.svelte';
	import CreateAccountGroupingForm from './CreateAccountGroupingForm.svelte';
	import AccountGroupingCard from './AccountGroupingCard.svelte';
	import ColumnHeader from '$lib/components/Table/ColumnHeader.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageStack from '$lib/components/PageStack.svelte';

	export let data;

	let expandedId = -1;

	console.log("Data",data)
</script>

<PageStack>
	<Header>Account Groupings</Header>

	<Table>
		<svelte:fragment slot="header">
			<ColumnHeader colSpan={2} center={true} title="Status" />
			<ColumnHeader colSpan={5} center={true} title="Title" />
		</svelte:fragment>
		{#if data.accountGroupings.length > 0}
			{#each data.accountGroupings as accountGrouping, i}
				<AccountGroupingCard
					{expandedId}
					{i}
					{accountGrouping}
					on:expand={() => (expandedId = i)}
					on:contract={() => (expandedId = -1)}
					form={data.updateForms[i]}
					currentUserId={data.user.user.userId}

				/>
			{/each}
		{/if}
		<svelte:fragment slot="footer">
			<ExpandableCard
				class="bg-gradient-to-br variant-gradient-primary-tertiary p-4 flex flex-col gap-1 items-center mt-1"
				expandOnClick={false}
			>
				<svelte:fragment slot="contracted" let:expand>
					{#if data.accountGroupings.length === 0}<p>No Account Groupings...</p>{/if}
					<button class="btn variant-ringed-secondary" on:click={expand} on:keypress={expand}>
						Create Account Grouping
					</button>
				</svelte:fragment>
				<svelte:fragment slot="expanded" let:contract>
					<div class="flex">
						<CreateAccountGroupingForm data={data.createForm} />
					</div>
					<div class="flex">
						<button on:click={contract} on:keypress={contract}>Cancel</button>
					</div>
				</svelte:fragment>
			</ExpandableCard>
		</svelte:fragment>
	</Table>
</PageStack>
