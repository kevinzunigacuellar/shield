import Link from "next/link";
import { Shield } from "lucide-react";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Shield",
  description:
    "Job board powered by AI to help you find the best candidates for your company",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-4 py-3 lg:px-6 border-b bg-background h-16">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Shield className="h-6 w-6 fill-black" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Link
                className={buttonVariants({ variant: "outline", size: "sm" })}
                href="/sign-in"
              >
                Sign In
              </Link>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href="/jobs"
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Shield
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Discover top talent effortlessly with our AI-driven job platform.
          </p>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: "default", size: "lg" })}
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
