import { generateReactHelpers } from "@uploadthing/react";

import type { FileRouterT } from "@/lib/uploadthing/core";
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<FileRouterT>();
