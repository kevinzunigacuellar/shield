import { z } from "zod";
import { jobSchema } from "@/types/job";
const ApplicationStatus = z.enum(["PENDING", "REJECTED", "HIRED"]);

const applicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  resume: z.string(),
  score: z.number().optional(),
  status: ApplicationStatus,
  xata_id: z.string(),
  xata_version: z.number(),
  xata_createdat: z.date(),
  xata_updatedat: z.date(),
  jobId: z.string(),
  job: jobSchema.optional(),
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

const rejectApplicationSchema = applicationSchema.pick({
  id: true,
  jobId: true,
});

export type createApplicationType = z.infer<typeof createApplicationSchema>;
export type rejectApplicationType = z.infer<typeof rejectApplicationSchema>;
