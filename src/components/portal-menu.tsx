import Link from "next/link";
import { Menu, Shield, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  UserButton,
  ClerkLoading,
  ClerkLoaded,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActiveLink from "./active-link";
const navigation = [
  { id: 1, name: "Jobs", href: "/jobs" },
  { id: 2, name: "Applications", href: "/applications" },
];

export default function HeaderMenu() {
  return (
    <header className="bg-background">
      <div className="flex items-center gap-4 justify-between min-h-16 px-4 sm:px-6">
        <div className="hidden flex-col gap-4 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Shield className="h-6 w-6 fill-black" />
            <span className="sr-only">Shield</span>
          </Link>
          <Slash className="size-4 -rotate-12 text-muted-foreground" />
          <ClerkLoading>
            <span className="h-5 w-24 rounded bg-slate-200 animate-pulse"></span>
          </ClerkLoading>
          <ClerkLoaded>
            <OrganizationSwitcher />
          </ClerkLoaded>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
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
      </div>
      <ul className="border-b pl-4 pr-3 flex">
        {navigation.map((item) => (
          <ActiveLink key={item.id} name={item.name} href={item.href} />
        ))}
      </ul>
    </header>
  );
}
