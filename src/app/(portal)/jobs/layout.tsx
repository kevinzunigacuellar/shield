import type { Metadata } from "next";
import CreateJob from "@/components/job-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Jobs | Shield",
  description: "Manage your job postings and applications",
};

export default async function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <header className="w-full border-b bg-background">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
          <CreateJob>
            <Button>Create a new job</Button>
          </CreateJob>
        </div>
      </header>
      {children}
    </section>
  );
}
