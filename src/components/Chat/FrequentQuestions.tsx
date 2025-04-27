import React, { useCallback, memo } from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { QuestionCategory } from "../../types/common";
import { QUESTION_CATEGORIES } from "../../data/frequentQuestions";

// Define the props for the FrequentQuestions component
interface FrequentQuestionsProps {
  onSelectQuestion: (question: string) => void;
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
}

// Create a stable callback function for question selection within category section
const createQuestionSelector =
  (onSelectQuestion: (q: string) => void) => (question: string) =>
    onSelectQuestion(question);

// Memoized question category component for better performance
const QuestionCategorySection = memo(
  ({
    category,
    onSelectQuestion,
  }: {
    category: QuestionCategory;
    onSelectQuestion: (question: string) => void;
  }) => {
    // Create a stable selector function once
    const selectQuestion = useCallback(
      createQuestionSelector(onSelectQuestion),
      [onSelectQuestion]
    );

    return (
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2 border-b pb-1">
          {category.title}
        </h3>
        <div className="space-y-1">
          {category.questions.map((question, qIndex) => (
            <Button
              key={qIndex}
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto w-full py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 whitespace-normal break-words"
              onClick={() => selectQuestion(question)}
            >
              <span className="text-left">{question}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

QuestionCategorySection.displayName = "QuestionCategorySection";

const FrequentQuestions: React.FC<FrequentQuestionsProps> = ({
  onSelectQuestion,
  onOpenChange,
  isOpen,
}) => {
  const handleQuestionClick = useCallback(
    (question: string) => onSelectQuestion(question),
    [onSelectQuestion]
  );

  return (
    <Collapsible
      className="flex flex-col w-full"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger
        className="w-full rounded-lg p-3 shadow-sm mb-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-between hover:shadow-md transition-shadow"
        aria-label={
          isOpen ? "Fechar perguntas frequentes" : "Abrir perguntas frequentes"
        }
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-blue-500" />
          <span className="font-medium">Perguntas Frequentes</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full overflow-hidden">
        <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800 mb-4">
          <ScrollArea className="max-h-48 min-h-48 pr-2 overflow-y-auto">
            <div className="space-y-6">
              {QUESTION_CATEGORIES.map((category, catIndex) => (
                <QuestionCategorySection
                  key={catIndex}
                  category={category}
                  onSelectQuestion={handleQuestionClick}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default memo(FrequentQuestions);
