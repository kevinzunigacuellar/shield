"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import type { FieldApi } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createApplication } from "@/actions/application-actions";
import { toast } from "sonner";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="-mt-1 text-destructive text-sm">
          {field.state.meta.errors.join(",")}
        </span>
      ) : null}
    </>
  );
}

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      resume: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("jobId", jobId);
      if (value.resume) {
        formData.append("resume", value.resume);
      }
      toast.promise(createApplication(formData), {
        loading: "Submitting application...",
        error: "Failed to submit application",
      });
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <form.Field
            name="name"
            validators={{
              onChange: z
                .string()
                .trim()
                .min(3, "Name must be at least 3 characters"),
            }}
          >
            {(field) => (
              <>
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
        <div className="flex flex-col gap-2">
          <form.Field
            name="email"
            validators={{
              onChange: z.string().trim().email("Must be a valid email"),
            }}
          >
            {(field) => (
              <>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <form.Field
          name="resume"
          validators={{
            onChange: z.instanceof(File, {
              message: "Must submit a pdf file",
            }),
          }}
        >
          {(field) => (
            <>
              <Label htmlFor={field.name}>Resume</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                type="file"
                accept=".pdf"
                multiple={false}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.handleChange(file);
                  }
                }}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
