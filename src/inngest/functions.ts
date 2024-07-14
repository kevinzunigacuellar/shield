import { inngest } from "./client";
import { CohereClient } from "cohere-ai";
import { Resend } from "resend";

export const scoreApplicantResume = inngest.createFunction(
  { id: "score-resume" }, // Each function should have a unique ID
  { event: "app/application.sent" }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    const appjobData = await step.run("fetch-application-and-job", async () => {
      const application = await prisma.application.findUnique({
        where: {
          id: event.data.applicationId,
        },
        select: {
          resume: true,
        },
      });

      const job = await prisma.job.findUnique({
        where: {
          id: event.data.jobId,
        },
        select: {
          title: true,
          text: true,
        },
      });

      if (!application || !job) {
        throw new Error("Application or job not found");
      }

      return { application, job };
    });

    const pdfText = await step.run("extract-text-from-pdf", async () => {
      const pdfBuffer = await fetch(appjobData.application.resume).then((res) =>
        res.arrayBuffer(),
      );

      const res = await fetch("https://api.dpdf.io/v1.0/pdf-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${process.env.PDF_API_KEY}`,
        },
        body: pdfBuffer,
      });

      const json = (await res.json()) as { text: string }[];
      return json
        .map((x) => x.text)
        .join("\n\n")
        .replace(/\n/g, " ");
    });

    const reply = await step.run("calculate-score", async () => {
      const cohere = new CohereClient({
        token: process.env.COHERE_API_KEY,
      });
      const response = await cohere.chat({
        message: `Based on the job post provided: ${appjobData.job.text} and the resume provided: ${pdfText}, generate a score from 0 to 100 indicating if the candidate is a fit for the job. Only output the score number`,
      });
      return response.text;
    });

    const score = await step.run("insert-score-to-application", async () => {
      return await prisma.application.update({
        where: {
          id: event.data.applicationId,
        },
        data: {
          score: parseInt(reply),
        },
      });
    });

    return {
      id: score.id,
      score: score.score,
    };
  },
);

export const sendConfirmationEmail = inngest.createFunction(
  { id: "send-confirmation-email" },
  { event: "app/application.sent" },

  async ({ event, step, prisma }) => {
    const applicationData = await step.run("get-application-data", async () => {
      const application = await prisma.application.findUnique({
        where: {
          id: event.data.applicationId,
        },
      });

      if (!application) {
        throw new Error("Application not found");
      }

      return application;
    });

    await step.run("send-email", () => {
      const resend = new Resend(process.env.RESEND_API_KEY);

      return resend.emails.send({
        from: "Shield <onboarding@resend.dev>",
        to: applicationData.email,
        subject: "Application Received",
        text: `Your application has been received. Thank you for applying!`,
      });
    });
  },
);
