"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const jobSchema = z.object({
  title: z.string().trim().min(3),
  body: z.string().trim().min(3),
});

const jobUpdateSchema = jobSchema.extend({
  id: z.string(),
  ownerId: z.string(),
});

type Job = z.infer<typeof jobSchema>;
type JobUpdate = z.infer<typeof jobUpdateSchema>;

export async function createJob(data: Job) {
  const parsed = jobSchema.safeParse(data);

  // validate data
  if (!parsed.success) {
    throw new Error("Could not create job.");
  }

  const { userId, orgId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { title, body } = parsed.data;

  await prisma.job.create({
    data: {
      title,
      body,
      ownerId: orgId ?? userId,
    },
  });

  revalidatePath(`/jobs`);
}

export async function updateJob(data: JobUpdate) {
  const parsed = jobUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Could not update job.");
  }

  const { userId, orgId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { id, title, body, ownerId } = parsed.data;

  const currentUserId = orgId ?? userId;

  if (currentUserId !== ownerId) {
    throw new Error("You are not the owner of this job.");
  }

  await prisma.job.update({
    where: {
      id: id,
      ownerId: orgId ?? userId,
    },
    data: {
      title,
      body,
    },
  });

  revalidatePath(`/jobs`);
}

export async function deleteJob({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}) {
  const { userId, orgId } = auth();
  if (!userId) {
    redirect(`/unauthorized`);
  }

  const currentUserId = orgId ?? userId;

  if (currentUserId !== ownerId) {
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
