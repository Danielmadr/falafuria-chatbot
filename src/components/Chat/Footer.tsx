/**
 * Footer Component
 *
 * The input area at the bottom of the chat where users can type and send messages.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SendHorizontal } from "lucide-react";
import { forwardRef } from "react";
import { CardFooter } from "../ui/card";

/**
 * Props for the ChatFooter component
 */
interface ChatFooterProps {
  /** Current value of the input field */
  input: string;
  /** Handler for input change events */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for form submission */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Whether a message is currently being sent */
  isLoading?: boolean;
}

/**
 * ChatFooter Component
 *
 * Provides the message input form at the bottom of the chat interface.
 * Contains an input field and a send button with loading state.
 *
 * @param {ChatFooterProps} props - Component properties
 * @param {React.Ref<HTMLFormElement>} ref - Reference to the form element
 * @returns {JSX.Element} The rendered footer component
 */
const ChatFooter = forwardRef<HTMLFormElement, ChatFooterProps>(
  ({ input, handleInputChange, handleSubmit, isLoading = false }, ref) => {
    return (
      <CardFooter className="p-3 pb-7 bg-white dark:bg-gray-800 border-t">
        <form
          className="flex w-full items-center gap-2"
          onSubmit={handleSubmit}
          ref={ref}
          aria-label="Chat input form"
        >
          <Input
            placeholder="Digite sua mensagem"
            value={input}
            onChange={handleInputChange}
            className="flex-grow rounded-r-none focus-visible:ring-blue-500"
            aria-label="Campo de entrada de mensagem"
          />
          <Button
            type="submit"
            className="rounded-l-none h-10"
            variant="secondary"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensagem"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    );
  }
);

ChatFooter.displayName = "ChatFooter";

export default ChatFooter;
