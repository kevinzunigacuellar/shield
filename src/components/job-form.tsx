"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Heading2Icon,
  Heading3Icon,
  Bold,
  Italic,
  ListOrdered,
  List,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SubmitButton } from "@/components/submit-button";
import { ToolbarButton } from "@/components/toolbar-button";

interface JobFormProps {
  initialTitle?: string;
  initialDescriptionHtml?: string;
  jobId?: string;
  action: any;
}

export default function JobForm({
  initialTitle = "",
  initialDescriptionHtml = "",
  action,
  jobId,
}: JobFormProps) {
  const [jobTitle, setJobTitle] = useState(initialTitle);
  const editor = useEditor({
    content: initialDescriptionHtml,
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
          "w-full max-w-none focus:outline-none bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 prose prose-h2:font-semibold prose-h2:text-xl prose-h3:font-semibold prose-h3:text-lg prose-sm mx-0",
        id: "job-description",
      },
    },
  });

  const createJobWithArgs = action.bind(null, {
    title: jobTitle,
    description: editor?.getHTML(),
    text: editor?.getText(),
    id: jobId,
  });

  return (
    <form className="grid gap-6" action={createJobWithArgs}>
      <div className="grid gap-2">
        <Label htmlFor="job-title" className="text-sm font-medium">
          Job Title
        </Label>
        <Input
          id="job-title"
          required
          placeholder="Frontend Engineer"
          onChange={(e) => setJobTitle(e.target.value)}
          value={jobTitle}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="job-description" className="text-sm font-medium">
          Job Description
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
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              disabled={false}
              isActive={editor?.isActive("orderedList")}
              tooltip="Ordered List"
              aria-label="Ordered List"
            >
              <ListOrdered className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
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
      </div>
      <SubmitButton />
    </form>
  );
}
