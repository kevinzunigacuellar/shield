import type { Metadata } from "next";
import HeaderMenu from "@/components/HeaderMenu";

export const metadata: Metadata = {
  title: "Create a new job posting",
  description: "Fill out the form below to create a new job posting",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderMenu />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </>
  );
}
