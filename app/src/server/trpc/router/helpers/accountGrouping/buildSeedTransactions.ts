export type DefaultTransactionSeedingConfig = {
  descriptions: string | string[];
  dateStart: Date;
  dateEnd: Date;
  amountMax: number;
  amountMin: number;
  fromAccounts: string[];
  toAccounts: string[];
  bills?: (string | undefined)[];
  budgets?: (string | undefined)[];
  categories?: (string | undefined)[];
  tags?: (string | undefined)[];
  daysSinceReconciled?: number;
  daysSinceChecked?: number;
  daysSinceComplete?: number;
  total: number;
  percentOfTotal: number;
};
