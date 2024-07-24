"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";
import { FieldInfo } from "@/components/field-info";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolbarButton } from "@/components/toolbar-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heading2Icon,
  Heading3Icon,
  Bold,
  Italic,
  ListOrdered,
  List,
} from "lucide-react";
import { updateJob } from "@/actions/job";

export function JobForm({
  title,
  body,
  status,
  id,
  ownerId,
}: {
  title: string;
  body: string;
  status: "OPEN" | "CLOSED";
  id: string;
  ownerId: string;
}) {
  const form = useForm({
    defaultValues: {
      title: title,
      body: body,
      status: status,
    },
    onSubmit: async ({ value }) => {
      toast.promise(
        updateJob({
          id,
          title: value.title,
          body: value.body,
          status: value.status,
          ownerId,
        }),
        {
          loading: "Updating job...",
          error: (e) => `Error: ${e.message}`,
          success: "Job updated successfully",
        },
      );
    },
    validatorAdapter: zodValidator(),
  });

  const editor = useEditor({
    content: JSON.parse(body),
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
          "w-full focus:outline-none bg-background max-w-none px-3 py-2 placeholder:text-primary disabled:cursor-not-allowed disabled:opacity-50 prose prose-h2:font-semibold prose-h2:text-xl prose-h3:font-semibold prose-h3:text-lg prose-sm mx-0 min-h-40 h-full",
        id: "body",
      },
      handleDOMEvents: {
        input: (editor) => {
          form.setFieldValue("body", JSON.stringify(editor.state.toJSON().doc));
          form.validateField("body", "change");
        },
        blur: () => {
          form.validateField("body", "change");
        },
      },
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
      <form.Field
        name="title"
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
              placeholder="Frontend Engineer"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              A descriptive title for the job. This will be displayed to
              applicants.
            </p>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field
        name="body"
        validators={{
          onChange: z
            .string()
            .trim()
            .min(90, "Description must be at least 5 characters"),
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
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
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
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
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
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
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
              <EditorContent
                editor={editor}
                className="w-full h-full min-h-40"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              A detailed description of the job. This will be displayed to
              applicants. You can use markdown to format the text.
            </p>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field
        name="status"
        validators={{
          onChange: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters"),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Status</Label>
            <Select defaultValue={field.state.value}>
              <SelectTrigger id={field.name}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              The status of the job. If the job is closed, it will not be
              displayed to applicants.
            </p>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit]) => (
          <Button type="submit" className="max-w-fit" disabled={!canSubmit}>
            Update Job
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
