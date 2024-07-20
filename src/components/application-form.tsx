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
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing/utils";
import { cn } from "@/lib/utils";
import { Paperclip, LoaderCircle } from "lucide-react";

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
      resume: {
        name: "",
        url: "",
        size: 0,
      },
    },
    onSubmit: async ({ value }) => {
      toast.promise(
        createApplication({
          jobId,
          name: value.name,
          email: value.email,
          resume: {
            url: value.resume.url,
            size: value.resume.size,
          },
        }),
        {
          loading: "Submitting application...",
          error: "Failed to submit application",
        }
      );
    },
    validatorAdapter: zodValidator(),
  });

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        await startUpload(acceptedFiles);
      }
    },
    maxFiles: 1,
    maxSize: 1_000_000,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const { startUpload, isUploading } = useUploadThing("upload", {
    onClientUploadComplete: (uploadedFiles) => {
      if (uploadedFiles.length) {
        const [resume] = uploadedFiles;
        form.setFieldValue("resume", {
          name: resume.name,
          url: resume.url,
          size: resume.size,
        });
        form.validateField("resume", "change");
      }
    },
    onUploadError: (error) => {
      // TODO: Handle error
    },
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
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{
            onChange: z.string().trim().email("Must be a valid email"),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field
        name="resume"
        validators={{
          onChange: z.object({
            name: z.string(),
            url: z.string().url("A PDF file is required"),
            size: z.number().max(1_000_000, "File size must be less than 1mb"),
          }),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Resume</Label>
            <div
              {...getRootProps()}
              className={cn([
                "border border-dashed rounded-md p-2 flex items-center justify-center text-sm min-h-24 gap-1 text-muted-foreground shadow-sm hover:text-primary hover:cursor-pointer focus:outline-none focus:text-primary focus:border-primary",
                {
                  "border-primary text-primary bg-muted/30":
                    isDragAccept || isDragActive,
                  "text-primary": acceptedFiles.length > 0,
                  "border-destructive text-destructive bg-destructive/30":
                    isDragReject,
                },
              ])}
            >
              <Input {...getInputProps()} id={field.name} name={field.name} />
              {acceptedFiles.length ? (
                <FileUploadedPreview
                  files={acceptedFiles}
                  isUploading={isUploading}
                />
              ) : (
                <div className="flex flex-col gap-1">
                  <p>
                    <span className="font-semibold">Upload file</span> or drag
                    and drop
                  </p>
                  <span className="text-xs text-center">
                    PDF files only, up to 1mb
                  </span>
                </div>
              )}
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
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

function FileUploadedPreview({
  files,
  isUploading,
}: {
  files: File[];
  isUploading: boolean;
}) {
  const [file] = files;
  return (
    <div className="flex items-center justify-center gap-2">
      {isUploading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Paperclip className="w-4 h-4" />
      )}
      <span>{file.name}</span>
    </div>
  );
}
