import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="flex w-full h-full flex-1 flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<LoaderCircle className="size-10 animate-spin" />
		</div>
	);
}
