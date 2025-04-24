"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "./ui/scroll-area";
import { useState, useEffect, useCallback, useRef } from "react";

export function Chat() {
  // Estados para gerenciar posição, tamanho e comportamento do chat
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Posição inicial do chat
  const [size, setSize] = useState({ width: 320, height: 500 }); // Tamanho inicial do chat
  const [isDragging, setIsDragging] = useState(false); // Flag para indicar se o chat está sendo arrastado
  const [isResizing, setIsResizing] = useState(false); // Flag para indicar se o chat está sendo redimensionado
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Posição inicial do mouse ao arrastar
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }); // Posição inicial do mouse ao redimensionar
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // Dimensões da janela do navegador

  // Referências para o card e a área de scroll
  const cardRef = useRef(null);
  const scrollAreaRef = useRef(null);

  // Atualiza as dimensões da janela no lado do cliente
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize(); // Atualiza ao montar o componente
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  // Calcula a altura dinâmica para a área de scroll
  const headerHeight = 100; // Altura aproximada do cabeçalho
  const footerHeight = 70; // Altura aproximada do rodapé
  const scrollAreaHeight = Math.max(
    100,
    size.height - headerHeight - footerHeight
  );

  // Função para iniciar o arrasto do chat
  const handleMouseDown = useCallback(
    (e) => {
      if (e.target.classList.contains("resize-handle")) return; // Ignora o evento se for na alça de redimensionamento

      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  // Função para iniciar o redimensionamento do chat
  const handleResizeMouseDown = (e) => {
    e.stopPropagation(); // Evita que o evento afete outros elementos
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  // Função que gerencia o movimento do mouse para arrastar ou redimensionar
  const handleMouseMove = (e) => {
    if (isDragging) {
      // Calcula a nova posição do chat
      const newX = Math.max(
        0,
        Math.min(windowSize.width - size.width, e.clientX - dragStart.x)
      );
      const newY = Math.max(
        0,
        Math.min(windowSize.height - size.height, e.clientY - dragStart.y)
      );

      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      // Calcula o novo tamanho do chat
      const newWidth = Math.max(
        300,
        resizeStart.width + (e.clientX - resizeStart.x)
      );
      const newHeight = Math.max(
        350,
        resizeStart.height + (e.clientY - resizeStart.y)
      );

      setSize({ width: newWidth, height: newHeight });
    }
  };

  // Função para encerrar o arrasto ou redimensionamento
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Adiciona e remove event listeners para o movimento do mouse
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      className="absolute max-w-full max-h-full"
      style={{
        // Define a posição e o tamanho do chat dinamicamente
        left: position.x,
        top: position.y,
        width: Math.min(size.width, windowSize.width),
        height: Math.min(size.height, windowSize.height),
      }}
      ref={cardRef}
    >
      <Card className="w-full h-full relative flex flex-col overflow-hidden">
        {/* Cabeçalho do chat - permite arrastar */}
        <CardHeader
          className="select-none pb-2 flex-shrink-0 cursor-grab"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <CardTitle className="items-center flex justify-center">
            <Image
              src="/logo_black.png"
              alt="Logo"
              width={80}
              height={70}
              className="w-30 h-auto"
            />
          </CardTitle>
        </CardHeader>

        {/* Conteúdo do chat - exibe as mensagens */}
        <CardContent
          className="select-none flex-grow p-2 overflow-y-auto"
          style={{ height: `${scrollAreaHeight}px` }}
        >
          <ScrollArea
            className="border p-4 shadow-sm rounded-md"
            ref={scrollAreaRef}
          >
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`flex space-x-2 text-sm mb-4 ${
                    message.role === "user"
                      ? "text-slate-600"
                      : "text-slate-700 bg-gray-100 p-2 rounded-md shadow-sm"
                  }`}
                >
                  {message.role === "user" ? (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src="/iavatar_black.png" alt="AI" />
                      <AvatarFallback>Assistant</AvatarFallback>
                    </Avatar>
                  )}
                  <p className="leading-relaxed break-words">
                    <span className="block font-bold">
                      {message.role === "user" ? "User" : "FurAi"}
                    </span>
                    {message.content}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>

        {/* Rodapé do chat - formulário para enviar mensagens */}
        <CardFooter className="select-none mt-auto flex-shrink-0 p-3 bg-card">
          <form className="flex w-full" onSubmit={handleSubmit}>
            <Input
              placeholder="Digite uma mensagem"
              value={input}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button type="submit" className="ml-3" variant="secondary">
              Enviar
            </Button>
          </form>
        </CardFooter>

        {/* Alça de redimensionamento */}
        <div
          className="resize-handle absolute bottom-0 right-0 w-6 h-6 bg-gray-300 opacity-70 rounded-bl cursor-se-resize flex items-center justify-center"
          onMouseDown={handleResizeMouseDown}
          aria-label="Redimensionar"
          role="button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M0 10L10 10L10 0"
              fill="none"
              stroke="#444"
              strokeWidth="1"
            />
            <path d="M0 6L6 0" fill="none" stroke="#444" strokeWidth="1" />
            <path d="M0 3L3 0" fill="none" stroke="#444" strokeWidth="1" />
          </svg>
        </div>
      </Card>
    </div>
  );
}
