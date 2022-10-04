<script lang="ts">
	import Button from '../Basic/Button.svelte';
	import { signOut } from 'lucia-sveltekit/client';
</script>

<Button defaultText="Logout" displayType="default" type="button" on:click={() => signOut()} />
