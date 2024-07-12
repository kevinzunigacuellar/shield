"use server";

import { utapi } from "@/lib/uploadthing";
import prisma from "@/lib/prisma";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { inngest } from "@/inngest";
import { redirect } from "next/navigation";

const applicationFormSchema = zfd.formData({
  name: zfd.text(),
  email: z.string().email(),
  resume: zfd.file(z.instanceof(File, { message: "Must submit a pdf file" })),
  jobId: zfd.text(),
});

export async function createApplication(_: any, formData: FormData) {
  const parsed = applicationFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, resume, jobId } = parsed.data;
  const [fileUpload] = await utapi.uploadFiles([resume]);
  const { data, error: fileUploadError } = fileUpload;

  if (fileUploadError || !data) {
    return {
      errors: {
        resume: "Failed to upload resume, try again later",
      },
    };
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
      jobId,
      applicationId: newApplication.id,
    },
  });

  redirect("/success");
}
