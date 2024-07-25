"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, LoaderCircle } from "lucide-react";
import { DataTableColumnHeader } from "@/components/column-header";
import Link from "next/link";
import type { ApplicationType } from "@/schema/application";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const columns: ColumnDef<ApplicationType>[] = [
  {
    header: "Applicant",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div>
          <p className="font-semibold">{application.name}</p>
          <p className="text-sm text-muted-foreground">{application.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link
          href={job.resume}
          prefetch={false}
          target="_blank"
          className="underline-offset-4 hover:underline flex items-center gap-1"
        >
          <span>Open resume</span> <ExternalLink className="h-3 w-3" />
        </Link>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Score" />;
    },
    cell: ({ row }) => {
      const application = row.original;
      const getRingColor = (score = 10) => {
        if (score >= 90) {
          return "hsl(var(--chart-2))";
        } else if (score >= 70) {
          return "hsl(var(--chart-4))";
        } else if (score >= 50) {
          return "hsl(var(--chart-5))";
        } else {
          return "hsl(var(--chart-1))";
        }
      };

      const score = application.score;
      if (!score) return <LoaderCircle className="size-4 animate-spin" />;

      const chartData = [
        { score: application.score, fill: "var(--color-score)" },
      ];

      const chartConfig = {
        score: {
          label: "Score",
          color: getRingColor(application.score),
        },
      } satisfies ChartConfig;

      return (
        <Sheet>
          <SheetTrigger asChild>
            <ChartContainer
              config={chartConfig}
              className="aspect-square max-h-10"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={score * 3.6}
                innerRadius={15}
                outerRadius={25}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[17, 13]}
                />
                <RadialBar dataKey="score" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xs font-semibold"
                            >
                              {score.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            ></tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Score breakdown</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-square max-h-64"
                  >
                    <RadialBarChart
                      data={chartData}
                      startAngle={0}
                      endAngle={score * 3.6}
                      innerRadius={80}
                      outerRadius={110}
                    >
                      <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="first:fill-muted last:fill-background"
                        polarRadius={[86, 74]}
                      />
                      <RadialBar dataKey="score" background cornerRadius={10} />
                      <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-4xl font-semibold"
                                  >
                                    {score.toLocaleString()}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Score
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </PolarRadiusAxis>
                    </RadialBarChart>
                  </ChartContainer>
                </div>
              </SheetDescription>
            </SheetHeader>
            <p className="text-sm py-2 leading-relaxed">
              {application.aiExplanation}
            </p>
          </SheetContent>
        </Sheet>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rejected at" />;
    },
    cell: ({ row }) => {
      const job = row.original;
      return (
        <span>
          {job.createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </span>
      );
    },
  },
];
