import { z } from "zod";

const JobStatus = z.enum(["OPEN", "CLOSED"]);

const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  ownerId: z.string(),
  status: JobStatus,
  xata_id: z.string(),
  xata_version: z.number(),
  xata_createdat: z.date(),
  xata_updatedat: z.date(),
});

const jobWithCountSchema = jobSchema.extend({
  _count: z.object({
    applications: z.number(),
  }),
});

export const createJobSchema = jobSchema.omit({
  id: true,
  xata_id: true,
  xata_version: true,
  xata_createdat: true,
  xata_updatedat: true,
  status: true,
  ownerId: true,
});

export const updateJobSchema = jobSchema.omit({
  xata_id: true,
  xata_version: true,
  xata_createdat: true,
  xata_updatedat: true,
});

export type JobType = z.infer<typeof jobSchema>;
export type createJobType = z.infer<typeof createJobSchema>;
export type updateJobType = z.infer<typeof updateJobSchema>;
export type JobWithCount = z.infer<typeof jobWithCountSchema>;
