import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Submitted",
  description:
    "Your application has been submitted successfully. Thanks for applying!",
};
export default function SuccessPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Application Submitted
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your application has been submitted successfully. Thanks for applying!
        </p>
      </div>
    </div>
  );
}
