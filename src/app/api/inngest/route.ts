import { serve } from "inngest/next";
import { inngest, functions } from "@/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
