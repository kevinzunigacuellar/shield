import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [{ name: "Dashboard", href: "/dashboard" }];

export default function HeaderMenu() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 justify-between border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Shield className="h-6 w-6 fill-black" />

          <span className="sr-only">Shield</span>
        </Link>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-muted-foreground hover:text-foreground"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Shield className="h-6 w-6 fill-primary stroke-none" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <ClerkLoading>
        <span className="h-7 w-7 rounded-full bg-slate-200 animate-pulse"></span>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
    </header>
  );
}
