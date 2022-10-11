import { writable } from 'svelte/store';

export function triggerStore() {
	const { subscribe, set } = writable<boolean>(false);

	const trigger = () => {
		set(true);
		// Delay to ensure the trigger is captured.
		setTimeout(() => {
			set(false);
		}, 100);
	};

	return {
		subscribe,
		trigger
	};
}
