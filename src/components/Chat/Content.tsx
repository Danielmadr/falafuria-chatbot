/**
 * Content Component
 *
 * The main content area of the chat that displays messages and FAQs.
 * Handles scrolling and empty state display.
 */
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

/**
 * Props for the ChatContent component
 */
interface ChatContentProps {
  /** Array of chat messages */
  messages: Message[];
  /** Size dimensions for the chat window */
  size: Size;
  /** Height of the header in pixels */
  headerHeight: number;
  /** Height of the footer in pixels */
  footerHeight: number;
  /** Callback for when FAQs open state changes */
  onFAQsOpenChange: (isOpen: boolean) => void;
  /** Whether the FAQs panel is open */
  faqsOpen: boolean;
}

/**
 * ChatContent Component
 *
 * Contains the main scrollable area with messages and the FAQs section.
 * Handles the display of messages or empty state and auto-scrolling.
 *
 * @param {ChatContentProps} props - Component properties
 * @returns {JSX.Element} The rendered content area
 */
const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  onFAQsOpenChange,
  faqsOpen,
}) => {
  const { selectQuestion } = useChat();
  const showChat = !faqsOpen;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useAutoScroll(messagesEndRef, messages.length, showChat);

  // Memoize message display to prevent unnecessary re-renders
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
