/**
 * MessageList Component
 *
 * Renders the list of chat messages and provides a reference point for scrolling.
 */
import React from "react";
import { Message } from "@ai-sdk/react";
import ChatMessage from "./ChatMessage";

/**
 * Props for the MessageList component
 */
interface MessageListProps {
  /** Array of messages to display */
  messages: Message[];
  /** Reference to the end of the message list for scrolling */
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * MessageList Component
 *
 * Renders a list of chat messages and provides a reference point for auto-scrolling.
 * Each message is rendered using the ChatMessage component.
 *
 * @param {MessageListProps} props - Component properties
 * @returns {JSX.Element} The rendered message list
 */
const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef,
}) => (
  <div className="space-y-2">
    {messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ))}
    <div ref={messagesEndRef} aria-hidden="true" />
  </div>
);

export default React.memo(MessageList);
