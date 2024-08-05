import { PrismaClient } from "@prisma/client";
import { Inngest, InngestMiddleware } from "inngest";

const prismaMiddleware = new InngestMiddleware({
	name: "Prisma Middleware",
	init() {
		const prisma = new PrismaClient();

		return {
			onFunctionRun(ctx) {
				return {
					transformInput(ctx) {
						return {
							ctx: {
								prisma,
							},
						};
					},
				};
			},
		};
	},
});

export const inngest = new Inngest({
	id: "shield",
	middleware: [prismaMiddleware],
});
