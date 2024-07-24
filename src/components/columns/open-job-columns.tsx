"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/column-header";
import Link from "next/link";
import type { JobWithCount } from "@/schema/job";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<JobWithCount>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link
          href={`/jobs/${job.id}/applications`}
          className="hover:underline hover:underline-offset-4"
        >
          {job.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <span className="hidden md:inline-block">Status</span>;
    },
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Badge variant="outline" className="hidden md:inline-block">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Created at"
          className="hidden md:block"
        />
      );
    },
    cell: ({ row }) => {
      const job = row.original;
      return (
        <span className="hidden md:block">
          {job.createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "_count.applications",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="New applications" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
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
            <DropdownMenuItem asChild>
              <Link href={`/jobs/${job.id}/settings`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/post/${job.id}`}>View job post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/jobs/${job.id}/applications`}>
                View applications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
