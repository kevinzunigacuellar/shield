"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createApplication } from "./actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submit-button";

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(createApplication, null);
  return (
    <Card className="w-full mt-12">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Apply Now</CardTitle>
        <CardDescription>
          Fill out the form below to apply for this job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 w-full" action={formAction}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="John Doe" />
              {
                // @ts-ignore
                state?.errors?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {
                      // @ts-ignore
                      state?.errors.name
                    }
                  </p>
                )
              }
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="john@example.com"
              />
              {
                // @ts-ignore
                state?.errors?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {
                      // @ts-ignore
                      state?.errors.email
                    }
                  </p>
                )
              }
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="resume">Resume</Label>
            <Input id="resume" name="resume" type="file" />
            {
              // @ts-ignore
              state?.errors?.resume && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    // @ts-ignore
                    state?.errors.resume
                  }
                </p>
              )
            }
          </div>
          <Input type="hidden" name="jobId" value={jobId} />
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
