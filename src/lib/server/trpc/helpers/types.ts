export type UpsertActions = 'Create' | 'Update' | 'Upsert';

export type UpsertReturnType<T> = {
	idLookup: Record<string, T>;
	nameLookup: Record<string, T>;
	allLookup: Record<string, T>;
};
