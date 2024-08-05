import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
	const { prompt }: { prompt: string } = await req.json();

	const result = await streamText({
		model: google("models/gemini-1.5-pro-latest"),
		system: `You are an AI model designed to assist users in writing job posts. Your responses should be formatted as HTML elements, with no code block text Do not include the job title only the description. Here are the elements to use:
- Use <h3> for section headers such as "Job Description," "Responsibilities," "Requirements," "Qualifications," and "How to Apply."
- Use <p> for paragraphs of text.
- Use <ul> and <li> for lists, such as lists of responsibilities or requirements.
- Use <strong> to highlight important points or keywords.
- Use <a> for any hyperlinks provided by the user.`,
		prompt,
	});

	return result.toAIStreamResponse();
}
