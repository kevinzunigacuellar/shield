import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "@/components/columns/application-columns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | Shield",
  description: "All applications received for your jobs",
};

export default async function ApplicationPage() {
  const { userId, orgId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const applications = await prisma.application.findMany({
    where: {
      job: {
        ownerId: orgId ?? userId,
      },
    },
    select: {
      id: true,
      resume: true,
      name: true,
      email: true,
      score: true,
      xata_createdat: true,
      job: {
        select: {
          id: true,
          title: true,
          ownerId: true,
        },
      },
    },
  });
  return (
    <article className="max-w-7xl w-full mx-auto mt-10 px-4 sm:px-6">
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            List of all applications for all your jobs
          </CardDescription>
        </CardHeader>
        <CardContent
          className={cn("p-4 w-full", { "h-96": !applications.length })}
        >
          {applications.length ? (
            <DataTable columns={columns} data={applications} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center w-full h-full rounded-lg border border-dashed shadow-sm p-4 text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                No applications found
              </h3>
              <p className="text-sm text-muted-foreground">
                You have not received any applications
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
