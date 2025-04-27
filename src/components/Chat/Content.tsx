import { useRef, useEffect, memo, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@ai-sdk/react";
import { CardContent } from "@/components/ui/card";
import FrequentQuestions from "./FrequentQuestions";
import { Size } from "../../types/common";
import ChatMessage from "./ChatMessage";
import { useChat } from "../contexts/ChatContext";
import { useAutoScroll } from "../hooks/useAutoScroll";

/**
 * ChatContent component manages the main content area of the chat interface
 * including message display and FAQ section.
 */
interface ChatContentProps {
  messages: Message[];
  size: Size;
  headerHeight: number;
  footerHeight: number;
  onFAQsOpenChange: (isOpen: boolean) => void;
  faqsOpen: boolean;
}

/**
 * EmptyChat displays a message when no messages are present
 */
const EmptyChat = memo(() => (
  <div className="flex items-center justify-center h-full text-gray-400 text-center p-4" role="status" aria-live="polite">
    <p>
      Selecione uma pergunta frequente ou envie uma mensagem para
      começar a conversa.
    </p>
  </div>
));

EmptyChat.displayName = "EmptyChat";

/**
 * MessageList renders the list of chat messages
 */
const MessageList = memo(({ messages, messagesEndRef }: { 
  messages: Message[],
  messagesEndRef: React.RefObject<HTMLDivElement>
}) => (
  <div className="space-y-2">
    {messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ))}
    <div ref={messagesEndRef} aria-hidden="true" />
  </div>
));

MessageList.displayName = "MessageList";

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  onFAQsOpenChange,
  faqsOpen,
}) => {
  // Get selectQuestion function from context
  const { selectQuestion } = useChat();

  // Single source of truth - use parent's faqsOpen state to determine visibility
  const showChat = !faqsOpen;
  
  // Reference for scroll behavior
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Custom hook for auto-scrolling
  useAutoScroll(messagesEndRef, messages.length, showChat);

  // Memoize message display component based on message presence
  const messageDisplay = useMemo(() => {
    if (messages.length === 0) {
      return <EmptyChat />;
    }
    
    return <MessageList messages={messages} messagesEndRef={messagesEndRef} />;
  }, [messages]);

  // Handle FAQ question selection
  const handleQuestionSelect = (question: string) => {
    selectQuestion(question); // This will close FAQs and send the question
  };

  return (
    <CardContent className="p-2 flex-1 flex flex-col overflow-hidden">
      {/* FAQ Section */}
      <div className="mb-2">
        <FrequentQuestions
          onSelectQuestion={handleQuestionSelect}
          onOpenChange={onFAQsOpenChange}
          isOpen={faqsOpen}
        />
      </div>

      {/* Chat Messages Section - Only show when FAQs are not open */}
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

// Use React.memo to prevent unnecessary re-renders
export default memo(ChatContent);