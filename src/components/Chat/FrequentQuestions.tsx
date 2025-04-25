import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

/**
 * FrequentQuestions component displays a collapsible list of predefined questions
 * that users can select to quickly interact with the chat.
 * 
 * @param {Function} onSelectQuestion - Callback when a question is selected
 * @param {Function} onOpenChange - Callback when the collapsible state changes
 */
interface FrequentQuestionsProps {
  onSelectQuestion: (question: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

const FrequentQuestions: React.FC<FrequentQuestionsProps> = ({
  onSelectQuestion,
  onOpenChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange(open);
  };

  // Handle question selection
  const handleQuestionClick = (question: string) => {
    onSelectQuestion(question);
    // Auto-close the FAQ section after selection
    setIsOpen(false);
    onOpenChange(false);
  };

  // List of frequent questions - categorized for better organization
  const questionCategories = [
    {
      title: "Sobre o Time",
      questions: [
        "Qual é a escalação atual da FURIA?",
        "Quem são os jogadores titulares e reservas?",
        "Qual é a função de cada jogador na equipe?",
        "Quem é o técnico atual da FURIA?",
      ]
    },
    {
      title: "Jogos e Campeonatos",
      questions: [
        "Quando será o próximo jogo da FURIA?",
        "Contra quem será a próxima partida?",
        "Qual foi o resultado do último jogo?",
        "Onde posso assistir às partidas da FURIA ao vivo?",
        "Qual é o desempenho recente da FURIA nos campeonatos?",
        "Quantos títulos a FURIA já conquistou?",
      ]
    },
    {
      title: "Estatísticas e Notícias",
      questions: [
        "Quais são as estatísticas individuais dos jogadores?",
        "Quais são as últimas notícias sobre a FURIA?",
        "Houve alguma mudança recente na equipe?",
        "Quais são os próximos campeonatos em que a FURIA participará?",
      ]
    },
    {
      title: "Fãs e Suporte",
      questions: [
        "Onde posso comprar produtos oficiais da FURIA?",
        "Há promoções ou lançamentos recentes na loja oficial?",
        "Posso participar de enquetes ou quizzes sobre a equipe?",
        "Como envio sugestões ou feedback?",
        "Quais são os canais oficiais da FURIA nas redes sociais?",
        "Como posso entrar em contato com o suporte da FURIA?",
        "Quais são os horários de atendimento ao cliente?",
        "A FURIA tem algum programa de fidelidade ou recompensas?",
        "Quais são as políticas de devolução e troca da loja oficial?",
        "Como posso acompanhar as estatísticas em tempo real durante os jogos?",
        "A FURIA tem algum aplicativo oficial para dispositivos móveis?",
      ]
    }
  ];

  return (
    <Collapsible 
      className="flex flex-col w-full" 
      open={isOpen} 
      onOpenChange={handleOpenChange}
    >
      <CollapsibleTrigger className="w-full not-first:border rounded-lg p-3 shadow-sm mb-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-blue-500" />
          <span className="font-medium">Perguntas Frequentes</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full">
        <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800 mb-4">
          <ScrollArea className="max-h-80 pr-2">
            <div className="space-y-6">
              {questionCategories.map((category, catIndex) => (
                <div key={catIndex} className="space-y-2">
                  <h3 className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2 border-b pb-1">
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.questions.map((question, qIndex) => (
                      <Button
                        key={qIndex}
                        variant="ghost"
                        size="sm"
                        className="justify-start text-left h-auto w-full py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FrequentQuestions;