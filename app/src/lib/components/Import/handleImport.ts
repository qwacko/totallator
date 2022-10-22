import type { Client } from '@urql/svelte';
import {
	AccountType,
	GetImportInfoDocument,
	StatusEnum,
	type ImportAccountInput,
	type ImportBillInput,
	type ImportBudgetInput,
	type ImportCategoryInput,
	type ImportDataResult,
	type ImportTagInput,
	type InputMaybe
} from '$lib/graphqlClient/generated';
import papa from 'papaparse';
import { z } from 'zod';
import { importJournalsValidation } from '$lib/utils/importJournalsValidation';
import { importJSONValidation } from '$lib/utils/importValidation/importJSONValidation';
import type { accountTypeEnumValidation } from '$lib/utils/importValidation/accountTypeEnumValidation';
import type { statusEnumValidation } from '$lib/utils/importValidation/statusEnumValidation';
import { omit } from 'lodash-es';

export type ImportErrorType = {
	title: string;
	location?: string;
	message?: string;
};

export type ImportType = 'csv' | 'json';

export const handleImport = async ({
	files,
	setErrors,
	setStatus,
	setData,
	accountGroupingId,
	client,
	importType
}: {
	files: FileList | null | undefined;
	setErrors: (errors: ImportErrorType[]) => void;
	setStatus: (data: { loading: boolean; message: string }) => void;
	setData: (data: ImportDataResult) => void;
	accountGroupingId: string;
	client: Client;
	importType: ImportType;
}) => {
	setData({});
	setStatus({ loading: true, message: 'Checking CSV Data' });
	const agUUID = z.string().uuid().safeParse(accountGroupingId);
	if (!agUUID.success) {
		setErrors([
			{
				title: 'No Account Grouping',
				location: 'Account Grouping',
				message: 'No Account Grouping Selected or not a UUID'
			}
		]);
		setStatus({ loading: false, message: '' });
		return;
	}
	if (files && files.length === 1) {
		if (importType === 'json') {
			const fileContent = await files[0].text();
			const data = JSON.parse(fileContent);
			const validated = importJSONValidation.safeParse(data);
			if (!validated.success) {
				setErrors(
					validated.error.errors.map((error) => ({
						title: error.code,
						location: `${error.path}`,
						message: error.message
					}))
				);
				setStatus({ loading: false, message: '' });
			} else {
				const stringToStatus = <
					T extends {
						status?: z.infer<typeof statusEnumValidation>;
						[key: string]: unknown;
					}
				>(
					data: T[]
				) => {
					return data.map((item) => {
						if (item.status) {
							const status: InputMaybe<StatusEnum> | undefined =
								item.status === 'Active'
									? StatusEnum.Active
									: item.status === 'Deleted'
									? StatusEnum.Deleted
									: item.status === 'Disabled'
									? StatusEnum.Disabled
									: undefined;
							return { ...item, status };
						}

						return omit(item, 'status');
					});
				};

				const fixAccountTypeToGraphql = <
					T extends {
						type?: z.infer<typeof accountTypeEnumValidation>;
						[key: string]: unknown;
					}
				>(
					data: T[]
				) => {
					return data.map((item) => {
						if (item.type) {
							const type: InputMaybe<AccountType> | undefined =
								item.type === 'Asset'
									? AccountType.Asset
									: item.type === 'Expense'
									? AccountType.Expense
									: item.type === 'Income'
									? AccountType.Income
									: item.type === 'Liability'
									? AccountType.Liability
									: item.type;
							return { ...item, type };
						}

						return omit(item, 'type');
					});
				};

				const bills: ImportBillInput[] = stringToStatus(validated.data.bills);
				const budgets: ImportBudgetInput[] = stringToStatus(validated.data.budgets);
				const categories: ImportCategoryInput[] = stringToStatus(validated.data.categories);
				const tags: ImportTagInput[] = stringToStatus(validated.data.tags);
				const accounts: ImportAccountInput[] = fixAccountTypeToGraphql(
					stringToStatus(validated.data.accounts)
				);

				const importInfoCheck = await client
					.query(GetImportInfoDocument, {
						accountGroupingId,
						data: {
							journals: validated.data.journalEntries,
							bills,
							categories,
							tags,
							budgets,
							accounts
						}
					})
					.toPromise();

				if (importInfoCheck.error) {
					setErrors([
						{
							title: importInfoCheck.error.name,
							message: importInfoCheck.error.message,
							location: 'GraphQL'
						}
					]);
					setData({});
					setStatus({ loading: false, message: '' });
					return;
				}

				if (
					importInfoCheck.data?.importDataCheck?.errors &&
					importInfoCheck.data?.importDataCheck?.errors.length > 0
				) {
					setErrors(
						importInfoCheck.data.importDataCheck.errors.map((error) => ({
							title: error?.title || '',
							message: error?.message || '',
							location: error?.location || ''
						}))
					);
					setData({});
					setStatus({ loading: false, message: '' });
					return;
				}

				if (importInfoCheck?.data?.importDataCheck?.data) {
					setData(importInfoCheck.data.importDataCheck?.data);
					setErrors([]);
					setStatus({ loading: false, message: '' });
					return;
				}
				//Create Data For Transaction Creation
				setData({});
				setErrors([{ title: 'No Data', location: '', message: 'No Data Available' }]);
				setStatus({ loading: false, message: '' });

				setStatus({ loading: false, message: '' });
			}
		} else {
			papa.parse(files[0], {
				header: true,
				skipEmptyLines: 'greedy',
				complete: async (results) => {
					setStatus({ loading: true, message: 'Checking Loaded Data' });
					if (results?.errors?.length > 0) {
						setErrors(
							results.errors.map((error) => ({
								title: error.code,
								location: `CSV Row = ${error.row}`,
								message: error.message
							}))
						);
						setStatus({ loading: false, message: '' });
					} else {
						console.log({ data: results.data });
						const validated = importJournalsValidation.safeParse(results.data);
						if (validated.success) {
							setStatus({ loading: true, message: 'Processing CSV File' });

							const removeUnwanted = validated.data.map((item) => item);

							const importInfoCheck = await client
								.query(GetImportInfoDocument, {
									accountGroupingId,
									data: { journals: removeUnwanted }
								})
								.toPromise();

							if (importInfoCheck.error) {
								setErrors([
									{
										title: importInfoCheck.error.name,
										message: importInfoCheck.error.message,
										location: 'GraphQL'
									}
								]);
								setData({});
								setStatus({ loading: false, message: '' });
								return;
							}
							if (
								importInfoCheck.data?.importDataCheck?.errors &&
								importInfoCheck.data?.importDataCheck?.errors.length > 0
							) {
								setErrors(
									importInfoCheck.data.importDataCheck.errors.map((error) => ({
										title: error?.title || '',
										message: error?.message || '',
										location: error?.location || ''
									}))
								);
								setData({});
								setStatus({ loading: false, message: '' });
								return;
							}
							if (importInfoCheck.data?.importDataCheck?.data) {
								setData(importInfoCheck.data.importDataCheck.data);
								setErrors([]);
								setStatus({ loading: false, message: '' });
								return;
							}
							//Create Data For Transaction Creation
							setData({});
							setErrors([{ title: 'No Data', location: '', message: 'No Data Available' }]);
							setStatus({ loading: false, message: '' });
						} else {
							setErrors(
								validated.error.errors.map((error) => ({
									title: error.code,
									location: `${error.path}`,
									message: error.message
								}))
							);
							setStatus({ loading: false, message: '' });
						}
					}
				}
			});
		}
		console.log('Parsing Complete');
	} else {
		setErrors([{ title: 'File Error', message: 'No Import Files Found (Or More Than One)' }]);
	}
};
