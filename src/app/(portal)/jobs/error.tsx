"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex w-full h-full flex-1 flex-col items-center justify-center bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<CircleAlert className="mx-auto h-12 w-12 text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Something went wrong
				</h1>
				<p className="mt-4 text-muted-foreground">
					An error occurred while trying to load this page.
				</p>
				<div className="mt-6">
					<Button onClick={() => reset()}>Try again</Button>
				</div>
			</div>
		</div>
	);
}
