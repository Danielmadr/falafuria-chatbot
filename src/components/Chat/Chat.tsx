// components/Chat.tsx
"use client";

import { useEffect, useRef } from "react";
import ResizeHandle from "./ResizeHandle";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { Card } from "@/components/ui/card";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { useChat } from "../contexts/ChatContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import {
  calculateInitialPositionAndSize,
  constrainPositionToViewport,
  constrainSize,
} from "../utils/layoutUtils";

/**
 * Constants for sizing constraints - defined outside component to prevent recreation
 */
const MIN_WIDTH = 300;
const MIN_HEIGHT = 350;
const HEADER_HEIGHT = 100;
const FOOTER_HEIGHT = 70;
const DEFAULT_WIDTH_PERCENTAGE = 0.4; // 40% of screen width
const DEFAULT_HEIGHT_PERCENTAGE = 0.8; // 80% of screen height

/**
 * Chat component is the main container for the chat interface.
 */
const Chat: React.FC = () => {
  // Get chat state from context
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
    setError
  } = useChat();

  // Get window dimensions from context
  const { windowSize } = useWindowSize();

  // References
  const cardRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Effect to handle initial positioning and window resize
  useEffect(() => {
    // Skip if window dimensions aren't available yet
    if (windowSize.width <= 0 || windowSize.height <= 0) return;

    // Set initial position/size if not already set
    if (!isInitializedRef.current) {
      const { position: initialPosition, size: initialSize } =
        calculateInitialPositionAndSize(
          windowSize.width,
          windowSize.height,
          MIN_WIDTH,
          MIN_HEIGHT,
          DEFAULT_WIDTH_PERCENTAGE,
          DEFAULT_HEIGHT_PERCENTAGE
        );
      setPosition(initialPosition);
      setSize(initialSize);
      isInitializedRef.current = true;
      return; // Exit early after initialization
    }
    
    // For subsequent resize events, constrain both size and position
    const constrainedSize = constrainSize(
      size,
      MIN_WIDTH,
      MIN_HEIGHT,
      windowSize.width,
      windowSize.height
    );
    
    if (constrainedSize.width !== size.width || constrainedSize.height !== size.height) {
      setSize(constrainedSize);
    }

    const constrainedPosition = constrainPositionToViewport(
      position,
      constrainedSize,
      windowSize.width,
      windowSize.height
    );

    if (constrainedPosition.x !== position.x || constrainedPosition.y !== position.y) {
      setPosition(constrainedPosition);
    }
  }, [windowSize.width, windowSize.height, position, size, setPosition, setSize]);

  // Define drag and resize constraints based on window size
  const dragConstraints = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, windowSize.width - size.width),
    maxY: Math.max(0, windowSize.height - size.height),
  };

  // Setup drag and resize hooks with boundary constraints
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

  // Handle closing the error alert
  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <div
      className="absolute max-w-full max-h-full"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transition: 'width 0.1s, height 0.1s' // Smooth transition for resize
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