<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let expanded : boolean= false;
    export let hover: boolean = false;

    $: expandedInternal = expanded

	const expand = () => {
		console.log('Expanding');
		expandedInternal = true;
		dispatch('expand');
	};

	const contract = () => {
		console.log('Contracting');
		expandedInternal = false;
		dispatch('contract');
	};

	export let expandOnClick = true;
</script>

<div class={`card ${$$props.class}`} class:card-hover={hover}>
	{#if !expandedInternal}
		<div
			on:click={() => {
				if (expandOnClick && !expandedInternal) expand();
			}}
			on:keydown={() => {
				if (expandOnClick && !expandedInternal) expand();
			}}

		>
			<slot name="contracted" {expand} {contract} />
		</div>
	{:else}
		<slot name="expanded" {expand} {contract} />
	{/if}
</div>
