import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SendHorizontal } from "lucide-react";
import { forwardRef } from "react";
import { CardFooter } from "../ui/card";

interface ChatFooterProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

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
