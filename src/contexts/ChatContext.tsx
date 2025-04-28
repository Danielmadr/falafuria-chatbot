import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useChat as useAIChat, Message } from "@ai-sdk/react";
import { Position, Size } from "../types/common";

// Group related UI state
interface UIState {
  faqsOpen: boolean;
  messageFontSize: number;
  position: Position;
  size: Size;
}

// Group related error state
interface ErrorState {
  message: string | null;
  timestamp: number | null;
}

interface ChatContextType {
  // Chat state
  messages: Message[];
  input: string;
  isLoading: boolean;

  // Chat actions
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setInput: (value: string) => void;
  selectQuestion: (question: string) => void;
  resetChat: () => void;

  // UI state and actions
  messageFontSize: number;
  setMessageFontSize: (size: number) => void;
  faqsOpen: boolean;
  setFaqsOpen: (isOpen: boolean) => void;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  formRef: React.RefObject<HTMLFormElement | null>; // Updated type definition

  // Error handling
  error: string | null;
  setError: (message: string | null) => void;
  dismissError: () => void;
}

// Create context with safe default values
const ChatContext = createContext<ChatContextType | null>(null);

// Action types for reducer
type UIAction =
  | { type: "SET_FAQS_OPEN"; payload: boolean }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_POSITION"; payload: Position }
  | { type: "SET_SIZE"; payload: Size };

// Reducer for UI state
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "SET_FAQS_OPEN":
      return { ...state, faqsOpen: action.payload };
    case "SET_FONT_SIZE":
      return { ...state, messageFontSize: action.payload };
    case "SET_POSITION":
      return { ...state, position: action.payload };
    case "SET_SIZE":
      return { ...state, size: action.payload };
    default:
      return state;
  }
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use AI SDK's chat functionality
  const {
    messages,
    input,
    handleInputChange: baseHandleInputChange,
    handleSubmit: baseHandleSubmit,
    isLoading,
    setInput: baseSetInput,
    reload,
  } = useAIChat();

  // Use reducer for UI state
  const [uiState, dispatchUI] = useReducer(uiReducer, {
    faqsOpen: false,
    messageFontSize: 16,
    position: { x: 0, y: 0 },
    size: { width: 500, height: 600 },
  });

  // Error state with timestamp for auto-dismissal
  const [error, setErrorState] = useState<ErrorState>({
    message: null,
    timestamp: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Enhanced input handler
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Clear errors on input change
      if (error.message) {
        setErrorState({ message: null, timestamp: null });
      }
      baseHandleInputChange(event);
    },
    [baseHandleInputChange, error.message]
  );

  // Enhanced submit handler with input validation
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (input.trim()) {
        // Clear any existing errors
        setErrorState({ message: null, timestamp: null });
        try {
          baseHandleSubmit(event);
        } catch {
          setErrorState({
            message:
              "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
            timestamp: Date.now(),
          });
        }
      }
    },
    [input, baseHandleSubmit]
  );

  // Set input with validation
  const setInput = useCallback(
    (value: string) => {
      baseSetInput(value);
    },
    [baseSetInput]
  );

  // Helper to select a predefined question and trigger form submission
  const selectQuestion = useCallback(
    (question: string) => {
      baseSetInput(question);
      dispatchUI({ type: "SET_FAQS_OPEN", payload: false });

      // Submit the form on the next tick to ensure the input is updated
      setTimeout(() => {
        if (formRef.current) {
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          formRef.current.dispatchEvent(submitEvent);
        }
      }, 0);
    },
    [baseSetInput]
  );

  // Reset chat functionality
  const resetChat = useCallback(() => {
    baseSetInput("");
    setErrorState({ message: null, timestamp: null });
    if (reload) {
      reload();
    }
  }, [baseSetInput, reload]);

  // Error detection in messages - more robust implementation
  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      // Check for common error patterns in a more robust way
      const errorIndicators = [
        "Error:",
        "Failed to",
        "Could not process",
        "Unable to complete",
        "Something went wrong",
      ];

      const hasError = errorIndicators.some((indicator) =>
        lastMessage.content.includes(indicator)
      );

      if (hasError) {
        setErrorState({
          message:
            "Ocorreu um erro na comunicação com o assistente. Por favor, tente novamente.",
          timestamp: Date.now(),
        });
      }
    }
  }, [messages]);

  // Auto-dismiss errors after 8 seconds
  useEffect(() => {
    if (error.timestamp) {
      const timer = setTimeout(() => {
        setErrorState({ message: null, timestamp: null });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [error.timestamp]);

  // UI state setters
  const setFaqsOpen = useCallback((isOpen: boolean) => {
    dispatchUI({ type: "SET_FAQS_OPEN", payload: isOpen });
  }, []);

  const setMessageFontSize = useCallback((size: number) => {
    dispatchUI({ type: "SET_FONT_SIZE", payload: size });
  }, []);

  const setPosition = useCallback(
    (pos: Position | ((prev: Position) => Position)) => {
      if (typeof pos === "function") {
        dispatchUI({
          type: "SET_POSITION",
          payload: pos(uiState.position),
        });
      } else {
        dispatchUI({ type: "SET_POSITION", payload: pos });
      }
    },
    [uiState.position]
  );

  const setSize = useCallback(
    (size: Size | ((prev: Size) => Size)) => {
      if (typeof size === "function") {
        dispatchUI({
          type: "SET_SIZE",
          payload: size(uiState.size),
        });
      } else {
        dispatchUI({ type: "SET_SIZE", payload: size });
      }
    },
    [uiState.size]
  );

  // Error actions
  const setError = useCallback((message: string | null) => {
    setErrorState({
      message,
      timestamp: message ? Date.now() : null,
    });
  }, []);

  const dismissError = useCallback(() => {
    setErrorState({ message: null, timestamp: null });
  }, []);

  // Provide all values to consuming components
  return (
    <ChatContext.Provider
      value={{
        // Chat state
        messages,
        input,
        isLoading,

        // Chat actions
        handleInputChange,
        handleSubmit,
        setInput,
        selectQuestion,
        resetChat,

        // UI state (destructured from reducer state)
        faqsOpen: uiState.faqsOpen,
        messageFontSize: uiState.messageFontSize,
        position: uiState.position,
        size: uiState.size,

        // UI actions
        setFaqsOpen,
        setMessageFontSize,
        setPosition,
        setSize,
        formRef,

        // Error handling
        error: error.message,
        setError,
        dismissError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
