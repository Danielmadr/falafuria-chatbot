"use client";

import React, { useEffect } from "react";
import { WindowSizeProvider } from "./contexts/WindowSizeContext";
import { ChatProvider } from "./contexts/ChatContext";

/**
 * AppWrapper provides the necessary context providers for the application.
 * This ensures that all components have access to shared state.
 */
const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Adding error boundary to catch and log errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Application error:", event.error);
      // Could implement error reporting service here
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <WindowSizeProvider>
      <ChatProvider>{children}</ChatProvider>
    </WindowSizeProvider>
  );
};

export default AppWrapper;
