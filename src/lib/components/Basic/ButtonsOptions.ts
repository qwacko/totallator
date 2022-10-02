export type ButtonsOptions = {
	label: string;
	value: string;
	selected: boolean;
	onClick?: () => void;
	colour: 'blue' | 'white' | 'red';
}[];
