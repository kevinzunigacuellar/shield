"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns/archive-job-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { JobType } from "@/schema/job";

export default async function ArchiveTable() {
  const { userId, orgId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const jobs = (await prisma.job.findMany({
    where: {
      ownerId: orgId ?? userId,
      status: "CLOSED",
    },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      ownerId: true,
      status: true,
    },
    // NOTE: To make ts happy
  })) as JobType[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Closed Jobs</CardTitle>
        <CardDescription>Manage your archived job postings</CardDescription>
      </CardHeader>
      <CardContent className={cn({ "h-96": !jobs.length })}>
        {jobs.length ? (
          <DataTable columns={columns} data={jobs} />
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center w-full h-full rounded-lg border border-dashed shadow-sm p-4 text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              No jobs found
            </h3>
            <p className="text-muted-foreground text-sm">
              No jobs have been archived
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
