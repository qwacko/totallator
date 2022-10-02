<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';

	const lucia = getSession();

	$: if (!$lucia?.user) {
		if (browser) {
			goto('/users/login');
		}
	}
</script>

<slot />
