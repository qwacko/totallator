<script lang="ts">
	export let style: 'primary' | 'secondary' = 'primary';
</script>

{#if style === 'primary'}
	<button type="button" class="btn variant-filled-primary {$$props.class}" {...$$restProps} on:click
		><slot /></button
	>
{:else}
	<button type="button" class="btn variant-filled-secondary {$$props.class}" {...$$restProps} on:click
		><slot /></button
	>
{/if}
