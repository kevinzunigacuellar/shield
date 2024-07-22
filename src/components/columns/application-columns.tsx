"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
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
import { rejectApplication } from "@/actions/application-actions";

type Applications = {
  id: string;
  name: string;
  resume: string;
  email: string;
  score: number | null;
  xata_createdat: Date;
  job: {
    id: string;
    title: string;
    ownerId: string;
  };
};

export const columns: ColumnDef<Applications>[] = [
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
    accessorKey: "job.title",
    header: "Applied for",
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
          <span>Open in new tab</span> <ExternalLink className="h-3 w-3" />
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
    accessorKey: "xata_createdat",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Received at" />;
    },
    cell: ({ row }) => {
      const job = row.original;
      return (
        <span>
          {job.xata_createdat.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={async () => {
                toast.promise(
                  rejectApplication(application.id, application.job.id),
                  {
                    loading: "Loading...",
                    success: "The application was removed",
                    error: "Something went wrong",
                  },
                );
              }}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
