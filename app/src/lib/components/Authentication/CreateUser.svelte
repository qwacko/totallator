<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import toastsStore from '$lib/components/Toasts/toastsStore';
	import { urqlOpHandler } from '$lib/graphqlClient/frontendHelpers/urqlHandlers';
	import {
		CreateUserMutationDocument,
		type CreateUserMutationMutation,
		type CreateUserMutationMutationVariables
	} from '$lib/graphqlClient/generated';
	import {
		emailField,
		passwordField,
		stringField
	} from '$lib/utils/formValidation/stringValidations';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';

	export let admin = false;
	export let first = false;

	const client = getContextClient();
	let result:
		| OperationResultStore<CreateUserMutationMutation, CreateUserMutationMutationVariables>
		| undefined;

	$: loading = urqlOpHandler($result, {
		errorTitle: 'User Creation Error',
		successTitle: first ? 'First User Created' : 'Successfully Signed Up',
		onSuccess: () => goto('/users/login')
	});

	let email = emailField();
	let password = passwordField();
	let firstName = stringField({ title: 'First Name' });
	let lastName = stringField({ title: 'Last Name' });

	const login = async () => {
		email = email.validate(email);
		firstName = firstName.validate(firstName);
		lastName = lastName.validate(lastName);
		password = password.validate(password);

		const anyError = email.hasError || firstName.hasError || lastName.hasError || password.hasError;

		if (!anyError) {
			result = mutationStore({
				client,
				query: CreateUserMutationDocument,
				variables: {
					data: {
						email: email.value,
						firstName: firstName.value as string,
						lastName: lastName.value as string,
						password: password.value as string,
						admin
					}
				}
			});
		} else {
			toastsStore.addToast({
				duration: 1000,
				title: 'Input Error'
			});
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<div class="m-2 flex flex-col gap-4">
		<div class="mb-2 flex text-left text-xl font-bold">
			{#if first}Create First User{:else}Sign Up{/if}
		</div>
		<Input
			id="email"
			name="email"
			type="text"
			placeholder="Email Address"
			bind:value={email.value}
			errorMessage={email.error} />
		<Input
			id="firstName"
			name="firstName"
			type="text"
			placeholder="First Name"
			bind:value={firstName.value}
			errorMessage={firstName.error} />
		<Input
			id="lastName"
			name="lastName"
			type="text"
			placeholder="Last Name"
			bind:value={lastName.value}
			errorMessage={lastName.error} />
		<Input
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			bind:value={password.value}
			errorMessage={password.error} />
		<Button
			displayType="default"
			type="submit"
			{loading}
			defaultText={first ? 'Create First User' : 'Sign Up'}
			loadingText={first ? 'Creating....' : 'Signing Up...'} />
		<div class="flex">
			<a
				href="/users/login"
				class="w-full text-right text-sm text-blue-500 hover:text-blue-800 hover:underline">
				Login
			</a>
		</div>
	</div>
</form>
