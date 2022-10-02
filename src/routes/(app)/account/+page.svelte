<script lang="ts">
	import Card from '$lib/components/Basic/Card.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import Select from '$lib/components/Basic/Select.svelte';
	import Spinner from '$lib/components/Basic/Spinner.svelte';
	import toastsStore from '$lib/components/Toasts/toastsStore';
	import { getUserData } from '$lib/graphqlClient/frontendHelpers/getUserData';
	import {
		type UpdateUserDataResultStore,
		updateUserData
	} from '$lib/graphqlClient/frontendHelpers/updateUserData';
	import type { CurrencyFormatEnum, GetUserDataQuery } from '$lib/graphqlClient/generated';
	import { currencyFormats } from '$lib/utils/currencyFormats';
	import { dateFormats } from '$lib/utils/dateFormats';
	import { firstMonthFYOptions } from '$lib/utils/firstMonthFYOptions';
	import { getContextClient } from '@urql/svelte';
	import { format } from 'date-fns';

	const client = getContextClient();
	const data = getUserData(client);

	let firstName: string;
	let firstNameLoading = false;
	let lastName: string;
	let lastNameLoading = false;
	let dateFormat: string;
	let dateFormatLoading = false;
	let currencyFormat: CurrencyFormatEnum | undefined;
	let currencyFormatLoading = false;
	let firstMonthFY: string;
	let firstMonthFYLoading: false;

	const date = new Date('2022-02-28');
	const dateFormatOptions = dateFormats.map((currentFormat) => ({
		value: currentFormat.dbValue,
		label: format(date, currentFormat.dateFnFormat)
	}));

	const firstMonthFYOptionsDropdown = firstMonthFYOptions.map((currentMonth) => ({
		value: currentMonth.dbValue.toString(),
		label: currentMonth.dropdownValue
	}));

	let result: UpdateUserDataResultStore | undefined;
	$: loading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'User Data Update Error',
			description: $result.error.message
		});
	}

	const updateLocalData = (newData: GetUserDataQuery) => {
		firstName = newData.user?.firstName || firstName;
		lastName = newData.user?.lastName || lastName;
		dateFormat = newData.user?.dateFormat || dateFormat;
		currencyFormat = newData.user?.currencyFormat || currencyFormat;
		firstMonthFY = newData.user?.firstMonthFY.toString() || firstMonthFY;
	};

	$: $data.data && updateLocalData($data.data);
</script>

<div class="flex w-full justify-center">
	<div class=" flex w-min p-10">
		<Card>
			<div class="flex w-96 flex-col gap-4 ">
				<div class="flex text-center text-lg font-bold">User Settings</div>
				<div class="flex flex-col gap-1">
					<div class="flex text-sm font-bold">
						First Name <Spinner class="mx-2 h-4 w-4 stroke-blue-500" hidden={!firstNameLoading} />
					</div>
					<Input
						id="firstName"
						bind:value={firstName}
						on:escape={() => (firstName = $data?.data?.user?.firstName || firstName)}
						on:enterOrBlur={() => {
							updateUserData({
								currentUser: $data.data?.user,
								value: { firstName },
								client,
								setOperationResult: (val) => (result = val)
							});
						}}
						name="firstName"
						placeholder="First Name"
						displayType="default"
						{loading}
						type="text" />
				</div>
				<div class="flex flex-col gap-1">
					<div class="flex text-sm font-bold">
						Last Name <Spinner class="mx-2 h-4 w-4 stroke-blue-500" hidden={!lastNameLoading} />
					</div>
					<Input
						id="lastName"
						bind:value={lastName}
						on:escape={() => (lastName = $data?.data?.user?.lastName || lastName)}
						on:enterOrBlur={() => {
							updateUserData({
								currentUser: $data.data?.user,
								value: { lastName },
								client,
								setOperationResult: (val) => (result = val)
							});
						}}
						name="lastName"
						placeholder="Last Name"
						displayType="default"
						{loading}
						type="text" />
				</div>
				<div class="flex flex-col gap-1">
					<div class="flex text-sm font-bold">
						Date Format <Spinner class="mx-2 h-4 w-4 stroke-blue-500" hidden={!dateFormatLoading} />
					</div>
					<Select
						name="dateFormat"
						id="dateFormat"
						placeholder="Date Format"
						bind:value={dateFormat}
						options={dateFormatOptions}
						{loading}
						on:change={() => {
							updateUserData({
								currentUser: $data.data?.user,
								value: { dateFormat },
								client,
								setOperationResult: (val) => (result = val)
							});
						}} />
				</div>
				<div class="flex flex-col gap-1">
					<div class="flex text-sm font-bold">
						Currency Format <Spinner
							class="mx-2 h-4 w-4 stroke-blue-500"
							hidden={!currencyFormatLoading} />
					</div>
					<Select
						name="currencyFormat"
						id="currencyFormat"
						placeholder="Currency Format"
						bind:value={currencyFormat}
						options={currencyFormats.map((item) => ({ label: item, value: item }))}
						{loading}
						on:change={() => {
							if (currencyFormat) {
								updateUserData({
									currentUser: $data.data?.user,
									value: { currencyFormat },
									client,
									setOperationResult: (val) => (result = val)
								});
							}
						}} />
				</div>
				<div class="flex flex-col gap-1">
					<div class="flex text-sm font-bold">
						First Month of Financial Year <Spinner
							class="mx-2 h-4 w-4 stroke-blue-500"
							hidden={!firstMonthFYLoading} />
					</div>
					<Select
						name="firstMonthFYDropdown"
						id="firstMonthFYDropdown"
						placeholder="First Month FY"
						bind:value={firstMonthFY}
						options={firstMonthFYOptionsDropdown}
						{loading}
						on:change={() => {
							if (firstMonthFY) {
								console.log('Updating First Month FY');
								updateUserData({
									currentUser: $data.data?.user,
									value: { firstMonthFY: Number(firstMonthFY) },
									client,
									setOperationResult: (val) => (result = val)
								});
							}
						}} />
				</div>
			</div>
		</Card>
	</div>
</div>
