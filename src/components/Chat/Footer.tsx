import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ChatFooterProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading = false,
}) => {
  return (
    <CardFooter className="mt-auto flex-shrink-0 p-3 bg-card">
      <form className="flex w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="Type a message"
          value={input}
          onChange={handleInputChange}
          className="flex-grow"
          disabled={isLoading}
          aria-label="Message input"
        />
        <Button 
          type="submit" 
          className="ml-3" 
          variant="secondary"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Sending</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </Button>
      </form>
    </CardFooter>
  );
};

export default ChatFooter;