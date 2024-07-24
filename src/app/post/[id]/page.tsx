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
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";

export const metadata: Metadata = {
  title: "Job",
  description: "Looking for a job? Apply today!",
};

// type Props = {
//   params: { id: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const job = await prisma.job.findUnique({
//     where: {
//       id: params.id,
//     },
//     select: {
//       title: true,
//     },
//   });

//   if (!job) {
//     notFound();
//   }

//   return {
//     title: job.title,
//     description: `Looking for a job? Apply for ${job.title} today!`,
//   }
// }

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="flex flex-col flex-1 items-center py-16 px-6 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">{job.title}</h1>
      <article
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            generateHTML(JSON.parse(job.body), [StarterKit]),
          ),
        }}
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
