import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JobsIdApplicationLoadingPage() {
  return (
    <>
      <header className="w-full border-b bg-background">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <Skeleton className="h-9 w-36" />
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto mt-10 px-4 sm:px-6">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-6 w-36 mb-2" />
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-24" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-5 w-64" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="pointer-events-none">
                      <TableHead className="w-[100px] h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-full" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-full" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-full" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                    <TableRow className="pointer-events-none">
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="h-12">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
