<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { createAccountGroupingValidationZodType } from '$lib/validation/accountGrouping/createAccountGroupingValidation';
	import type { Validation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: Validation<createAccountGroupingValidationZodType>;

	const { form, errors, enhance } = superForm(data);
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="w-full grid grid-cols-10">
		<div class="col-span-2" />
		<input name="title" type="text" placeholder="Title" class="col-span-5 " />
		{#if $errors.title}<p>
				{$errors.title}
			</p>
		{/if}
		<Button style="secondary" type="submit" class="col-span-3">Create Account Grouping</Button>
	</div>
</form>
