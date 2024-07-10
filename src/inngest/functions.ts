import { inngest } from "./client";
// import pdf from "pdf-parse"
// import OpenAI from "openai";

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Functions exported from this file are exposed to Inngest
// See: @/app/api/inngest/route.ts

export const scoreApplicantResume = inngest.createFunction(
  { id: "score-resume" }, // Each function should have a unique ID
  { event: "app/application.sent" }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    // Fetch data from the database
    const application = await prisma.application.findUnique({
      where: {
        id: event.data.applicationId,
      },
      select: {
        resume: true,
      }
    });

    const job = await prisma.job.findUnique({
      where: {
        id: event.data.jobId,
      },
      select: {
        title: true,
        text: true,
      }
    });

    if (!application || !job) {
      return;
    }

    console.log(application)
    console.log(job)

    const reply = await step.run("calculate-score", async () => {
      // TODO: Implement a function to calculate the score
      return 70;
    });

    await step.run("add-score-to-application", async () => {
      
      return await prisma.application.update({
        where: {
          id: event.data.applicationId,
        },
        data: {
          score: reply,
        }
      })
    });

    return { event, body: "Score calculated and added to the application" };
  }
);