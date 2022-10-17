import type { Client } from '@urql/svelte';
import { GetImportInfoDocument, type ImportDataProcessed } from '$lib/graphqlClient/generated';
import papa from 'papaparse';
import { z } from 'zod';
import { importJournalsValidation } from '$lib/utils/importJournalsValidation';

export type ImportErrorType = {
	title: string;
	location?: string;
	message?: string;
};

export const handleImport = async ({
	files,
	setErrors,
	setStatus,
	setData,
	accountGroupingId,
	client
}: {
	files: FileList | null | undefined;
	setErrors: (errors: ImportErrorType[]) => void;
	setStatus: (data: { loading: boolean; message: string }) => void;
	setData: (data: ImportDataProcessed[]) => void;
	accountGroupingId: string;
	client: Client;
}) => {
	setData([]);
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

						const importInfoCheck = await client
							.query(GetImportInfoDocument, {
								accountGroupingId,
								data: validated.data
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
							setData([]);
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
							setData([]);
							setStatus({ loading: false, message: '' });
							return;
						}
						if (
							importInfoCheck.data?.importDataCheck?.data &&
							importInfoCheck.data.importDataCheck.data.length > 0
						) {
							setData(importInfoCheck.data.importDataCheck.data);
							setErrors([]);
							setStatus({ loading: false, message: '' });
							return;
						}
						//Create Data For Transaction Creation
						setData([]);
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
		console.log('Parsing Complete');
	} else {
		setErrors([{ title: 'File Error', message: 'No Import Files Found (Or More Than One)' }]);
	}
};
