"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { inngest } from "@/inngest";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const applicationFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  resume: z.object({
    size: z.number().max(1_000_000, "File size must be less than 1mb"),
    url: z.string().url(),
  }),
  jobId: z.string(),
});
type ApplicationData = z.infer<typeof applicationFormSchema>;

export async function createApplication(data: ApplicationData) {
  const parsed = applicationFormSchema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.errors.map((e) => e.message).join(", ");
    throw new Error(errors);
  }

  const { name, email, resume, jobId } = parsed.data;

  const newApplication = await prisma.application.create({
    data: {
      jobId,
      name,
      email,
      resume: resume.url,
    },
    select: {
      id: true,
    },
  });

  try {
    await inngest.send({
      name: "app/application.sent",
      data: {
        applicationId: newApplication.id,
      },
    });
  } catch (e) {
    console.error(e);
  }
  redirect("/success");
}

export async function rejectApplication(applicationId: string, jobId: string) {
  const { userId, orgId } = auth();
  if (!userId) {
    redirect(`/unauthorized`);
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
      ownerId: orgId ?? userId,
    },
    select: {
      ownerId: true,
    },
  });

  if (!job) {
    throw new Error("Something went wrong, please try again later.");
  }

  try {
    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: "REJECTED",
      },
    });
  } catch (e) {
    throw new Error("Something went wrong, please try again later.");
  }
  revalidatePath("/applications");
}
