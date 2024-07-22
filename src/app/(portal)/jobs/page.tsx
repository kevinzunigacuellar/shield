import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns/job-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import CreateJob from "@/components/job-form";

export const metadata: Metadata = {
  title: "Jobs | Shield",
  description: "Manage your job postings and applications",
};

export default async function JobsPage() {
  const { userId, orgId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const jobs = await prisma.job.findMany({
    where: {
      ownerId: orgId ?? userId,
      status: "OPEN",
    },
    orderBy: {
      xata_createdat: "asc",
    },
    include: {
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  return (
    <article className="max-w-7xl w-full mx-auto mt-10 px-4 sm:px-6">
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Jobs</CardTitle>
          <CardDescription>
            Manage your job postings and applications
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("p-4 w-full", { "h-96": !jobs.length })}>
          {jobs.length ? (
            <DataTable columns={columns} data={jobs} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center w-full h-full rounded-lg border border-dashed shadow-sm p-4 text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                No jobs found
              </h3>
              <p className="text-muted-foreground text-sm">
                Create a new job to get started
              </p>
              <CreateJob>
                <Button className="mt-3">Create a new job</Button>
              </CreateJob>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
