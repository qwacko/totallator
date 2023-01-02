import { removeUndefinedAndDuplicates } from "src/utils/arrayHelpers";
import type { BulkUpgradeAccountGroupingValidationType } from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";
import type { AccountGroupingExportValidationType } from "src/utils/validation/accountGrouping/exportAccountGroupingValidation";

export const exportToImport = (
  data: AccountGroupingExportValidationType
): BulkUpgradeAccountGroupingValidationType => {
  const returnData: BulkUpgradeAccountGroupingValidationType = {
    accountGroupingId: data.accountGrouping.id,
  };

  if (data.accounts && data.accounts.length > 0) {
    returnData.upsertAccounts = data.accounts.map((account) => ({
      title: account.title,
      accountGroup: account.accountGroup || undefined,
      accountGroup2: account.accountGroup2 || undefined,
      accountGroup3: account.accountGroup3 || undefined,
      endDate: account.endDate || undefined,
      startDate: account.startDate || undefined,
      id: account.id,
      isCash: account.isCash,
      isNetWorth: account.isNetWorth,
      status: account.status,
      type: account.type,
    }));
  }

  if (data.categories && data.categories.length > 0) {
    returnData.upsertCategories = data.categories.map((category) => ({
      id: category.id,
      group: category.group,
      single: category.single,
      status: category.status,
    }));
  }

  if (data.tags && data.tags.length > 0) {
    returnData.upsertTags = data.tags.map((tag) => ({
      id: tag.id,
      group: tag.group,
      single: tag.single,
      status: tag.status,
    }));
  }

  if (data.bills && data.bills.length > 0) {
    returnData.upsertBills = data.bills.map((bill) => ({
      id: bill.id,
      title: bill.title,
      status: bill.status,
    }));
  }

  if (data.budgets && data.budgets.length > 0) {
    returnData.upsertBudgets = data.budgets.map((budget) => ({
      id: budget.id,
      title: budget.title,
      status: budget.status,
    }));
  }

  if (data.journalEntries && data.journalEntries.length > 0) {
    const transactionIds = removeUndefinedAndDuplicates(
      data.journalEntries.map((item) => item.transactionId)
    );

    returnData.createTransactions = transactionIds.map((trans) => {
      const journals = data.journalEntries.filter(
        (item) => item.transactionId === trans
      );

      return journals.map((journal) => ({
        billId: journal.billId || undefined,
        budgetId: journal.budgetId || undefined,
        tagId: journal.tagId || undefined,
        categoryId: journal.categoryId || undefined,
        accountId: journal.accountId,
        amount: journal.amount,
        date: journal.date,
        description: journal.description,
        linked: journal.linked,
        dataChecked: journal.dataChecked,
        reconciled: journal.reconciled,
        complete: journal.complete,
        accountGroupingId: data.accountGrouping.id,
      }));
    });
  }

  return returnData;
};
