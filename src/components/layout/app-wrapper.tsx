/**
 * AppWrapper Component
 *
 * Provides the necessary context providers for the application and sets up global error handling.
 * This component wraps the entire application with:
 * - WindowSizeProvider - For responsive design and window size tracking
 * - ChatProvider - For chat state and functionality
 *
 * It also sets up global error handling for uncaught exceptions and unhandled promise rejections.
 *
 * @param children - The application components to be wrapped
 */
"use client";

import React, { useEffect } from "react";
import { WindowSizeProvider } from "../../contexts/WindowSizeContext";
import { ChatProvider } from "../../contexts/ChatContext";

/**
 * AppWrapper provides the necessary context providers for the application.
 */
const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Application error:", event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return (
    <WindowSizeProvider>
      <ChatProvider>{children}</ChatProvider>
    </WindowSizeProvider>
  );
};

export default AppWrapper;
