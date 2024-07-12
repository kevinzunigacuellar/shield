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

  const job = await prisma.job.create({
    data: {
      title: validData.data.title,
      description: validData.data.description,
      userId,
      text: validData.data.text,
    },
  });

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

export async function updateJob(data: unknown) {
  const parsed = jobSchema.safeParse(data);
  console.log(parsed);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { userId } = auth();

  if (!userId) {
    return;
  }

  const { id, title, description, text } = parsed.data;

  if (!id) {
    return;
  }

  const job = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      text: text,
    },
  });

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}