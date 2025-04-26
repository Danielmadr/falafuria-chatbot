import { useRef, useEffect, memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";
import { CardContent } from "@/components/ui/card";
import FrequentQuestions from "./FrequentQuestions";
import { Size } from "../../types/common";

/**
 * ChatContent component manages the main content area of the chat interface
 * including message display and FAQ section.
 * 
 * @param {Message[]} messages - Array of chat messages to display
 * @param {Size} size - Width and height of the chat container
 * @param {number} headerHeight - Height of the header section
 * @param {number} footerHeight - Height of the footer section
 * @param {Function} onSelectQuestion - Callback for when a FAQ is selected
 * @param {Function} onFAQsOpenChange - Callback for when FAQs section opens/closes
 * @param {boolean} faqsOpen - Whether the FAQs section is currently open
 */
interface ChatContentProps {
  messages: Message[];
  size: Size;
  headerHeight: number;
  footerHeight: number;
  onSelectQuestion: (question: string) => void;
  onFAQsOpenChange: (isOpen: boolean) => void;
  faqsOpen: boolean;
}

/**
 * Single message component to improve rendering performance
 */
const ChatMessage = memo(({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={`flex space-x-2 text-sm mb-4 ${
        isUser
          ? "text-slate-600"
          : "text-slate-700 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
      }`}
    >
      {isUser ? (
        <Avatar className="h-12 w-12 flex-shrink-0 p-1">
          <AvatarImage src="useravatar.png" alt="User avatar" />
          <AvatarFallback className="bg-blue-500 text-white">User</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-12 w-12 flex-shrink-0 p-1" >
          <AvatarImage
            src="/iavatar.png"
            alt="AI assistant avatar"
          />
          <AvatarFallback className="bg-red-500 text-white">AI</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        <p className="font-bold mb-1">
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

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  onSelectQuestion,
  onFAQsOpenChange,
  faqsOpen,
}) => {
  // Single source of truth - use parent's faqsOpen state to determine visibility
  const showChat = !faqsOpen;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && showChat) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  // Handle FAQ question selection
  const handleQuestionSelect = (question: string) => {
    onSelectQuestion(question); // This will close FAQs and send the question
  };

  // Handle FAQ section expand/collapse
  const handleFAQToggle = (isOpen: boolean) => {
    onFAQsOpenChange(isOpen);
  };

  return (
    <CardContent className="p-2 flex-1 flex flex-col overflow-hidden">
      <div className="mb-2">
        <FrequentQuestions
          onSelectQuestion={handleQuestionSelect}
          onOpenChange={handleFAQToggle}
          isOpen={faqsOpen}
        />
      </div>
      
      {showChat && (
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full border rounded-md p-4 shadow-sm bg-white dark:bg-gray-800">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-center p-4">
                <p>Selecione uma pergunta frequente ou envie uma mensagem para começar a conversa.</p>
              </div>  
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </ScrollArea>
        </div>
      )}
    </CardContent>
  );
};

export default memo(ChatContent);