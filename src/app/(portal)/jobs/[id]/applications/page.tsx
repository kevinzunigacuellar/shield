import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import PendingApplicationTable from "@/components/tables/pending-application-table";
import ArchiveApplicationTable from "@/components/tables/archive-application-table";

export const metadata: Metadata = {
  title: "Job Applications",
  description: "Manage your job postings and applications",
};

export default async function JobsApplicationPage({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Tabs defaultValue={searchParams.tab === "archive" ? "archive" : "pending"}>
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
  );
}
