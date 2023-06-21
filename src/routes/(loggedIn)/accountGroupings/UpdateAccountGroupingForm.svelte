<script lang="ts">
	import type { Validation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { updateAccountGroupingValidationZodType } from '$lib/validation/accountGrouping/updateAccountGroupingValidation';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: Validation<updateAccountGroupingValidationZodType>;

	const { form, errors, enhance, reset } = superForm(data, {
		onUpdate: () => {
			console.log('onUpdate Complete');
			dispatch('close');
		}
	});

	onMount(() => {
		reset();
	});
</script>

<form method="POST" action="?/update" use:enhance class={$$props.class}>
	<input name="id" type="hidden" value={$form.id} />

	<!-- <h5 class="h5 col-span-2 text-center">{$form.status}</h5> -->
	<select name="status" class="select col-span-2 pb-4" bind:value={$form.status}>
		<option value="Active">Active</option>
		<option value="Disabled">Disabled</option>
		<option value="Deleted">Deleted</option>
	</select>
	<input
		name="title"
		class="input p-2 px-4 col-span-5 text-center"
		type="text"
		placeholder="Title"
		bind:value={$form.title}
	/>
	{#if $errors.title}<p>
			{$errors.title}
		</p>
	{/if}
	<button class="btn col-span-3 variant-soft-primary" type="submit">Update Account Grouping</button>
</form>
