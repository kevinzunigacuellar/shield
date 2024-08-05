"use server";

import { inngest } from "@/inngest";
import prisma from "@/lib/prisma";
import {
	createApplicationSchema,
	type createApplicationType,
	rejectApplicationSchema,
	type rejectApplicationType,
} from "@/schema/application";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createApplication(data: createApplicationType) {
	const parsed = createApplicationSchema.safeParse(data);

	if (!parsed.success) {
		const errors = parsed.error.errors.map((e) => e.message).join(", ");
		throw new Error(errors);
	}

	const { name, email, resume, jobId } = parsed.data;

	const newApplication = await prisma.application.create({
		data: {
			jobId,
			name,
			email,
			resume: resume.url,
		},
		select: {
			id: true,
		},
	});

	try {
		await inngest.send({
			name: "app/application.sent",
			data: {
				applicationId: newApplication.id,
			},
		});
	} catch (e) {
		console.error(e);
	}
	redirect("/success");
}

export async function rejectApplication(data: rejectApplicationType) {
	const parsed = rejectApplicationSchema.safeParse(data);

	if (!parsed.success) {
		throw new Error("Something went wrong, please try again later.");
	}

	const { userId, orgId } = auth();

	if (!userId) {
		redirect("/unauthorized");
	}

	const currentUserId = orgId ?? userId;

	if (currentUserId !== data.ownerId) {
		throw new Error("You don't have permission to reject this application.");
	}

	try {
		await prisma.application.update({
			where: {
				id: data.id,
				job: {
					ownerId: currentUserId,
				},
			},
			data: {
				status: "REJECTED",
				updatedAt: new Date(),
			},
		});
	} catch (e) {
		throw new Error("Something went wrong, please try again later.");
	}
	revalidatePath("/applications");
}
