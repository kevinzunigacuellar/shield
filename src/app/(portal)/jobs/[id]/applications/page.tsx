import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import prisma from "@/lib/prisma";
import PendingApplicationTable from "@/components/tables/pending-application-table";
import ArchiveApplicationTable from "@/components/tables/archive-application-table";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Jobs | Shield",
  description: "Manage your job postings and applications",
};

export default async function JobsApplicationPage({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId, orgId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const application = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
    select: {
      title: true,
      ownerId: true,
    },
  });

  if (!application) {
    notFound();
  }

  const currentUserId = orgId ?? userId;

  if (currentUserId !== application.ownerId) {
    redirect("/unauthorized");
  }

  return (
    <>
      <header className="w-full border-b bg-background">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl font-semibold tracking-tight">{`Applications for ${application.title}`}</h1>
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto my-10 px-4 sm:px-6">
        <Link
          href="/jobs"
          className="mb-3 text-muted-foreground inline-flex text-sm items-center hover:text-primary"
        >
          <ChevronLeft className="size-5" />
          <span>Back to Jobs</span>
        </Link>
        <Tabs
          defaultValue={searchParams.tab === "archive" ? "archive" : "pending"}
        >
          <TabsList>
            <TabsTrigger value="pending">
              <Link href={`/jobs/${params.id}/applications`}>Pending</Link>
            </TabsTrigger>
            <TabsTrigger value="archive">
              <Link
                href={{
                  pathname: `/jobs/${params.id}/applications`,
                  query: { tab: "archive" },
                }}
              >
                Archive
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <PendingApplicationTable jobId={params.id} />
          </TabsContent>
          <TabsContent value="archive">
            <ArchiveApplicationTable jobId={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
