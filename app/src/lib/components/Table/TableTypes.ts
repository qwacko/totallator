import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export type TableFilterString = {
	filterType: 'text';
	key: string;
	title?: string;
};

export type TableFilterDate = {
	filterType: 'date';
	key: string;
	title?: string;
};

export type TableFilterAmount = {
	filterType: 'amount';
	key: string;
	title?: string;
};

export type TableFilterOptionsType = {
	filterType: 'options';
	key: string;
	title?: string;
	options: { value: string; title: string }[];
};

export type TableFilterBoolean = {
	filterType: 'boolean';
	key: string;
	title?: string;
	onTitle?: string;
	offTitle?: string;
};

export type TableFilterTypes =
	| TableFilterString
	| TableFilterBoolean
	| TableFilterDate
	| TableFilterAmount
	| TableFilterOptionsType;

interface TableColumnTypeBase<RowDataType> {
	id: string;
	title: string;
	sortable: boolean;
	filterType?: TableFilterTypes[];
	editable: (data: RowDataType) => boolean;
}

export interface TableColumnTypeText<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'text';
	value: (data: RowDataType) => string | undefined;
	align?: 'center' | 'left';
	clearable?: boolean;
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeCurrency<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'currency';
	value: (data: RowDataType) => number | undefined;
	align?: 'center' | 'left';
	clearable?: boolean;
	onUpdate?: (data: {
		value: number | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeBoolean<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'boolean';
	value: (data: RowDataType) => boolean | undefined;
	onUpdate?: (data: {
		value: boolean | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeDate<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'date';
	value: (data: RowDataType) => string | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

type SimpleSelectType = { value: string; label: string };

export interface TableColumnTypeSimpleSelect<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'simpleSelect';
	value: (data: RowDataType) => string | undefined;
	clearable?: boolean;
	options: SimpleSelectType[];
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export type AccountSelectInfo = {
	id: string;
	title: string;
	accountTitleCombined: string;
	type: 'Income' | 'Expense' | 'Asset' | 'Liability';
};

export type BillSelectInfo = {
	id: string;
	title: string;
};

export type BudgetSelectInfo = {
	id: string;
	title: string;
};

export type TagSelectInfo = {
	id: string;
	title: string;
};

export type CategorySelectInfo = {
	id: string;
	title: string;
};

export interface TableColumnTypeAccountSelect<RowDataType>
	extends TableColumnTypeBase<RowDataType> {
	type: 'accountSelect';
	value: (data: RowDataType) => AccountSelectInfo[] | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeBillSelect<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'billSelect';
	value: (data: RowDataType) => BillSelectInfo[] | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeBudgetSelect<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'budgetSelect';
	value: (data: RowDataType) => BudgetSelectInfo[] | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeTagSelect<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'tagSelect';
	value: (data: RowDataType) => TagSelectInfo[] | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

export interface TableColumnTypeCategorySelect<RowDataType>
	extends TableColumnTypeBase<RowDataType> {
	type: 'categorySelect';
	value: (data: RowDataType) => CategorySelectInfo[] | undefined;
	clearable?: boolean;
	align?: 'center' | 'left';
	onUpdate?: (data: {
		value: string | undefined;
		rowData: RowDataType;
		setOperationResult: <T>(value: OperationResultStore<T>) => void;
	}) => Promise<void>;
}

type IconCellModes = 'button' | 'icon' | undefined;

export interface IconCellValues {
	reconciled?: IconCellModes;
	reconciledValue?: boolean;
	dataChecked?: IconCellModes;
	dataCheckedValue?: boolean;
	complete?: IconCellModes;
	completeValue?: boolean;
	linked?: IconCellModes;
	linkedValue?: boolean;
	primary?: IconCellModes;
	primaryValue?: boolean;
	deleted?: IconCellModes;
	deletedValue?: boolean;
	disabled?: IconCellModes;
	disabledValue?: boolean;
}

type HandleChangeFunctionType<RowDataType> = (values: {
	value: boolean;
	rowData: RowDataType;
	setOperationResult: <T>(value: OperationResultStore<T>) => void;
}) => void;

export interface TableColumnTypeIcons<RowDataType> extends TableColumnTypeBase<RowDataType> {
	type: 'icons';
	value: (data: RowDataType) => IconCellValues;
	onPrimary?: HandleChangeFunctionType<RowDataType>;
	onComplete?: HandleChangeFunctionType<RowDataType>;
	onLinked?: HandleChangeFunctionType<RowDataType>;
	onReconciled?: HandleChangeFunctionType<RowDataType>;
	onDataChecked?: HandleChangeFunctionType<RowDataType>;
	onDeleted?: HandleChangeFunctionType<RowDataType>;
	onDisabled?: HandleChangeFunctionType<RowDataType>;
}

export type TableColumnConfig<RowDataType> =
	| TableColumnTypeText<RowDataType>
	| TableColumnTypeCurrency<RowDataType>
	| TableColumnTypeBoolean<RowDataType>
	| TableColumnTypeDate<RowDataType>
	| TableColumnTypeSimpleSelect<RowDataType>
	| TableColumnTypeIcons<RowDataType>
	| TableColumnTypeAccountSelect<RowDataType>
	| TableColumnTypeBillSelect<RowDataType>
	| TableColumnTypeBudgetSelect<RowDataType>
	| TableColumnTypeCategorySelect<RowDataType>
	| TableColumnTypeTagSelect<RowDataType>;

export type TableDataType<U extends Record<string, unknown>> = U & {
	id: string;
};

export type TableBulkActionsProps<U> = {
	items: U | null | undefined;
	setLoading?: (value: boolean) => void;
	setSelected?: (value: U) => void;
	setOperationStore?: (value: OperationResultStore) => void;
};

export type TableBulkActionsFunction<U> = (
	actions: TableBulkActionsProps<U>
) => Promise<void> | void;

export type TableBulkActionsSingle<U> = {
	action: TableBulkActionsFunction<U>;
	title: string;
	disabled?: boolean;
	disabledReason?: string;
};

export type TableBulkActions<U> = TableBulkActionsSingle<U>[];
