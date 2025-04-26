import React, { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={`flex space-x-2 text-sm mb-4 ${
        isUser
          ? "text-slate-600 dark:text-slate-300"
          : "text-slate-700 dark:text-slate-200 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
      }`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0 p-1">
        <AvatarImage 
          src={isUser ? "useravatar.png" : "/iavatar.png"} 
          alt={isUser ? "User avatar" : "AI assistant avatar"} 
        />
        <AvatarFallback className={isUser ? "bg-blue-500 text-white" : "bg-red-500 text-white"}>
          {isUser ? "User" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-bold mb-1 dark:text-white">
          {isUser ? "User" : "FurAi"}
        </p>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;