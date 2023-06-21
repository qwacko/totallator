<script lang="ts">
	import type { RouterOutputs } from '$lib/server/trpc/router';
	export let users: RouterOutputs['accountGroupings']['get'][0]['users'];
	export let userIsAdmin: boolean;
    export let accountGroupingId: string
    export let currentUserId: string
</script>

{#each users as user}
	<p class="col-span-2 text-center">{user.name ? user.name : user.username}</p>
	{#if userIsAdmin && user.id !== currentUserId}
		<div class="btn-group variant-soft-primary col-span-1 text-center w-full">
			{#if user.admin}
				<button class="variant-filled-primary disabled" disabled>M</button>
			{:else}
				<form action="?/setUserAdmin">
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="accountGroupingId" value={accountGroupingId} />
					<button type="submit">D</button>
				</form>
			{/if}
			<form>
				<button>D</button>
			</form>
			<button>Y</button>
		</div>
	{:else}
		<div class="col-span-1 text-center">{user.admin ? 'Admin' : 'View'}</div>
	{/if}
{/each}
