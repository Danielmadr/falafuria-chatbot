import React from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";

interface FrequentQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const FrequentQuestions: React.FC<FrequentQuestionsProps> = ({
  onSelectQuestion,
}) => {
  // Lista de perguntas frequentes
  const questions = [
    "Como posso usar o FurAi?",
    "Quais são os recursos disponíveis?",
    "Como posicionar o chat na tela?",
    "É possível personalizar o FurAi?",
    "Como redimensionar a janela de chat?",
  ];

  return (
    <Collapsible className="flex flex-col">
      <CollapsibleTrigger className="h-full w-full not-first:border rounded-md p-4 shadow-sm mb-2">
        Perguntas Frequentes
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="flex flex-col space-y-2 mb-2">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left h-auto w-full py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FrequentQuestions;
