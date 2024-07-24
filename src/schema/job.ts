import { z } from "zod";

const JobStatus = z.enum(["OPEN", "CLOSED"]);

export const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  ownerId: z.string(),
  status: JobStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
});

const jobWithCountSchema = jobSchema.extend({
  _count: z.object({
    applications: z.number(),
  }),
});

export const createJobSchema = jobSchema.pick({
  title: true,
  body: true,
});

export const deleteJobSchema = jobSchema.pick({
  id: true,
  ownerId: true,
});

export const updateJobSchema = jobSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type JobType = z.infer<typeof jobSchema>;
export type createJobType = z.infer<typeof createJobSchema>;
export type updateJobType = z.infer<typeof updateJobSchema>;
export type deleteJobType = z.infer<typeof deleteJobSchema>;
export type JobWithCount = z.infer<typeof jobWithCountSchema>;
