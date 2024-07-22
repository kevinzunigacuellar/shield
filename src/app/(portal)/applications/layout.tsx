import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | Shield",
  description: "Manage your job applicants",
};

export default async function ApplicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <header className="w-full border-b bg-background">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Applications
          </h1>
        </div>
      </header>
      {children}
    </section>
  );
}
