import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useChat as useAIChat, Message } from "@ai-sdk/react";
import { Position, Size } from '../../types/common';

interface ChatContextType {
  messages: Message[];
  input: string;
  isLoading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setInput: (value: string) => void;
  faqsOpen: boolean;
  setFaqsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  formRef: React.RefObject<HTMLFormElement>;
  selectQuestion: (question: string) => void;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use AI SDK's chat functionality
  const { 
    messages, 
    input, 
    handleInputChange: baseHandleInputChange, 
    handleSubmit: baseHandleSubmit, 
    isLoading, 
    setInput: baseSetInput,
    reload 
  } = useAIChat();
  
  // Local state
  const [faqsOpen, setFaqsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({ width: 500, height: 600 });
  const formRef = useRef<HTMLFormElement>(null);
  
  // Enhanced input handler (can add additional validation if needed)
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    baseHandleInputChange(event);
  }, [baseHandleInputChange]);
  
  // Enhanced submit handler with input validation
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      baseHandleSubmit(event);
    }
  }, [input, baseHandleSubmit]);
  
  // Set input with optional validation
  const setInput = useCallback((value: string) => {
    baseSetInput(value);
  }, [baseSetInput]);
  
  // Helper to select a predefined question and trigger form submission
  const selectQuestion = useCallback((question: string) => {
    baseSetInput(question);
    setFaqsOpen(false);
    
    // Submit the form on the next frame to ensure the input is updated
    requestAnimationFrame(() => {
      if (formRef.current) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(submitEvent);
      }
    });
  }, [baseSetInput]);
  
  // Reset chat functionality
  const resetChat = useCallback(() => {
    baseSetInput('');
    if (reload) {
      reload();
    }
  }, [baseSetInput, reload]);
  
  return (
    <ChatContext.Provider value={{
      messages,
      input,
      isLoading,
      handleInputChange,
      handleSubmit,
      setInput,
      faqsOpen,
      setFaqsOpen,
      position,
      setPosition,
      size,
      setSize,
      formRef,
      selectQuestion,
      resetChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};