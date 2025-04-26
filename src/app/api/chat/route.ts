import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

    // Adiciona o prompt de sistema no início
    const systemPrompt = {
      role: "system",
      content:
        "Você é um assistente virtual descolado, jovem e antenado, especialista no time de CS:GO da FURIA. Responda às perguntas de forma clara, objetiva e com um toque descontraído, como se estivesse conversando com um amigo. Use linguagem informal, emojis quando fizer sentido e sempre traga informações atualizadas.",
    };


  const result = streamText({
    model: openai("gpt-4.1-nano"),
    messages: [systemPrompt, ...messages],
  });

  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}

export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
