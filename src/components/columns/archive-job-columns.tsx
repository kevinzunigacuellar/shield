"use client";

import { deleteJob } from "@/actions/job";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { JobType } from "@/schema/job";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<JobType>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const { status } = row.original;
			return <Badge variant="outline">{status}</Badge>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: "Closed at",
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			return (
				<span>
					{updatedAt.toLocaleString("en-US", {
						dateStyle: "medium",
					})}
				</span>
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
							<DropdownMenuItem asChild>
								<Link href={`/jobs/${job.id}/settings`}>Edit</Link>
							</DropdownMenuItem>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem>Delete</DropdownMenuItem>
							</AlertDialogTrigger>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/post/${job.id}`}>View job post</Link>
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
											success: "Job deleted successfully",
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
