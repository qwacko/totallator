<script>
	import Navigation from '$lib/components/Basic/Navigation.svelte';
	import AuthGuard from '$lib/components/Authentication/AuthGuard.svelte';
</script>

<AuthGuard>
	<Navigation />
	<slot />
</AuthGuard>
