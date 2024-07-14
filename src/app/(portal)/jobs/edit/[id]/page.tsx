import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobEditForm from "@/components/job-form";
import { updateJob } from "@/actions/job-actions";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function JobEditPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    select: {
      title: true,
      description: true,
      userId: true,
    },
  });

  if (!job) {
    notFound();
  }

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (userId !== job.userId) {
    redirect("/unauthorized");
  }

  return (
    <main className="py-16">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Job</CardTitle>
          <CardDescription>
            Edit the form below to update a job posting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobEditForm
            action={updateJob}
            jobId={params.id}
            initialTitle={job.title}
            initialDescriptionHtml={job.description}
          />
        </CardContent>
      </Card>
    </main>
  );
}
