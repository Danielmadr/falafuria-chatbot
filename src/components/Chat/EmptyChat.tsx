/**
 * EmptyChat Component
 *
 * Displayed when there are no messages in the chat.
 * Provides guidance to the user on how to start a conversation.
 */
import React from "react";

/**
 * EmptyChat Component
 *
 * Shows a placeholder message when no chat messages are present.
 * Instructs the user on how to begin the conversation.
 *
 * @returns {JSX.Element} The empty state display
 */
const EmptyChat: React.FC = () => (
  <div
    className="flex items-center justify-center h-full text-gray-400 text-center p-4"
    role="status"
    aria-live="polite"
  >
    <p>
      Selecione uma pergunta frequente ou envie uma mensagem para começar a
      conversa.
    </p>
  </div>
);

export default React.memo(EmptyChat);
