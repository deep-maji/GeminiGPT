import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const models = {
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemma-4-26b-a4b-it": "gemma-4-26b-a4b-it",
  "google/gemma-4-31B": "gemma-4-31B"
}

const MODEL_NAME = models["gemini-2.5-flash"]

// Old without histroy
// export async function googleGenAiMain({ prompt }) {
//   const response = await ai.models.generateContent({
//     model: models["gemma-3-1b-it"],
//     contents: prompt,
//   });
//   return response;
// }

// With histroy
export async function googleGenAiMain({ prompt, history }) {

  let currHistroy = []

  // histroy is empty for first message
  if (history.length !== 0) {
    currHistroy = history.map((ele) => ({ role: ele.role, parts: [{ text: ele.content }] }));
  }

  const chat = ai.chats.create({
    model: MODEL_NAME,
    history: currHistroy,
  });

  const response = await chat.sendMessage({
    message: prompt,
  });

  console.log(response);

  return response;
}

export async function streamingChat({ prompt }) {
  const response = await ai.models.generateContentStream({
    model: MODEL_NAME,
    contents: prompt,
  });
  return response;
}

export async function genarateTitleOfTheThread({ contents }) {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Summarize this conversation into a 3-word title: ${contents}`
  })
  console.log(response.text);

  return response;
}

export async function modelNames(params) {
  const models = await ai.models.list();

  // for (const element of models.Pager.pageInternal) {
  //   console.log(element.name);
  // }

  console.log(models);


}