"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const jobSchema = z.object({
  title: z.string().min(3).trim(),
  description: z.string().min(10).trim(),
});

export async function createJob(data: unknown) {
  const validData = jobSchema.safeParse(data);

  // validate data
  if (!validData.success) {
    return {
      errors: validData.error.flatten().fieldErrors,
    };
  }

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const job = await prisma.job.create({
    data: {
      title: validData.data.title,
      description: validData.data.description,
      userId,
    },
  });

  redirect(`/job/${job.id}`);
}
