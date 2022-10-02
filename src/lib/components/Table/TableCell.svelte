<script lang="ts">
	import InlineBoolean from '$lib/components/InlineEdit/InlineBoolean.svelte';
	import InlineText from '$lib/components/InlineEdit/InlineText.svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';

	import AccountInlineDropdownWrapper from '../Account/AccountInlineDropdownWrapper.svelte';
	import BillInlineDropdownWrapper from '../Bill/BillInlineDropdownWrapper.svelte';
	import BudgetInlineDropdownWrapper from '../Budget/BudgetInlineDropdownWrapper.svelte';
	import CategoryInlineDropdownWrapper from '../Category/CategoryInlineDropdownWrapper.svelte';
	import InlineCurrency from '../InlineEdit/InlineCurrency.svelte';
	import InlineDate from '../InlineEdit/InlineDate.svelte';
	import InlineSimpleSelect from '../InlineEdit/InlineSimpleSelect.svelte';
	import TagInlineDropdownWrapper from '../Tag/TagInlineDropdownWrapper.svelte';
	import IconCell from './CellType/IconCell.svelte';
	import type {
		AccountSelectInfo,
		BillSelectInfo,
		BudgetSelectInfo,
		CategorySelectInfo,
		IconCellValues,
		TableColumnConfig,
		TagSelectInfo
	} from './TableTypes';

	type TableDataType<U extends Record<string, any>> = U & { id: string };
	type T = $$Generic;
	type DataType = TableDataType<T>;
	export let config: TableColumnConfig<DataType>;
	export let data: DataType;

	let currentValueString: string | undefined;
	let currentValueAccount: AccountSelectInfo[] | undefined;
	let currentValueBill: BillSelectInfo[] | undefined;
	let currentValueBudget: BudgetSelectInfo[] | undefined;
	let currentValueCategory: CategorySelectInfo[] | undefined;
	let currentValueTag: TagSelectInfo[] | undefined;
	let currentValueBoolean: boolean | undefined;
	let currentValueNumber: number | undefined;
	let currentValueIcons: IconCellValues | undefined;
	let updateTime: Date = new Date();

	const updateData = (newData: DataType) => {
		if (config.type === 'date' || config.type === 'simpleSelect' || config.type === 'text') {
			currentValueString = config.value(newData);
		} else if (config.type === 'boolean') {
			currentValueBoolean = config.value(newData);
		} else if (config.type === 'currency') {
			currentValueNumber = config.value(newData);
		} else if (config.type === 'icons') {
			currentValueIcons = config.value(newData);
		} else if (config.type === 'accountSelect') {
			currentValueAccount = config.value(newData);
		} else if (config.type === 'billSelect') {
			currentValueBill = config.value(newData);
		} else if (config.type === 'budgetSelect') {
			currentValueBudget = config.value(newData);
		} else if (config.type === 'categorySelect') {
			currentValueCategory = config.value(newData);
		} else if (config.type === 'tagSelect') {
			currentValueTag = config.value(newData);
		}
		updateTime = new Date();
	};

	$: updateData(data);

	let loading = false;
	let operationResult: OperationResultStore;
	$: loading = $operationResult && $operationResult.fetching;
	$: editable = config.editable(data);

	const handleUpdate = async (e: CustomEvent) => {
		if ((config.type === 'text' || config.type === 'simpleSelect') && config.onUpdate) {
			await config.onUpdate({
				rowData: data,
				value: e.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		} else if (
			(config.type === 'accountSelect' ||
				config.type === 'billSelect' ||
				config.type === 'budgetSelect' ||
				config.type === 'categorySelect' ||
				config.type === 'tagSelect') &&
			config.onUpdate
		) {
			await config.onUpdate({
				rowData: data,
				value: e.detail.id,
				setOperationResult: (value) => (operationResult = value)
			});
		} else if (config.type === 'boolean' && config.onUpdate) {
			await config.onUpdate({
				rowData: data,
				value: e.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		} else if (config.type === 'date' && config.onUpdate) {
			await config.onUpdate({
				rowData: data,
				value: e.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		} else if (config.type === 'currency' && config.onUpdate) {
			await config.onUpdate({
				rowData: data,
				value: e.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleComplete = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onComplete) {
			config.onComplete({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handlePrimary = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onPrimary) {
			config.onPrimary({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleLinked = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onLinked) {
			config.onLinked({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleReconciled = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onReconciled) {
			config.onReconciled({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleDataChecked = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onDataChecked) {
			config.onDataChecked({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleDeleted = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onDeleted) {
			config.onDeleted({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};

	const handleDisabled = (event: CustomEvent<boolean>) => {
		if (config.type === 'icons' && config.onDisabled) {
			config.onDisabled({
				rowData: data,
				value: event.detail,
				setOperationResult: (value) => (operationResult = value)
			});
		}
	};
</script>

<td id={`${data.id}.${config.id}.cell`} class:editable class:notEditable={!editable}>
	{#if config.type === 'text'}
		<div class="cellContentPadded">
			<InlineText
				id={`${data.id}.${config.id}.textCell`}
				disabled={!editable}
				value={currentValueString}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:enterOrBlur={handleUpdate}
				{updateTime} />
		</div>
	{:else if config.type === 'boolean'}
		<div class="cellContentPadded">
			<InlineBoolean
				id={`${data.id}.${config.id}.booleanCell`}
				disabled={!editable}
				value={currentValueBoolean}
				{loading}
				noDisabled={true}
				ring={false}
				on:enterOrBlur={handleUpdate}
				{updateTime} />
		</div>
	{:else if config.type === 'date'}
		<div class="cellContentPadded">
			<!-- Minimum Width Added to reduce jumps when selecting cell. -->
			<InlineDate
				class="min-w-[9rem]"
				id={`${data.id}.${config.id}.dateCell`}
				disabled={!editable}
				value={currentValueString}
				{loading}
				clearable={config.clearable}
				noDisabled={true}
				ring={false}
				on:enterOrBlur={handleUpdate}
				{updateTime} />
		</div>
	{:else if config.type === 'simpleSelect'}
		<div class="cellContentPadded">
			<InlineSimpleSelect
				id={`${data.id}.${config.id}.simpleSelectCell`}
				disabled={!editable}
				value={currentValueString}
				options={config.options}
				{loading}
				clearable={config.clearable}
				noDisabled={true}
				ring={false}
				on:enterOrBlur={handleUpdate}
				{updateTime} />
		</div>
	{:else if config.type === 'currency'}
		<div class="cellContentPadded">
			<InlineCurrency
				id={`${data.id}.${config.id}.textCell`}
				disabled={!editable}
				value={currentValueNumber}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:enterOrBlur={handleUpdate}
				{updateTime} />
		</div>
	{:else if config.type === 'icons'}
		<div class="cellContentPadded">
			<IconCell
				data={currentValueIcons}
				on:completeButton={handleComplete}
				on:primaryButton={handlePrimary}
				on:linkedButton={handleLinked}
				on:dataCheckedButton={handleDataChecked}
				on:deleteButton={handleDeleted}
				on:disabledButton={handleDisabled}
				on:reconciledButton={handleReconciled} />
		</div>
	{:else if config.type === 'accountSelect'}
		<div class="cellContentUnpadded">
			<AccountInlineDropdownWrapper
				id={`${data.id}.${config.id}.accountSelectCell`}
				disabled={!editable}
				value={currentValueAccount}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:update={handleUpdate}
				accountGrouping={data.accountGrouping?.id ? data.accountGrouping.id : ''} />
		</div>
	{:else if config.type === 'billSelect'}
		<div class="cellContentUnpadded">
			<BillInlineDropdownWrapper
				id={`${data.id}.${config.id}.billSelectCell`}
				disabled={!editable}
				value={currentValueBill}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:update={handleUpdate}
				accountGrouping={data.accountGrouping?.id ? data.accountGrouping.id : ''} />
		</div>
	{:else if config.type === 'budgetSelect'}
		<div class="cellContentUnpadded">
			<BudgetInlineDropdownWrapper
				id={`${data.id}.${config.id}.budgetSelectCell`}
				disabled={!editable}
				value={currentValueBudget}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:update={handleUpdate}
				accountGrouping={data.accountGrouping?.id ? data.accountGrouping.id : ''} />
		</div>
	{:else if config.type === 'categorySelect'}
		<div class="cellContentUnpadded">
			<CategoryInlineDropdownWrapper
				id={`${data.id}.${config.id}.categorySelectCell`}
				disabled={!editable}
				value={currentValueCategory}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:update={handleUpdate}
				accountGrouping={data.accountGrouping?.id ? data.accountGrouping.id : ''} />
		</div>
	{:else if config.type === 'tagSelect'}
		<div class="cellContentUnpadded">
			<TagInlineDropdownWrapper
				id={`${data.id}.${config.id}.tagSelectCell`}
				disabled={!editable}
				value={currentValueTag}
				{loading}
				clearable={config.clearable}
				textCenter={config.align === 'center'}
				noDisabled={true}
				ring={false}
				on:update={handleUpdate}
				accountGrouping={data.accountGrouping?.id ? data.accountGrouping.id : ''} />
		</div>
	{/if}
</td>

<style lang="postcss">
	td {
		@apply focus-within:ring-1;
	}

	td.editable {
		@apply hover:ring-1;
	}

	td.notEditable {
		@apply bg-gray-100;
	}

	.cellContentPadded {
		@apply text-2xs h-full w-full p-2;
	}

	.cellContentUnpadded {
		@apply text-2xs h-full w-full;
	}
</style>
