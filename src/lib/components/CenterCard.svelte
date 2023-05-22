<script lang="ts">
	export let title: string | null;
</script>

<div class="mx-20 my-4">
	<div class="card">
		{#if title}<header class="card-header">{title}</header>{/if}
		<section class="p-4"><slot /></section>
	</div>
</div>
