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
import { columns } from "@/components/columns/app-page-columns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | Shield",
  description: "All applications received for your jobs",
};

export default async function ApplicationPage() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const applications = await prisma.application.findMany({
    where: {
      job: {
        userId,
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
          userId: true,
        },
      },
    },
  });
  return (
    <Card
      className={cn("flex flex-col", { "h-[450px]": !applications.length })}
    >
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          List of all applications for all your jobs
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
              You have not received any applications
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
