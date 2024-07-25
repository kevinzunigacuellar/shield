import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CirclePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpenTable from "@/components/tables/open-job-table";
import ArchiveTable from "@/components/tables/archive-job-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Manage your job postings and applications",
};

export default async function JobsPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <header className="w-full border-b bg-background">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
          <Link
            href="/new"
            className={buttonVariants({
              size: "lg",
            })}
          >
            <CirclePlus className="size-4 mr-2" />
            Add Job
          </Link>
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto mt-10 px-4 sm:px-6">
        <Tabs
          defaultValue={searchParams.tab === "archive" ? "archive" : "open"}
        >
          <TabsList>
            <TabsTrigger value="open">
              <Link href="/jobs">Open</Link>
            </TabsTrigger>
            <TabsTrigger value="archive">
              <Link
                href={{
                  pathname: "/jobs",
                  query: { tab: "archive" },
                }}
              >
                Archive
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <OpenTable />
          </TabsContent>
          <TabsContent value="archive">
            <ArchiveTable />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
