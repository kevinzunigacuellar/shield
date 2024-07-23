"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UpdateJobForm from "@/components/job-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DataTableColumnHeader } from "@/components/column-header";
import { toast } from "sonner";
import { deleteJob } from "@/actions/job-actions";
import Link from "next/link";
import type { JobWithCount } from "@/types/job";

export const columns: ColumnDef<JobWithCount>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "xata_createdat",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created at" />;
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
    accessorKey: "_count.applications",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="No. of applications" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <UpdateJobForm job={job}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              </UpdateJobForm>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/post/${job.id}`}>View application page</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete job</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to permanently delete this job? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: "destructive" })}
                onClick={async () => {
                  toast.promise(
                    deleteJob({
                      id: job.id,
                      ownerId: job.ownerId,
                    }),
                    {
                      loading: "Deleting job...",
                      success: () => `${job.title} job has been deleted.`,
                      error: "Failed to delete job",
                    },
                  );
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
