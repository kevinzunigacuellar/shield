import { google } from "@ai-sdk/google";
import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { generateObject } from "ai";
import { NonRetriableError } from "inngest";
import { Resend } from "resend";
import { z } from "zod";
import { inngest } from "./client";

export const scoreApplicantResume = inngest.createFunction(
	{ id: "score-resume" },
	{ event: "app/application.sent" },

	async ({ event, step, prisma }) => {
		const appjobData = await step.run("get-application-data", async () => {
			const data = await prisma.application.findUnique({
				where: {
					id: event.data.applicationId,
				},
				select: {
					resume: true,
					job: {
						select: {
							title: true,
							body: true,
						},
					},
				},
			});

			if (!data) {
				throw new Error("Application or job not found");
			}

			return data;
		});

		const pdfText = await step.run("extract-text-from-pdf", async () => {
			const res = await fetch(
				`https://ocr-rho.vercel.app/ocr?url=${appjobData.resume}`,
			);
			const { text }: { text: string } = await res.json();
			return text;
		});

		const evaluation = await step.run("evaluate-candidate", async () => {
			const jobPostText = generateText(JSON.parse(appjobData.job.body), [
				StarterKit,
			]);

			const { object } = await generateObject({
				model: google("models/gemini-1.5-pro-latest"),
				schema: z.object({
					evaluation: z.object({
						explanation: z.string(),
						score: z.number().min(0).max(100),
					}),
				}),
				prompt: `Based on the job post provided: Job Title: ${appjobData.job.title} Job Description: ${jobPostText} and the resume provided: ${pdfText} Evaluate the candidate's resume against the job post and generate a score from 0 to 100 indicating the candidate's fit for the job. Additionally, provide a concise explanation for the score, highlighting the key factors that influenced the evaluation.`,
			});

			return object.evaluation;
		});

		const score = await step.run("update-application", async () => {
			return await prisma.application.update({
				where: {
					id: event.data.applicationId,
				},
				data: {
					score: evaluation.score,
					aiExplanation: evaluation.explanation,
				},
			});
		});

		return {
			id: score.id,
			score: score.score,
			explanation: score.aiExplanation,
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
				include: {
					job: {
						select: {
							title: true,
						},
					},
				},
			});

			if (!application) {
				throw new NonRetriableError("Application not found");
			}

			return application;
		});

		await step.run("send-email", () => {
			const resend = new Resend(process.env.RESEND_API_KEY);

			return resend.emails.send({
				from: "Shield <noreply@shield.kevinzunigacuellar.com>",
				to: applicationData.email,
				subject: "Application Received",
				html: `<h3>Hi ${applicationData.name},</h3><p>Thank you for submitting your application for ${applicationData.job.title}. We will review your application and get back to you as soon as possible.</p><p>Best regards,</p><p>Shield Team</p>`,
			});
		});
	},
);
