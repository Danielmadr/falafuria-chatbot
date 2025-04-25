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
    "Qual é a escalação atual da FURIA?",
    "Quem são os jogadores titulares e reservas?",
    "Qual é a função de cada jogador na equipe?",
    "Quem é o técnico atual da FURIA?",
    "Quando será o próximo jogo da FURIA?",
    "Contra quem será a próxima partida?",
    "Qual foi o resultado do último jogo?",
    "Onde posso assistir às partidas da FURIA ao vivo?",
    "Qual é o desempenho recente da FURIA nos campeonatos?",
    "Quantos títulos a FURIA já conquistou?",
    "Quais são as estatísticas individuais dos jogadores?",
    "Quais são as últimas notícias sobre a FURIA?",
    "Houve alguma mudança recente na equipe?",
    "Quais são os próximos campeonatos em que a FURIA participará?",
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
  ];

  return (
    <Collapsible className="flex flex-col">
      <CollapsibleTrigger className="h-full w-full not-first:border rounded-md p-4 shadow-sm mb-2">
        Perguntas Frequentes
      </CollapsibleTrigger>
      <CollapsibleContent className="flex">
        <ScrollArea className="flex space-y-2 mb-2">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left h-auto w-full py-2 text-gray-700 hover:bg-gray-100 mb-1"
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
