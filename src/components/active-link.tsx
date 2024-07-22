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
      href={href}
      className={cn([
        "relative text-muted-foreground text-sm pt-2 pb-3 px-2 hover:text-foreground -mb-[1px]",
        {
          "text-primary": pathname === href,
        },
      ])}
    >
      <span className="p-2">{name}</span>
      {pathname === href && (
        <span className="absolute bottom-0 left-0 border-t-[1.5px] border-black w-full"></span>
      )}
    </Link>
  );
}
