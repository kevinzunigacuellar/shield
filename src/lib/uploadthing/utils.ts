import type { FileRouterT } from "@/lib/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
	generateReactHelpers<FileRouterT>();
