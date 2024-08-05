"use server";

import { columns } from "@/components/columns/open-job-columns";
import { DataTable } from "@/components/data-table";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OpenTable() {
	const { userId, orgId } = auth();

	if (!userId) {
		return redirect("/sign-in");
	}

	const jobs = await prisma.job.findMany({
		where: {
			ownerId: orgId ?? userId,
			status: "OPEN",
		},
		orderBy: {
			createdAt: "asc",
		},
		include: {
			_count: {
				select: {
					applications: {
						where: {
							status: "PENDING",
						},
					},
				},
			},
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Open Jobs</CardTitle>
				<CardDescription>
					Manage your job postings and applications
				</CardDescription>
			</CardHeader>
			<CardContent className={cn({ "h-80": !jobs.length })}>
				{jobs.length ? (
					<DataTable columns={columns} data={jobs} />
				) : (
					<div className="flex flex-col gap-1 items-center justify-center w-full h-full rounded-lg border border-dashed shadow-sm p-4 text-center">
						<h3 className="text-2xl font-semibold tracking-tight">
							No jobs found
						</h3>
						<p className="text-muted-foreground text-sm">
							Create a job to get started
						</p>
						<Link href="/new" className={buttonVariants({ className: "mt-3" })}>
							<CirclePlus className="size-4 mr-2" /> Add Job
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
