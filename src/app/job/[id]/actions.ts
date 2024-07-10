"use server";

import { utapi } from "@/lib/uploadthing";
import { prisma } from "@/lib/prisma";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { inngest } from "@/inngest";
import { redirect } from "next/navigation";

const ApplicationFormSchema = zfd.formData({
  name: zfd.text(),
  email: z.string().email(),
  resume: zfd.file(),
});

export async function createApplication(jobId: string, formData: FormData) {
  const parsed = ApplicationFormSchema.safeParse(formData);

  if (!parsed.success) {
    return parsed.error.flatten().fieldErrors;
  }

  const { name, email, resume } = parsed.data;
  const [fileUpload] = await utapi.uploadFiles([resume]);

  const { data, error: fileUploadError } = fileUpload;

  if (fileUploadError || !data) {
    return {
      errors: {
        resume: "Failed to upload resume",
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
  });

  await inngest.send({
    name: "app/application.sent",
    data: {
      jobId,
      applicationId: newApplication.id,
    },
  });

  console.log("Sent event");
  redirect("/");
}
