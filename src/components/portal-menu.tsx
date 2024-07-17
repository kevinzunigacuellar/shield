import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActiveLink from "@/components/active-link";

const navigation = [
  { id: 1, name: "Jobs", href: "/jobs" },
  { id: 2, name: "Applications", href: "/applications" },
];

export default function HeaderMenu() {
  return (
    <header className="flex min-h-16 items-center gap-4 justify-between border-b bg-background px-4 py md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Shield className="h-6 w-6 fill-black" />
          <span className="sr-only">Shield</span>
        </Link>
        {navigation.map((item) => (
          <ActiveLink key={item.id} href={item.href} name={item.name} />
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
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation links
          </SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Shield className="h-6 w-6 fill-primary stroke-none" />
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
