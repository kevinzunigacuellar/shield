import { prisma } from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notFound } from "next/navigation";
import { createApplication } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import sanitizeHtml from "sanitize-html";

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job
    .findUnique({
      where: {
        id: params.id,
      },
    })
    .catch();

  if (!job) {
    notFound();
  }

  const actionWithId = createApplication.bind(null, job.id);

  return (
    <main className="flex flex-col items-center py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 ">{job.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
        className="prose"
      />
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Apply Now</CardTitle>
          <CardDescription>
            Fill out the form below to apply for this job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 w-full" action={actionWithId}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" name="resume" type="file" />
            </div>
            <div className="flex justify-end">
              <Button>Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
