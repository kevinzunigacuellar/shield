"use client";

import { createJob } from "@/actions/job";
import { FieldInfo } from "@/components/field-info";
import { ToolbarButton } from "@/components/toolbar-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export function JobForm() {
	const form = useForm({
		defaultValues: {
			title: "",
			body: "",
		},
		onSubmit: async ({ value }) => {
			toast.promise(createJob(value), {
				loading: "Creating job...",
				success: "Job created!",
				error: "Could not create job.",
			});
		},
		validatorAdapter: zodValidator(),
	});

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [2, 3],
				},
			}),
		],
		onUpdate: ({ editor }) => {
			form.setFieldValue("body", JSON.stringify(editor.getJSON()));
			form.validateField("body", "change");
		},
		editorProps: {
			attributes: {
				class:
					"w-full focus:outline-none bg-background max-w-none px-3 py-2 placeholder:text-primary disabled:cursor-not-allowed disabled:opacity-50 prose prose-h2:font-semibold prose-h2:text-xl prose-h3:font-semibold prose-h3:text-lg prose-sm mx-0 min-h-40 h-full",
				id: "body",
			},
			handleDOMEvents: {
				blur: () => {
					form.validateField("body", "change");
				},
			},
		},
	});

	const getSelectValue = () => {
		if (editor?.isActive("heading", { level: 2 })) {
			return "h2";
		}
		if (editor?.isActive("heading", { level: 3 })) {
			return "h3";
		}
		if (editor?.isActive("orderedList")) {
			return "ol";
		}
		if (editor?.isActive("bulletList")) {
			return "ul";
		}
		return "text";
	};

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
							<div className="flex items-center bg-background p-1.5 gap-0.5 border-b border-muted">
								<Select
									value={getSelectValue()}
									onValueChange={(value) => {
										switch (value) {
											case "h2":
												editor
													?.chain()
													.focus()
													.toggleHeading({ level: 2 })
													.run();
												break;
											case "h3":
												editor
													?.chain()
													.focus()
													.toggleHeading({ level: 3 })
													.run();
												break;
											case "ol":
												editor?.chain().focus().toggleOrderedList().run();
												break;
											case "ul":
												editor?.chain().focus().toggleBulletList().run();
												break;
											case "text":
												editor?.chain().focus().setParagraph().run();
												break;
										}
									}}
								>
									<SelectTrigger className="w-36 mr-1">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="h2">Heading 2</SelectItem>
										<SelectItem value="h3">Heading 3</SelectItem>
										<SelectItem value="ol">Ordered List</SelectItem>
										<SelectItem value="ul">Bullet List</SelectItem>
										<SelectItem value="text">Text</SelectItem>
									</SelectContent>
								</Select>
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
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit]) => (
					<Button
						type="submit"
						className="max-w-fit ml-auto"
						disabled={!canSubmit}
					>
						Add Job
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
