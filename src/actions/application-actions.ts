"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteApplication(applicationId: string, jobId: string) {
  const { userId } = auth();
  if (!userId) {
    redirect(`/unauthorized`);
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    select: {
      userId: true,
    },
  });

  if (!job) {
    throw new Error("Something went wrong, please try again later.");
  }

  if (userId !== job.userId) {
    throw new Error("You don't have permission to delete this application.");
  }

  try {
    await prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  } catch (e) {
    throw new Error("Something went wrong, please try again later.");
  }
  revalidatePath("/jobs/[jobId]/applications/page");
}
