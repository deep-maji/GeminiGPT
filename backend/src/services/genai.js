import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const models = {
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemma-3-1b-it": "gemma-3-1b-it",
}

export async function googleGenAiMain({ prompt }) {
  const response = await ai.models.generateContent({
    model: models["gemma-3-1b-it"],
    contents: prompt,
  });
  return response;
}

export async function streamingChat({ prompt }) {
  const response = await ai.models.generateContentStream({
    model: models["gemma-3-1b-it"],
    contents: prompt,
  });
  return response;
}

export async function genarateTitleOfTheChat({ contents }) {
  const response = await ai.models.generateContent({
    model: models["gemma-3-1b-it"],
    contents: `Summarize this conversation into a 4-word title: ${contents}`
  })
  return response;
}