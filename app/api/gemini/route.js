import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
	const request = await req.json();
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });
	const prompt = `Write a story with main character ${request.name}, genre: ${request.genre}, magical Element: ${request.magicalElement}. also generate the title for the same."`;
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	return NextResponse.json({
		story: text,
	});
}
