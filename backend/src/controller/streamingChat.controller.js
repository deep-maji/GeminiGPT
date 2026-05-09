import ExpressError from "../utils/ExpressError.js";
import { genarateTitleOfTheThread, streamingChat } from "../services/genai.js";
import Threads from "../models/threads.model.js";
import httpStatus from "http-status"
import extractTitle from "../utils/getTitle.js";


export const streamChat = async (req, res, next) => {
  const { prompt, chat_id } = req.body;
  const { id, email } = req.userData;
  if (!prompt || !chat_id) {
    throw new ExpressError(404, "Prompt is required!");
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`data: connected to server\n\n`);

  const response = await streamingChat({ prompt });
  let contents = "";
  for await (const chunk of response) {
    if (!chunk.text) continue;

    contents += chunk.text;
    res.write(`data: ${chunk.text}\n\n`);
  }

  res.write(`data: ${contents}\n\n`);

  res.on('close', () => {
    console.log("hello");
    res.end();
  })

}

