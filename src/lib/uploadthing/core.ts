import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
	upload: f({
		pdf: {
			maxFileCount: 1,
			maxFileSize: "1MB",
			minFileCount: 1,
		},
	}).onUploadComplete(async ({ file }) => {
		const { size, url, name } = file;
		return { size, url, name };
	}),
} satisfies FileRouter;

export type FileRouterT = typeof fileRouter;
