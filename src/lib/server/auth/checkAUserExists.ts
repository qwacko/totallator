import prisma from '$lib/server/prisma/client';

export const checkAUserExists = async () => {
	const numberUsers = await prisma.user.aggregate({ _count: true });

	if (numberUsers._count > 0) {
		return true;
	}
	return false;
};
