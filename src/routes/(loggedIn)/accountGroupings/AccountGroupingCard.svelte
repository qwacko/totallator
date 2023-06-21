<script lang="ts">
	import ExpandableCard from '$lib/components/ExpandableCard.svelte';
	import type { RouterOutputs } from '$lib/server/trpc/router';
	import type { updateAccountGroupingValidationZodType } from '$lib/validation/accountGrouping/updateAccountGroupingValidation';
	import UpdateAccountGroupingForm from './UpdateAccountGroupingForm.svelte';
	import UpdateAccountGroupingUsers from './UpdateAccountGroupingUsers.svelte';
	import type { Validation } from 'sveltekit-superforms';

	export let expandedId: number;
	export let i: number;
	export let accountGrouping: RouterOutputs['accountGroupings']['get'][0];
	export let form: Validation<updateAccountGroupingValidationZodType>;
	export let currentUserId: string;
</script>

<svelte lang="ts" />

<ExpandableCard
	class="bg-gradient-to-br variant-ghost-primary p-4 gap-2 items-center"
	on:expand
	expanded={expandedId === i}
	on:contract
>
	<svelte:fragment slot="contracted">
		<div class="w-full grid grid-cols-10">
			<h5 class="h5 col-span-2 text-center">{accountGrouping.status}</h5>
			<h5 class="h5 col-span-5 text-center">{accountGrouping.title}</h5>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="expanded" let:contract>
		<div class="w-full grid grid-cols-10 gap-4 justify-items-center items-center">
			<UpdateAccountGroupingForm
				data={form}
				on:close={contract}
				class="col-span-10 grid grid-cols-10 justify-items-center items-center w-full gap-4"
			/>
			<div class="col-span-3 grid grid-cols-3 w-full gap-4 justify-items-center items-center">
				<h4 class="h4 col-span-3 text-center">Users</h4>
				<UpdateAccountGroupingUsers
					users={accountGrouping.users}
					userIsAdmin={accountGrouping.userIsAdmin}
					accountGroupingId={accountGrouping.id}
					{currentUserId}
				/>
			</div>
		</div>
	</svelte:fragment>
</ExpandableCard>
