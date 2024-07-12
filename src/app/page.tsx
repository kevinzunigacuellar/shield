import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shield",
  description:
    "Job board powered by AI to help you find the best candidates for your company",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex items-center justify-between px-4 py-3 lg:px-6 border-b bg-background">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Shield className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline">Login</Button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Shield
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Job board powered by AI to help you find the best candidates for
            your company.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
