// components/EmptyChat.tsx
import React from "react";

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
