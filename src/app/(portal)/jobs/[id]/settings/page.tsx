import { JobForm } from "@/components/forms/update-job-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Job Settings",
	description: "Manage your job postings and applications",
};

export default async function JobsApplicationPage({
	params,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const job = await prisma.job.findUnique({
		where: {
			id: params.id,
		},
	});

	if (!job) {
		notFound();
	}

	const { userId, orgId } = auth();
	const currentUserId = orgId ?? userId;

	if (job.ownerId !== currentUserId) {
		redirect("/unauthorized");
	}

	return (
		<JobForm
			title={job.title}
			body={job.body}
			status={job.status}
			id={job.id}
			ownerId={job.ownerId}
		/>
	);
}
