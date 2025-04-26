"use client";

import React from 'react';
import { WindowSizeProvider } from "./contexts/WindowSizeContext";
import { ChatProvider } from "./contexts/ChatContext";

/**
 * AppWrapper provides the necessary context providers for the application.
 * This ensures that all components have access to shared state.
 */
const AppWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <WindowSizeProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </WindowSizeProvider>
  );
};

export default AppWrapper;