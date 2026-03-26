import "dotenv/config";
import { streamingChat, googleGenAiMain } from "./services/genai.js";

const content = {
  prompt: "ok"
}
streamingChat(content);
// googleGenAiMain({ prompt: "hi" });