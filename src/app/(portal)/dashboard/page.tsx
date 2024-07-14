import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "../../../components/data-table";
import { columns } from "./job-columns";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const jobs = await prisma.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      xata_createdat: "desc",
    },
  });

  return (
    <main>
      <h1 className="sr-only">Dashboard</h1>
      <Card className="min-h-96 flex flex-col">
        <div className="p-6 px-7 flex flex-col gap-3 sm:flex-row sm:justify-between items-center">
          <div className="flex flex-col gap-1.5 w-full sm:w-auto">
            <h3 className="font-semibold leading-none tracking-tight">Jobs</h3>
            <p className="text-sm text-muted-foreground">
              List of all jobs created by the user
            </p>
          </div>
          {jobs.length ? (
            <Link
              href="/job/create"
              className={buttonVariants({ className: "w-full sm:w-auto" })}
            >
              Create a new job
            </Link>
          ) : null}
        </div>
        <CardContent className={cn(jobs.length ? "" : "flex flex-1")}>
          {jobs.length ? (
            <DataTable columns={columns} data={jobs} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center w-full min-h-fit rounded-lg border border-dashed shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no jobs
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start posting as soon as you add a job
              </p>
              <Link
                href="/job/create"
                className={buttonVariants({
                  className: "mt-4",
                })}
              >
                Create a new job
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
