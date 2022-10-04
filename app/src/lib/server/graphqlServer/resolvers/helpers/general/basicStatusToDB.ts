import type { StatusEnum } from '$lib/server/graphqlServer/types/generated-resolvers';

export const basicStatusToDBRequired = (status: StatusEnum) => {
	return {
		status,
		active: status === 'Active',
		disabled: status === 'Disabled',
		deleted: status === 'Deleted',
		allowUpdate: status === 'Active'
	};
};

export const basicStatusToDB = (status: StatusEnum | undefined | null) => {
	if (!status) {
		return {};
	}
	return basicStatusToDBRequired(status);
};
