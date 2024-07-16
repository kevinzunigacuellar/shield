import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function TableSkeleton() {
  return (
    <Card>
      <CardHeader className="px-8">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <div className="rounded-lg w-full">
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
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
