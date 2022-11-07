import type { allImportType } from './importTypeBuildProcessing';

export const getJournalImportInfo = async (data: allImportType, accountGroupingId: string) => {
	console.log({ data, accountGroupingId });

	//TODO Process / Check The Import Journals as per below
	//STEPS TO INCLUDE
	// * Adjust Other Import Information to all be the ID Only (From Found Data) - Collect Errors from this step for not possible links, and return as such.
	// * Check what IDs already Exist (Change / Unchanged Journals)
	// * Check what other journals have a matching Date, Amount, Account and Description (That ID Is Not Found)
	// * For found Journals, identify if it is changed or unchanged. (Check All Return Properties)
	// * Check the "New" Journals / Transactions
	// * Build Return
};
