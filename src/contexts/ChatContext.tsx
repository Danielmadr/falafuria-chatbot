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

/**
 * UI state interface containing properties related to the chat UI appearance and positioning
 */
interface UIState {
  faqsOpen: boolean; // Whether the FAQs panel is open
  messageFontSize: number; // Font size for chat messages
  position: Position; // Position of the chat window
  size: Size; // Size of the chat window
}

/**
 * Error state interface for tracking errors and their timestamps
 */
interface ErrorState {
  message: string | null; // Error message to display
  timestamp: number | null; // When the error occurred (for auto-dismissal)
}

/**
 * Interface defining all properties and methods available in the chat context
 */
interface ChatContextType {
  // Chat state
  messages: Message[]; // All messages in the conversation
  input: string; // Current input value
  isLoading: boolean; // Whether a message is being processed

  // Chat actions
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handle changes to input field
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Submit a new message
  setInput: (value: string) => void; // Directly set input value
  selectQuestion: (question: string) => void; // Select a predefined question
  resetChat: () => void; // Reset the chat to initial state

  // UI state and actions
  messageFontSize: number; // Current message font size
  setMessageFontSize: (size: number) => void; // Update font size
  faqsOpen: boolean; // Whether FAQs panel is open
  setFaqsOpen: (isOpen: boolean) => void; // Toggle FAQs panel
  position: Position; // Current chat window position
  setPosition: React.Dispatch<React.SetStateAction<Position>>; // Update position
  size: Size; // Current chat window size
  setSize: React.Dispatch<React.SetStateAction<Size>>; // Update size
  formRef: React.RefObject<HTMLFormElement | null>; // Reference to the form element

  // Error handling
  error: string | null; // Current error message (if any)
  setError: (message: string | null) => void; // Set an error message
  dismissError: () => void; // Dismiss the current error
}

// Create context with null default (will be checked in useChat hook)
const ChatContext = createContext<ChatContextType | null>(null);

/**
 * Action types for the UI state reducer
 */
type UIAction =
  | { type: "SET_FAQS_OPEN"; payload: boolean }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_POSITION"; payload: Position }
  | { type: "SET_SIZE"; payload: Size };

/**
 * Reducer function for UI state management
 *
 * @param state - Current UI state
 * @param action - Action to perform
 * @returns Updated UI state
 */
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

/**
 * Provider component that makes chat functionality available to the component tree
 *
 * @param children - Child components that will have access to the context
 */
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

  /**
   * Enhanced input handler that also clears errors on input change
   *
   * @param event - Input change event
   */
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

  /**
   * Enhanced submit handler with input validation
   *
   * @param event - Form submit event
   */
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

  /**
   * Set input with validation
   *
   * @param value - New input value
   */
  const setInput = useCallback(
    (value: string) => {
      baseSetInput(value);
    },
    [baseSetInput]
  );

  /**
   * Helper to select a predefined question and trigger form submission
   *
   * @param question - The question text to be set as input
   */
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

  /**
   * Reset chat functionality - clears input, errors, and reloads the chat
   */
  const resetChat = useCallback(() => {
    baseSetInput("");
    setErrorState({ message: null, timestamp: null });
    if (reload) {
      reload();
    }
  }, [baseSetInput, reload]);

  /**
   * Detects errors in assistant messages by looking for error patterns
   */
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

  /**
   * Auto-dismiss errors after 8 seconds
   */
  useEffect(() => {
    if (error.timestamp) {
      const timer = setTimeout(() => {
        setErrorState({ message: null, timestamp: null });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [error.timestamp]);

  /**
   * Toggle FAQ panel visibility
   *
   * @param isOpen - Whether the FAQs panel should be open
   */
  const setFaqsOpen = useCallback((isOpen: boolean) => {
    dispatchUI({ type: "SET_FAQS_OPEN", payload: isOpen });
  }, []);

  /**
   * Set the font size for chat messages
   *
   * @param size - Font size in pixels
   */
  const setMessageFontSize = useCallback((size: number) => {
    dispatchUI({ type: "SET_FONT_SIZE", payload: size });
  }, []);

  /**
   * Update the position of the chat window
   *
   * @param pos - New position or function to calculate new position
   */
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

  /**
   * Update the size of the chat window
   *
   * @param size - New size or function to calculate new size
   */
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

  /**
   * Set an error message
   *
   * @param message - The error message or null to clear
   */
  const setError = useCallback((message: string | null) => {
    setErrorState({
      message,
      timestamp: message ? Date.now() : null,
    });
  }, []);

  /**
   * Dismiss the current error
   */
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

/**
 * Custom hook for accessing the chat context
 *
 * @returns The chat context object
 * @throws Error if used outside of a ChatProvider
 */
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
