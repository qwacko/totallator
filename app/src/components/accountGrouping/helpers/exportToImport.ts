import type { AccountGroupingExportValidationType } from "src/utils/validation/accountGrouping/exportAccountGroupingValidation";
import type { AccountGroupingImportValidationType } from "src/utils/validation/accountGrouping/importAccountGroupingValidation";

export const exportToImport = (
  data: AccountGroupingExportValidationType
): AccountGroupingImportValidationType => {
  const returnData: AccountGroupingImportValidationType = {
    accountGroupingId: data.accountGrouping.id,
  };

  if (data.accounts && data.accounts.length > 0) {
    returnData.accounts = data.accounts.map((account) => ({
      id: account.id,
      status: account.status,
      type: account.type,
      title: account.title,
      accountGroup: account.accountGroup,
      accountGroup2: account.accountGroup2,
      accountGroup3: account.accountGroup3,
      endDate: account.endDate,
      startDate: account.startDate,
      isCash: account.isCash,
      isNetWorth: account.isNetWorth,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }));
  }

  if (data.categories && data.categories.length > 0) {
    returnData.categories = data.categories.map((category) => ({
      id: category.id,
      status: category.status,
      group: category.group,
      single: category.single,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }

  if (data.tags && data.tags.length > 0) {
    returnData.tags = data.tags.map((tag) => ({
      id: tag.id,
      status: tag.status,
      group: tag.group,
      single: tag.single,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    }));
  }

  if (data.bills && data.bills.length > 0) {
    returnData.bills = data.bills.map((bill) => ({
      id: bill.id,
      status: bill.status,
      title: bill.title,
      createdAt: bill.createdAt,
      updatedAt: bill.updatedAt,
    }));
  }

  if (data.budgets && data.budgets.length > 0) {
    returnData.budgets = data.budgets.map((budget) => ({
      id: budget.id,
      status: budget.status,
      title: budget.title,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    }));
  }

  if (data.journalEntries && data.journalEntries.length > 0) {
    returnData.journalEntries = data.journalEntries.map((journal) => ({
      id: journal.id,
      date: journal.date,
      description: journal.description,
      amount: journal.amount,
      accountId: journal.accountId,
      billId: journal.billId,
      budgetId: journal.budgetId,
      tagId: journal.tagId,
      categoryId: journal.categoryId,
      linked: journal.linked,
      dataChecked: journal.dataChecked,
      reconciled: journal.reconciled,
      complete: journal.complete,
      transactionId: journal.transactionId,
      createdAt: journal.createdAt,
      updatedAt: journal.updatedAt,
    }));
  }

  return returnData;
};
