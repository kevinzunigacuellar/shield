"use server";

import { columns } from "@/components/columns/pending-application-columns";
import { DataTable } from "@/components/data-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import type { ApplicationType } from "@/schema/application";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PendingApplicationTable({
	jobId,
}: {
	jobId: string;
}) {
	const { userId, orgId } = auth();

	if (!userId) {
		return redirect("/sign-in");
	}
	const applications = (await prisma.application.findMany({
		where: {
			jobId,
			status: "PENDING",
			job: {
				ownerId: orgId ?? userId,
			},
		},
		include: {
			job: true,
		},
		// NOTE: Workaround for prisma typing
	})) as ApplicationType[];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Pending Applications</CardTitle>
				<CardDescription>Manage your pending applications</CardDescription>
			</CardHeader>
			<CardContent className={cn({ "h-80": !applications.length })}>
				{applications.length ? (
					<DataTable columns={columns} data={applications} />
				) : (
					<div className="flex flex-col gap-1 items-center justify-center w-full h-full rounded-lg border border-dashed shadow-sm p-4 text-center">
						<h3 className="text-2xl font-semibold tracking-tight">
							No applications found
						</h3>
						<p className="text-muted-foreground text-sm">
							You have not received new applications
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
