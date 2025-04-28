import React from "react";
import { Message } from "@ai-sdk/react";
import ChatMessage from "./ChatMessage";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement| null>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, messagesEndRef }) => (
  <div className="space-y-2">
    {messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ))}
    <div ref={messagesEndRef} aria-hidden="true" />
  </div>
);

export default React.memo(MessageList);
