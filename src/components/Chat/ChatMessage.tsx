/**
 * ChatMessage Component
 *
 * Displays individual messages in the chat with different styling for user and AI messages.
 * Features avatars and appropriate text formatting.
 */
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useTheme } from "next-themes";
import { useChat } from "../../contexts/ChatContext";
import AvatarIcon from "../icons/AvatarIcon";
import { getUserAvatarSrc } from "../../utils/avatarUtils";

/**
 * Props for the ChatMessage component
 */
interface ChatMessageProps {
  /** The message object to display */
  message: Message;
}

/**
 * ChatMessage Component
 *
 * Renders a single message in the chat with appropriate styling based on sender (user or AI).
 * Includes avatar, sender name, and message content with proper formatting.
 *
 * @param {ChatMessageProps} props - The message data
 * @returns {JSX.Element} The rendered message component
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const { resolvedTheme } = useTheme();
  const { messageFontSize } = useChat();

  const userAvatarSrc = getUserAvatarSrc(resolvedTheme);

  return (
    <div
      className={`flex space-x-2 text-sm mb-4 ${
        isUser
          ? "text-slate-600 dark:text-slate-300"
          : "text-slate-700 dark:text-slate-200 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
      }`}
      aria-label={`Message from ${isUser ? "User" : "FurAi"}`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0 p-1">
        {isUser ? (
          <>
            <AvatarImage
              src={userAvatarSrc}
              alt="User avatar"
              className="h-full w-full object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white">
              User
            </AvatarFallback>
          </>
        ) : (
          <AvatarIcon
            lightColor="#000000"
            darkColor="#ffffff"
            className="pointer-events-none"
            viewBox="0 0 750 750"
          />
        )}
      </Avatar>
      <div className="flex-1">
        <p className="font-bold mb-1 dark:text-white">
          {isUser ? "User" : "FurAi"}
        </p>
        <div
          className="leading-relaxed break-words whitespace-pre-wrap"
          style={{ fontSize: `${messageFontSize}px` }}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
