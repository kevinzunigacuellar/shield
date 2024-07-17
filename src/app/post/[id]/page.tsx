import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ApplicationForm from "@/components/application-form";
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return {
    title: job?.title || "Job not found",
    description:
      `Looking for a job? Check out this job posting for ${job?.title}` ||
      "Job not found",
  };
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center py-16 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">{job.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
        className="prose max-w-none w-full prose-h2:font-semibold prose-h2:text-xl"
      />
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Apply Now</CardTitle>
          <CardDescription>
            Fill out the form below to apply for this job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm jobId={job.id} />
        </CardContent>
      </Card>
    </main>
  );
}
