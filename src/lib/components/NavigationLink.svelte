<script lang="ts">
	import { page } from '$app/stores';

	export let url: string;

	$: urlMatch = $page.url.pathname === url;
</script>

<a
	href={url}
	class="btn btn-sm flex"
	class:variant-filled-primary={urlMatch}
	class:variant-ghost-secondary={!urlMatch}
>
	<slot />
</a>
