import { GoogleGenAI } from "@google/genai";
import * as repo from "./ai.repository.js";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const chat = async ({ message, history }) => {
  const formattedHistory = (history || []).map((m) => ({
    role: m.role,
    parts: [{ text: m.text || m.content || "" }]
  }));

  const scholarships = await repo.getScholarshipsContext();

  const context = scholarships
    .map((s) =>
      `Name: ${s.name}, Amount: ${s.amount}, Category: ${s.category}, GPA: ${s.gpaRequirement}, Level: ${s.degreeLevel}`
    )
    .join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: `
You are Edugrant AI Assistant.

Use this scholarship data:
${context}

Rules:
- Recommend scholarships based on GPA, category, degree
- Be concise
- Use bullet points when listing
      `
    }
  });

  const text =
    response.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return { text };
};