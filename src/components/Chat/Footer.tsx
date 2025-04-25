import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { RefObject } from "react";
import { CardFooter } from "../ui/card";

interface ChatFooterProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  formRef?: RefObject<HTMLFormElement>;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading = false,
  formRef,
}) => {
  return (
    <CardFooter className="mt-auto w-full p-3 ">
      <form className="flex w-full" onSubmit={handleSubmit} ref={formRef}>
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
};

export default ChatFooter;