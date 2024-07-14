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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTableColumnHeader } from "@/components/column-header";
import { useToast } from "@/components/ui/use-toast";
import { deleteJob } from "../jobs/actions";
import Link from "next/link";
import { tc } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  xata_createdat: Date;
  userId: string;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link
          href={`/jobs/${job.id}/applications`}
          className="underline-offset-4 hover:underline"
        >
          {job.title}
        </Link>
      );
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
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      const job = row.original;
      return (
        <Dialog>
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
                <Link href={`/jobs/edit/${job.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/post/${job.id}`}>Live preview</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete job</DialogTitle>
              <DialogDescription>
                Are you sure you want to permanently delete this job? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const { error } = await tc(deleteJob(job.id, job.userId));
                    if (error) {
                      toast({
                        title: "Something went wrong",
                        description: error.message,
                        variant: "destructive",
                      });
                    } else {
                      toast({
                        title: "Job deleted",
                        description: "The job has been successfully deleted.",
                      });
                    }
                  }}
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
