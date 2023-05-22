<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let message: string | null | undefined = undefined;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<button
	type="button"
	on:click
	on:keydown
	on:keypress
	class="btn btn-sm variant-filled [&>*]:pointer-events-none"
	use:popup={popupHover}
>
	<Icon icon="mdi:pencil" />
</button>

{#if message}
	<div class="card p-1 variant-filled-secondary" data-popup="popupHover">
		<p>{message}</p>
		<div class="arrow variant-filled-secondary" />
	</div>
{/if}
