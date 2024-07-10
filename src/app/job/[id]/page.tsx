import { prisma } from "@/lib/prisma";
import JobClientPost from "@/components/JobPost";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!job) {
    return (
      <main>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto py-10 prose">
      <h1 className="">{job.title}</h1>
      <JobClientPost html={job.description} />
      <h2 className="text-xl font-bold">Apply Now</h2>
      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <Label htmlFor="resume">Resume</Label>
          <Input id="resume" type="file" />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </main>
  );
}
