import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { forwardRef, RefObject } from "react";
import { CardFooter } from "../ui/card";

/**
 * ChatFooter component manages the input area of the chat interface
 * including the message input field and send button.
 * 
 * @param {string} input - Current input value
 * @param {Function} handleInputChange - Callback for input changes
 * @param {Function} handleSubmit - Callback for form submission
 * @param {boolean} isLoading - Whether a message is being processed
 * @param {RefObject<HTMLFormElement>} formRef - Reference to the form element
 */
interface ChatFooterProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  formRef?: RefObject<HTMLFormElement>;
}

const ChatFooter = forwardRef<HTMLFormElement, ChatFooterProps>(({
  input,
  handleInputChange,
  handleSubmit,
  isLoading = false,
}, ref) => {
  return (
    <CardFooter className="mt-auto w-full p-3 ">
      <form className="flex w-full" onSubmit={handleSubmit} ref={ref}>
        <Input
          placeholder="Digite sua mensagem"
          value={input}
          onChange={handleInputChange}
          className="flex-grow"
          disabled={isLoading}
          aria-label="Input de mensagem"
        />
        <Button 
          type="submit" 
          className="ml-3" 
          variant="secondary"
          disabled={isLoading || !input.trim()}
          aria-label="Enviar mensagem"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Enviando</span>
            </>
          ) : (
            <span>Enviar</span>
          )}
        </Button>
      </form>
    </CardFooter>
  );
});

ChatFooter.displayName = "ChatFooter";

export default ChatFooter;