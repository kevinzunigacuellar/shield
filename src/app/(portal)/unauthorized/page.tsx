import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
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
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
