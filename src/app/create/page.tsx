"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Heading2Icon, Heading3Icon, BoldIcon, ItalicIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createJob } from "@/app/create/actions";

export default function JobCreationPage() {
  const [jobTitle, setJobTitle] = useState("");
  const editor = useEditor({
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
          "w-full block focus:outline-none bg-background px-4 py-3 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 prose",
        id: "job-description",
      },
    },
  });

  const createJobWithArgs = createJob.bind(null, {
    title: jobTitle,
    description: editor?.getHTML(),
  });

  const toggleHeading2 = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  }, [editor]);

  const toggleHeading3 = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  return (
    <main className="py-16">
      <Card className="w-full max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a Job</CardTitle>
          <CardDescription>
            Fill out the form below to create a new job posting
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job-description" className="text-sm font-medium">
                Job Description
              </Label>
              <div className="min-h-[80px] w-full flex flex-col border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex items-center gap-2 bg-background p-1 border-b border-muted">
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 2 })
                        ? "secondary"
                        : "ghost"
                    }
                    size="icon"
                    onClick={toggleHeading2}
                    type="button"
                  >
                    <Heading2Icon className="h-5 w-5" />
                    <span className="sr-only">Heading 2</span>
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 3 })
                        ? "secondary"
                        : "ghost"
                    }
                    size="icon"
                    onClick={toggleHeading3}
                    type="button"
                  >
                    <Heading3Icon className="h-5 w-5" />
                    <span className="sr-only">Heading 3</span>
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant={editor?.isActive("bold") ? "secondary" : "ghost"}
                    size="icon"
                    onClick={toggleBold}
                    type="button"
                  >
                    <BoldIcon className="h-5 w-5" />
                    <span className="sr-only">Bold</span>
                  </Button>
                  <Button
                    variant={editor?.isActive("italic") ? "secondary" : "ghost"}
                    size="icon"
                    onClick={toggleItalic}
                    type="button"
                  >
                    <ItalicIcon className="h-5 w-5" />
                    <span className="sr-only">Italic</span>
                  </Button>
                </div>
                <EditorContent editor={editor} className="w-full" />
              </div>
            </div>
            <Button type="submit" variant="default" className="w-full">
              Create Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
