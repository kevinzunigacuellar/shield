"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createJobSchema,
  type createJobType,
  type deleteJobType,
  updateJobSchema,
  updateJobType,
  deleteJobSchema,
} from "@/schema/job";

export async function createJob(data: createJobType) {
  const parsed = createJobSchema.safeParse(data);

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

export async function updateJob(data: updateJobType) {
  const parsed = updateJobSchema.safeParse(data);
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
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/jobs`);
}

export async function closeJob({
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
    await prisma.job.update({
      where: {
        id,
        ownerId: currentUserId,
      },
      data: {
        status: "CLOSED",
        updatedAt: new Date(),
      },
    });
  } catch (e) {
    throw new Error("Something went wrong, please try again later.");
  }
  revalidatePath(`/jobs`);
}

export async function deleteJob(data: deleteJobType) {
  const parsed = deleteJobSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Could not delete job.");
  }

  const { userId, orgId } = auth();
  if (!userId) {
    redirect(`/unauthorized`);
  }

  const currentUserId = orgId ?? userId;
  const { ownerId, id } = parsed.data;

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
