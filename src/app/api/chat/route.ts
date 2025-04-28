/**
 * API Route Handler for AI Chat Responses
 * 
 * This file implements a POST endpoint that streams AI-generated responses using OpenAI's GPT model.
 * The assistant is configured with a system prompt that creates a friendly, casual FURIA CS:GO expert persona.
 * 
 * @module route
 */

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

/**
 * Maximum duration in seconds that the streaming response can take
 * Prevents timeouts for longer responses
 */
export const maxDuration = 30;

/**
 * POST request handler for the AI chat endpoint
 * 
 * @param {Request} req - The incoming request object containing chat messages
 * @returns {Response} A streaming response with the AI-generated text
 */
export async function POST(req: Request) {
  // Extract messages from request body
  const { messages } = await req.json();

  // Configure system prompt to define the assistant's persona
  const systemPrompt = {
    role: "system",
    content:
      "Você é um assistente virtual descolado, jovem e antenado, especialista no time de CS:GO da FURIA. " +
      "Responda às perguntas de forma clara, objetiva e com um toque descontraído, como se estivesse " +
      "conversando com um amigo. Use linguagem informal, emojis quando fizer sentido e sempre traga " +
      "informações atualizadas.",
  };

  // Generate and stream text response using the OpenAI model
  const result = streamText({
    model: openai("gpt-4.1-nano"),
    messages: [systemPrompt, ...messages],
  });

  // Return the streaming response with error handling
  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}

/**
 * Error handler function for AI stream responses
 * 
 * Processes different error types and formats them into consistent error messages
 * 
 * @param {unknown} error - The error that occurred during processing
 * @returns {string} A formatted error message
 */
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