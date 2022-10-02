<script>
	import '../app.css';
	import Toasts from '$lib/components/Toasts/Toasts.svelte';
	import { handleSilentRefresh } from 'lucia-sveltekit/client';
	import { urqlclient } from '$lib/graphqlClient/client';
	import { setContextClient } from '@urql/svelte';

	import { getSession } from 'lucia-sveltekit/client';

	const session = getSession();

	$: setContextClient(urqlclient($session?.access_token));

	handleSilentRefresh();
</script>

<slot />
<Toasts />
