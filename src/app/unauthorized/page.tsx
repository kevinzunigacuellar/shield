import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Lock className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-muted-foreground">
          You do not have permission to view the requested content. Please
          contact the site administrator if you believe this is an error.
        </p>
        <div className="mt-6">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
