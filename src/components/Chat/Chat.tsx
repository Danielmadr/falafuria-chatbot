"use client";

import { useRef, useCallback } from "react";
import { Card } from "../ui/card";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import ResizeHandle from "./ResizeHandle";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, X } from "lucide-react";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { useChat } from "../contexts/ChatContext";
import { useInitialPositionAndResize } from "../hooks/useInitialPositionAndResize";
import { MIN_WIDTH, MIN_HEIGHT, HEADER_HEIGHT, FOOTER_HEIGHT } from "../constants/layout";

const Chat: React.FC = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    formRef,
    position,
    setPosition,
    size,
    setSize,
    faqsOpen,
    setFaqsOpen,
    error,
    setError,
  } = useChat();

  const { windowSize } = useWindowSize();
  const cardRef = useRef<HTMLDivElement>(null);

  useInitialPositionAndResize({
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    size,
    setSize,
    position,
    setPosition,
  });

  const dragConstraints = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, windowSize.width - size.width),
    maxY: Math.max(0, windowSize.height - size.height),
  };

  const { isDragging, handleDragStart } = useDrag({
    position,
    setPosition,
    windowSize,
    size,
    constraints: dragConstraints,
  });

  const { isResizing, handleResizeStart } = useResize({
    size,
    setSize,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    maxWidth: windowSize.width - position.x,
    maxHeight: windowSize.height - position.y,
  });

  const handleErrorClose = useCallback(() => setError(null), [setError]);

  return (
    <div
      className="absolute max-w-full max-h-full"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transition: "width 0.1s, height 0.1s",
      }}
      ref={cardRef}
      role="dialog"
      aria-label="Chat interface"
    >
      <Card className="w-full h-full relative flex flex-col overflow-hidden shadow-lg p-0 gap-0">
        <Header onMouseDown={handleDragStart} isDragging={isDragging} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {error && (
            <Alert variant="destructive" className="mx-4 mt-2 mb-0">
              <AlertCircle className="h-4 w-4" />
              <div className="flex-1">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
              <button
                onClick={handleErrorClose}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-destructive/10"
                aria-label="Fechar alerta de erro"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          )}
          <Content
            messages={messages}
            size={size}
            headerHeight={HEADER_HEIGHT}
            footerHeight={FOOTER_HEIGHT}
            onFAQsOpenChange={setFaqsOpen}
            faqsOpen={faqsOpen}
          />
        </div>
        <Footer
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          ref={formRef}
        />
        <ResizeHandle
          onMouseDown={handleResizeStart}
          isResizing={isResizing}
          faqsOpen={faqsOpen}
        />
      </Card>
    </div>
  );
};

export default Chat;
