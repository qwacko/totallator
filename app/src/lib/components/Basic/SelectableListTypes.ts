type SelectableListSearchType = {
	type: 'search';
	item?: HTMLElement;
};

type SelectableListClearType = {
	type: 'clear';
	onClick?: () => void;
	item?: HTMLElement;
};

type SelectableListDataType<T> = {
	onClick?: () => void;
	type: 'search' | 'data';
	data: T;
	item?: HTMLElement;
};

export type SelectableListItemType<T> =
	| SelectableListSearchType
	| SelectableListDataType<T>
	| SelectableListClearType;
