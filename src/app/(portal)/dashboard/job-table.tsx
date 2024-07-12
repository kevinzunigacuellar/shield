"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Component() {
  const jobs = [
    {
      id: "some-unique-id",
      name: "Frontend Development",
      date: "2021-09-01",
    },
  ];

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Jobs</h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="default">Add a job</Button>
          </div>
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{order.name}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
