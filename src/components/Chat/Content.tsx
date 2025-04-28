// components/Content.tsx
import React, { useRef, useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CardContent } from "../ui/card";
import { Message } from "@ai-sdk/react";
import FrequentQuestions from "./FrequentQuestions";
import EmptyChat from "./EmptyChat";
import MessageList from "./MessageList";
import { useChat } from "../../contexts/ChatContext";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { Size } from "../../types/common";

interface ChatContentProps {
  messages: Message[];
  size: Size;
  headerHeight: number;
  footerHeight: number;
  onFAQsOpenChange: (isOpen: boolean) => void;
  faqsOpen: boolean;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  onFAQsOpenChange,
  faqsOpen,
}) => {
  const { selectQuestion } = useChat();
  const showChat = !faqsOpen;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useAutoScroll(messagesEndRef, messages.length, showChat);

  const messageDisplay = useMemo(() => {
    if (messages.length === 0) {
      return <EmptyChat />;
    }
    return <MessageList messages={messages} messagesEndRef={messagesEndRef} />;
  }, [messages]);

  const handleQuestionSelect = (question: string) => {
    selectQuestion(question);
  };

  return (
    <CardContent className="p-2 flex-1 flex flex-col overflow-hidden">
      <div className="mb-2">
        <FrequentQuestions
          onSelectQuestion={handleQuestionSelect}
          onOpenChange={onFAQsOpenChange}
          isOpen={faqsOpen}
        />
      </div>

      {showChat && (
        <div
          className="flex-1 overflow-hidden"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Chat message history"
        >
          <ScrollArea className="h-full border rounded-md p-4 shadow-sm bg-white dark:bg-gray-800">
            {messageDisplay}
          </ScrollArea>
        </div>
      )}
    </CardContent>
  );
};

export default React.memo(ChatContent);
