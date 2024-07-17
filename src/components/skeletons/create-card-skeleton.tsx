import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CreateJobSkeleton() {
  return (
    <div className="py-16">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            <Skeleton className="h-8 w-2/6" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-2/6" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
