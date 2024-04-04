import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
	const body = await req.json();
	const { story } = body;
	let allImages = [];
	const prompts = await getPrompts(story);
	const allPrompts = prompts.filter((prompt) => prompt);
	for (let i = 0; i < allPrompts.length; i++) {
		const text_prompts = [{ text: prompts[i] }];
		const response = await fetch(
			"https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
				},
				body: JSON.stringify({ text_prompts }),
			}
		);
		const images = await response.json();
		allImages.push(images.artifacts[0].base64);
	}
	return NextResponse.json({ images: allImages });
}

async function getPrompts(story) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });
	const prompt = `You are a friendly assistant. Your job is to generate image prompts based on the following story. Each prompt should be a short descriptive sentence. Please list all three prompts, separated by a "|" symbol. story: ${story}`;
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	const prompts = text.split("|") || "";
	return prompts;
}
