import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { ApplicationForm } from "./application-form";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
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

  return {
    title: job?.title || "Job not found",
    description: job?.description || "Job not found",
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
    <main className="flex flex-col items-center py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">{job.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
        className="prose max-w-none w-full prose-h2:font-semibold prose-h2:text-xl"
      />
      <ApplicationForm jobId={job.id} />
    </main>
  );
}
