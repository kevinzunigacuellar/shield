import { z } from "zod";
import { jobSchema } from "@/schema/job";
const ApplicationStatus = z.enum(["PENDING", "REJECTED", "HIRED"]);

const applicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  resume: z.string(),
  score: z.number().optional(),
  status: ApplicationStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
  aiExplanation: z.string().optional(),
  jobId: z.string(),
  job: jobSchema,
});

export const createApplicationSchema = applicationSchema
  .pick({
    name: true,
    email: true,
    resume: true,
    jobId: true,
  })
  .extend({
    resume: z.object({
      size: z.number().max(1_000_000, "File size must be less than 1mb"),
      url: z.string().url(),
    }),
  });

export const rejectApplicationSchema = applicationSchema
  .pick({
    id: true,
  })
  .extend({
    ownerId: z.string(),
  });

export type ApplicationType = z.infer<typeof applicationSchema>;
export type createApplicationType = z.infer<typeof createApplicationSchema>;
export type rejectApplicationType = z.infer<typeof rejectApplicationSchema>;
