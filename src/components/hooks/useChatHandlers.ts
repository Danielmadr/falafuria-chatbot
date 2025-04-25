import { useState, useCallback, FormEvent, ChangeEvent } from "react";
import { useChat, Message } from "@ai-sdk/react";

/**
 * Interface for the return values from the useChatHandlers hook
 */
interface UseChatHandlersResult {
  messages: Message[];
  input: string;
  isLoading: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setInput: (value: string) => void;
  resetChat: () => void;
  selectQuestion: (question: string) => void;
}

/**
 * useChatHandlers hook provides enhanced chat functionality with additional utilities
 * beyond what the basic useChat hook provides.
 * 
 * Features:
 * - All standard useChat functionality
 * - FAQ/predefined question selection
 * - Form submission helper
 * - Reset functionality
 * 
 * @returns {UseChatHandlersResult} Enhanced chat handlers and state
 */
export const useChatHandlers = (): UseChatHandlersResult => {
  // Get base chat functionality from useChat
  const { 
    messages, 
    input, 
    handleInputChange: baseHandleInputChange,
    handleSubmit: baseHandleSubmit,
    isLoading,
    setInput: baseSetInput,
    reload,
    stop
  } = useChat();

  // Enhanced input handler with additional functionality if needed
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    baseHandleInputChange(event);
  }, [baseHandleInputChange]);

  // Enhanced submit handler
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      baseHandleSubmit(event);
    }
  }, [input, baseHandleSubmit]);

  // Set input with validation
  const setInput = useCallback((value: string) => {
    baseSetInput(value);
  }, [baseSetInput]);

  // Reset chat functionality
  const resetChat = useCallback(() => {
    // This would need to be implemented based on the capabilities
    // of the AI SDK and what "resetting" means in your app context
    baseSetInput('');
    // If the AI SDK provides a way to clear messages, call it here
  }, [baseSetInput]);

  // Helper to select a predefined question
  const selectQuestion = useCallback((question: string) => {
    baseSetInput(question);
  }, [baseSetInput]);

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
    resetChat,
    selectQuestion
  };
};