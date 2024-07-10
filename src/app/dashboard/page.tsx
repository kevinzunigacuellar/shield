import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const applications = await prisma.job.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(applications, null, 2)}</pre>
    </main>
  );
}
