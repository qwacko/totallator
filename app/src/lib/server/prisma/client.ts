import { dev } from '$app/environment';
import pkg, { PrismaClient } from '@prisma/client';

declare global {
	var _prisma: PrismaClient; // eslint-disable-line
}

let prisma;
if (dev) {
	if (!global._prisma) {
		global._prisma = new PrismaClient();
	}
	prisma = global._prisma;
} else {
	const { PrismaClient } = pkg;
	prisma = new PrismaClient();
}

export default prisma as PrismaClient; // type assertion for shim
