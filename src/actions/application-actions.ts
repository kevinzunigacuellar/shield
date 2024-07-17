"use server";

import { utapi } from "@/lib/uploadthing";
import prisma from "@/lib/prisma";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { inngest } from "@/inngest";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const applicationFormSchema = zfd.formData({
  name: zfd.text(),
  email: z.string().email(),
  resume: zfd.file(z.instanceof(File, { message: "Must submit a pdf file" })),
  jobId: zfd.text(),
});

export async function createApplication(formData: unknown) {
  const parsed = applicationFormSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const { name, email, resume, jobId } = parsed.data;

  // limit file size to 500kb
  if (resume.size > 1024 * 500) {
    throw new Error("File size must be less than 500kb");
  }

  const [fileUpload] = await utapi.uploadFiles([resume]);
  const { data, error: fileUploadError } = fileUpload;

  if (fileUploadError || !data) {
    throw new Error("Failed to upload resume");
  }

  const newApplication = await prisma.application.create({
    data: {
      jobId,
      name,
      email,
      resume: data.url,
    },
    select: {
      id: true,
    },
  });

  await inngest.send({
    name: "app/application.sent",
    data: {
      applicationId: newApplication.id,
    },
  });

  redirect("/success");
}

export async function rejectApplication(applicationId: string, jobId: string) {
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
  revalidatePath("/jobs/[jobId]/applications");
}
