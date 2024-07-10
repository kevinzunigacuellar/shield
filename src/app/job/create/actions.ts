"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const jobSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  text: z.string().trim().min(10),
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
      text: validData.data.text,
    },
  });

  revalidatePath(`/dashboard`);
  redirect(`/job/${job.id}`);
}