import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.APP_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function startAIChat(
  history: IChatMessage[],
  currentMessage: string
) {
  history = history.filter((message) => !("isLoading" in message));

  const chat = model.startChat({
    history,
  });

  const result = await chat.sendMessage(currentMessage);
  const message = await result.response.text();

  return message;
}
