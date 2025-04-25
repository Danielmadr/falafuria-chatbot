import { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";
import { CardContent } from "@/components/ui/card";
import FrequentQuestions from "./FrequentQuestions";

/**
 * ChatContent component manages the main content area of the chat interface
 * including message display and FAQ section.
 * 
 * @param {Message[]} messages - Array of chat messages to display
 * @param {Object} size - Width and height of the chat container
 * @param {number} headerHeight - Height of the header section
 * @param {number} footerHeight - Height of the footer section
 * @param {Function} onSelectQuestion - Callback for when a FAQ is selected
 */
interface ChatContentProps {
  messages: Message[];
  size: { width: number; height: number };
  headerHeight: number;
  footerHeight: number;
  onSelectQuestion?: (question: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  size,
  headerHeight,
  footerHeight,
  onSelectQuestion = () => {},
}) => {
  // State to track whether chat or FAQ should be displayed
  const [showChat, setShowChat] = useState<boolean>(true);
  
  // Calculate available height for content area
  const scrollAreaHeight = Math.max(
    100,
    size.height - headerHeight - footerHeight
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && showChat) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  // Handle FAQ question selection
  const handleQuestionSelect = (question: string) => {
    setShowChat(true); // Show chat area when question is selected
    onSelectQuestion(question); // Pass question to parent component
  };

  // Handle FAQ section expand/collapse
  const handleFAQToggle = (isOpen: boolean) => {
    // When FAQ is expanded, hide chat
    setShowChat(!isOpen);
  };

  return (
    <CardContent
      className="flex flex-col p-2 mt-2 h-150"
    >
      <FrequentQuestions
        onSelectQuestion={handleQuestionSelect}
        onOpenChange={handleFAQToggle}
      />
      
      {showChat && (
        <ScrollArea className="flex h-full border rounded-md p-4 shadow-sm"
          style={{ height: scrollAreaHeight }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-2 text-sm mb-4 ${
                message.role === "user"
                  ? "text-slate-600"
                  : "text-slate-700 bg-gray-100 p-2 rounded-md shadow-sm"
              }`}
            >
              {message.role === "user" ? (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src="/iavatar_black.png"
                    alt="AI assistant avatar"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <p className="font-bold mb-1">
                  {message.role === "user" ? "User" : "FurAi"}
                </p>
                <div className="leading-relaxed break-words whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      )}
    </CardContent>
  );
};

export default ChatContent;