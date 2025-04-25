import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export const useChatHandlers = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [localInput, setLocalInput] = useState(input);

  const onInputChange = (event) => {
    setLocalInput(event.target.value);
    handleInputChange(event);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
    setLocalInput(""); // Clear input after submission
  };

  return {
    messages,
    localInput,
    onInputChange,
    onSubmit,
  };
};