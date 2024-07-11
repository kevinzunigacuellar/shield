import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { ApplicationForm } from "./application-form";

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job
    .findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    })
    .catch();

  if (!job) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 ">{job.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
        className="prose"
      />
      <ApplicationForm jobId={job.id} />
    </main>
  );
}
