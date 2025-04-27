import React, { memo, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";
import AvatarIcon from "../icons/AvatarIcon";
import { AvatarImage } from "@radix-ui/react-avatar";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Detectar o tema atual usando o atributo data-theme ou classe dark
  useEffect(() => {
    // Função para verificar se o tema é escuro
    const checkDarkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    // Verificar o tema inicialmente
    checkDarkTheme();

    // Configurar um observador para detectar mudanças no tema
    const observer = new MutationObserver(checkDarkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Limpar o observador quando o componente for desmontado
    return () => observer.disconnect();
  }, []);

  // Escolher a imagem do avatar com base no tema
  const userAvatarSrc = isDarkTheme ? "userAvatar-White.png" : "userAvatar-Black.png";

  return (
    <div
      className={`flex space-x-2 text-sm mb-4 ${
        isUser
          ? "text-slate-600 dark:text-slate-300"
          : "text-slate-700 dark:text-slate-200 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
      }`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0 p-1">
        {isUser ? (
          // User avatar - image with fallback
          <>
            <AvatarImage 
              src={userAvatarSrc} 
              alt="User avatar" 
              className="h-full w-full object-cover" 
            />
            <AvatarFallback className="bg-blue-500 text-white">
              User
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarIcon
              lightColor="#000000"
              darkColor="#ffffff"
              className="pointer-events-none"
              viewBox="0 0 750.00000 750.00000"
            />
          </>
        )}
      </Avatar>
      <div className="flex-1">
        <p className="font-bold mb-1 dark:text-white">
          {isUser ? "User" : "FurAi"}
        </p>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;