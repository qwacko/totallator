// let result:
// 		| OperationResultStore<CreateUserMutationMutation, CreateUserMutationMutationVariables>
// 		| undefined;
// 	$: loading = $result?.fetching || false;
// 	$: if ($result?.error) {
// 		toastsStore.addToast({
// 			duration: 2000,
// 			title: 'User Creation Error',
// 			description: $result.error.message,
// 			style: 'filled',
// 			type: 'error'
// 		});
// 	}
// 	$: if ($result?.data) {
// 		toastsStore.addToast({
// 			duration: 2000,
// 			type: 'success',
// 			title: first ? 'First User Created' : 'Successfully Signed Up',
// 			description: 'Login as newly created user'
// 		});
// 		goto('/users/login');
// 	}
import toastsStore from '$lib/components/Toasts/toastsStore';
import type { OperationResultState } from '@urql/svelte/dist/types/common';

export const urqlOpHandler = <T, U>(
	result: OperationResultState<T, U> | undefined,
	{
		errorTitle = 'Error',
		successTitle,
		onSuccess,
		onError,
		successMsg
	}: {
		errorTitle?: string;
		successTitle?: string;
		onSuccess?: () => void;
		onError?: () => void;
		successMsg?: (val: T) => string;
	} = {}
) => {
	if (result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: errorTitle,
			description: result.error.message
		});
		onError && onError();
	}

	if (successTitle && result?.data) {
		toastsStore.addToast({
			duration: 2000,
			style: 'outline',
			type: 'success',
			title: successTitle,
			description: successMsg ? successMsg(result.data) : undefined
		});
		onSuccess && onSuccess();
	}

	return result?.fetching || false;
};
