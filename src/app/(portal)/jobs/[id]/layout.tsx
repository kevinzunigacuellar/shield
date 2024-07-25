import ActiveLink from "@/components/active-link";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { buttonVariants } from "@/components/ui/button";

export default async function JobIdLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const navigation = [
    { id: 1, name: "Applications", href: `/jobs/${params.id}/applications` },
    { id: 2, name: "Settings", href: `/jobs/${params.id}/settings` },
  ];

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

  const { userId, orgId } = auth();

  const currentUserId = orgId ?? userId;

  if (currentUserId !== application.ownerId) {
    redirect("/unauthorized");
  }
  return (
    <>
      <header className="w-full bg-background border-b">
        <div className="flex justify-between items-center gap-3 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
          <div>
            <Link
              href="/jobs"
              className="flex w-fit items-center text-sm gap-1 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Jobs</span>
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">
              {application.title}
            </h1>
          </div>
          <Link
            href={`/post/${params.id}`}
            className={buttonVariants({ size: "lg" })}
          >
            View Job Post
          </Link>
        </div>
        <nav className="px-4 flex max-w-7xl w-full mx-auto">
          {navigation.map((item) => (
            <ActiveLink key={item.id} name={item.name} href={item.href} />
          ))}
        </nav>
      </header>
      <div className="max-w-7xl w-full mx-auto my-10 px-4 sm:px-6">
        {children}
      </div>
    </>
  );
}
