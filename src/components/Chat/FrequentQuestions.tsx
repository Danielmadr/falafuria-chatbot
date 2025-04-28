/**
 * FrequentQuestions Component
 *
 * A collapsible section that displays categorized frequently asked questions.
 */
import React, { memo } from "react";
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

/**
 * Props for the FrequentQuestions component
 */
interface FrequentQuestionsProps {
  /** Callback for when a question is selected */
  onSelectQuestion: (question: string) => void;
  /** Callback for when the open state changes */
  onOpenChange: (isOpen: boolean) => void;
  /** Whether the component is expanded */
  isOpen: boolean;
}

/**
 * QuestionCategorySection Component
 *
 * Displays a category of questions with a title and clickable question buttons.
 *
 * @param {Object} props - Component properties
 * @param {QuestionCategory} props.category - The category data to display
 * @param {Function} props.onSelectQuestion - Callback for question selection
 * @returns {JSX.Element} The rendered category section
 */
const QuestionCategorySection = memo(
  ({
    category,
    onSelectQuestion,
  }: {
    category: QuestionCategory;
    onSelectQuestion: (question: string) => void;
  }) => {
    return (
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2 border-b pb-1">
          {category.title}
        </h3>
        <div className="space-y-1">
          {category.questions.map((question) => (
            <Button
              key={question}
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto w-full py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 whitespace-normal break-words"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

QuestionCategorySection.displayName = "QuestionCategorySection";

/**
 * FrequentQuestions Component
 *
 * A collapsible panel that shows categorized FAQ questions that users can select.
 * When expanded, displays scrollable question categories with clickable questions.
 *
 * @param {FrequentQuestionsProps} props - Component properties
 * @returns {JSX.Element} The rendered FAQs component
 */
const FrequentQuestions: React.FC<FrequentQuestionsProps> = ({
  onSelectQuestion,
  onOpenChange,
  isOpen,
}) => {
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
              {QUESTION_CATEGORIES.map((category) => (
                <QuestionCategorySection
                  key={category.title}
                  category={category}
                  onSelectQuestion={onSelectQuestion}
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
