"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { FieldInfo } from "@/components/field-info";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Heading2Icon,
  Heading3Icon,
  Bold,
  Italic,
  ListOrdered,
  List,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolbarButton } from "@/components/toolbar-button";
import { createJob, updateJob } from "@/actions/job-actions";
import { JobType } from "@/types/job";

export default function JobForm({
  job,
  children,
}: {
  job?: JobType;
  children: React.ReactNode;
}) {
  const form = useForm({
    defaultValues: {
      title: job?.title ?? "",
      body: job?.body ?? "",
    },
    onSubmit: async ({ value }) => {
      if (job) {
        toast.promise(
          updateJob({
            ...value,
            id: job.id,
            ownerId: job.ownerId,
            status: job.status,
          }),
          {
            loading: "Updating job...",
            error: (e) => `Error: ${e.message}`,
            success: "Job updated successfully",
          },
        );
      } else {
        toast.promise(createJob(value), {
          loading: "Creating job...",
          error: (e) => `Error: ${e.message}`,
          success: "Job created successfully",
        });
      }
    },
    validatorAdapter: zodValidator(),
  });

  const editor = useEditor({
    content: job?.body ? JSON.parse(job.body) : null,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "w-full focus:outline-none bg-background max-w-none px-3 py-2 placeholder:text-primary disabled:cursor-not-allowed disabled:opacity-50 prose prose-h2:font-semibold prose-h2:text-xl prose-h3:font-semibold prose-h3:text-lg prose-sm mx-0",
        id: "body",
      },
      handleDOMEvents: {
        input: (editor) => {
          form.setFieldValue("body", JSON.stringify(editor.state.toJSON().doc));
          form.validateField("body", "change");
        },
        blur: (editor) => {
          form.validateField("body", "change");
        },
      },
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>New Job</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to create a new job posting
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="title"
            validators={{
              onChange: z.string().trim().min(3, "Title is required"),
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Frontend Engineer"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field
            name="body"
            validators={{
              onChange: z.string().trim().min(90, "Must have a description"),
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={field.name}
                  onClick={() => {
                    editor?.commands.focus();
                  }}
                >
                  Description
                </Label>
                <div className="min-h-[80px] w-full flex flex-col border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                  <div className="flex items-center gap-2 bg-background p-1 border-b border-muted">
                    <ToolbarButton
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run()
                      }
                      disabled={false}
                      isActive={editor?.isActive("heading", { level: 2 })}
                      tooltip="Heading 2"
                      aria-label="Heading 2"
                    >
                      <Heading2Icon className="size-5" />
                    </ToolbarButton>
                    <ToolbarButton
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 3 })
                          .run()
                      }
                      disabled={false}
                      isActive={editor?.isActive("heading", { level: 3 })}
                      tooltip="Heading 3"
                      aria-label="Heading 3"
                    >
                      <Heading3Icon className="size-5" />
                    </ToolbarButton>
                    <Separator orientation="vertical" className="h-6" />
                    <ToolbarButton
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      disabled={false}
                      isActive={editor?.isActive("bold")}
                      tooltip="Bold"
                      aria-label="Bold"
                    >
                      <Bold className="size-5" />
                    </ToolbarButton>
                    <ToolbarButton
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      disabled={false}
                      isActive={editor?.isActive("italic")}
                      tooltip="Italic"
                      aria-label="Italic"
                    >
                      <Italic className="size-5" />
                    </ToolbarButton>
                    <Separator orientation="vertical" className="mx-2 h-7" />
                    <ToolbarButton
                      onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                      }
                      disabled={false}
                      isActive={editor?.isActive("orderedList")}
                      tooltip="Ordered List"
                      aria-label="Ordered List"
                    >
                      <ListOrdered className="size-5" />
                    </ToolbarButton>
                    <ToolbarButton
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      disabled={false}
                      isActive={editor?.isActive("bulletList")}
                      tooltip="Bullet List"
                      aria-label="Bullet List"
                    >
                      <List className="size-5" />
                    </ToolbarButton>
                  </div>
                  <EditorContent editor={editor} className="w-full" />
                </div>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                form.reset();
                editor?.commands.clearContent();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <AlertDialogAction type="submit" disabled={!canSubmit}>
                  {job ? "Update" : "Create"}
                </AlertDialogAction>
              )}
            </form.Subscribe>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
