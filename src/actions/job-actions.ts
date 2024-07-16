"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const jobSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(3),
  text: z.string().trim().min(3),
  id: z.string().optional(),
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

  await prisma.job.create({
    data: {
      title: validData.data.title,
      description: validData.data.description,
      userId,
      text: validData.data.text,
    },
  });

  revalidatePath(`/jobs`);
  redirect(`/jobs`);
}

export async function updateJob(data: unknown) {
  const parsed = jobSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { id, title, description, text } = parsed.data;

  if (!id) {
    return;
  }

  await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      text: text,
    },
  });

  revalidatePath(`/jobs`);
  redirect(`/jobs`);
}

export async function deleteJob({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect(`/unauthorized`);
  }

  if (userId !== ownerId) {
    throw new Error("You don't have permission to delete this job.");
  }

  try {
    await prisma.job.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error("Something went wrong, please try again later.");
  }
  revalidatePath(`/jobs`);
}
