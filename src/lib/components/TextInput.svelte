<script lang="ts">
	import ErrorText from './ErrorText.svelte';

	export let errorMessage: string | string[] | null | undefined;
	export let title: string | null;
	export let name: string;
</script>

<label class="label">
	{#if title}
		<span>{title}</span>
	{/if}
	<input class="input" type="text" placeholder="Input" {...$$restProps} {name} />
	<ErrorText message={errorMessage} />
</label>
