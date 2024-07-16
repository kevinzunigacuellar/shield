"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ActiveLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      key={name}
      href={href}
      className={cn(
        "hover:text-foreground",
        pathname === href ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {name}
    </Link>
  );
}
