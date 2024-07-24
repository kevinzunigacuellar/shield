"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/column-header";
import { toast } from "sonner";
import Link from "next/link";
import { rejectApplication } from "@/actions/application";
import type { ApplicationType } from "@/schema/application";

export const columns: ColumnDef<ApplicationType>[] = [
  {
    header: "Applicant",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div>
          <p className="font-semibold">{application.name}</p>
          <p className="text-sm text-muted-foreground">{application.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link
          href={job.resume}
          prefetch={false}
          target="_blank"
          className="underline-offset-4 hover:underline flex items-center gap-1"
        >
          <span>Open resume</span> <ExternalLink className="h-3 w-3" />
        </Link>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Score" />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rejected at" />;
    },
    cell: ({ row }) => {
      const job = row.original;
      return (
        <span>
          {job.createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </span>
      );
    },
  },
];
