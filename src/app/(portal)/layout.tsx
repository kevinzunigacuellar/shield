import type { Metadata } from "next";
import HeaderMenu from "@/components/portal-menu";

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
      <main className="flex-1">{children}</main>
    </>
  );
}
