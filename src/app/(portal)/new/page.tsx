import { JobForm } from "@/components/forms/new-job";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "New Job",
	description: "Create a new job posting",
};

export default async function NewJobPage() {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	return (
		<section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
			<h1 className="text-3xl font-semibold tracking-tight mb-12">New Job</h1>
			<JobForm />
		</section>
	);
}
