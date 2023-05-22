<script lang="ts">
	export let style: 'primary' | 'secondary' = 'primary';
</script>

{#if style === 'primary'}
	<button type="button" class="btn-icon variant-filled-primary" {...$$restProps} on:click><slot /></button>
{:else}
	<button type="button" class="btn-icon variant-filled-secondary" {...$$restProps} on:click><slot /></button>
{/if}
