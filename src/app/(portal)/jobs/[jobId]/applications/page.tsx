import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns/application-columns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface JobApplicationsPageProps {
  params: {
    jobId: string;
  };
}

export const metadata: Metadata = {
  title: "Applications",
  description: "Applications for the job",
};
export default async function JobApplicationsPage({
  params,
}: JobApplicationsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const applications = await prisma.application.findMany({
    where: {
      jobId: params.jobId,
    },
  });

  return (
    <main>
      <h1 className="sr-only">Dashboard</h1>
      <Card
        className={cn("flex flex-col", { "h-[450px]": !applications.length })}
      >
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            List of all applications for this job
          </CardDescription>
        </CardHeader>
        <CardContent className={cn({ "flex flex-1": !applications.length })}>
          {applications.length ? (
            <DataTable columns={columns} data={applications} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center w-full min-h-fit rounded-lg border border-dashed shadow-sm p-4 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No applications found
              </h3>
              <p className="text-sm text-muted-foreground">
                You have not received any applications for this job
              </p>
              <Link
                href={`/post/${params.jobId}`}
                className={buttonVariants({
                  className: "mt-3",
                })}
              >
                Preview job post
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
