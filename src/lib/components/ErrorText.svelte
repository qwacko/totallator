<script lang="ts">
	export let message: string | string[] | null = null;
</script>

{#if message && message.length > 0}
	<aside class="alert variant-ghost">
		<div class="alert-message">{message}</div>
	</aside>
{/if}

