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
import { useState, useRef, useEffect } from "react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 320, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  
  const cardRef = useRef(null);
  const scrollAreaRef = useRef(null);

  // Calculando altura dinâmica para a área de scroll
  const headerHeight = 100; // Altura aproximada do CardHeader
  const footerHeight = 70;  // Altura aproximada do CardFooter
  const scrollAreaHeight = Math.max(100, size.height - headerHeight - footerHeight);

  // Gerenciamento do arrasto
  const handleMouseDown = (e) => {
    if (e.target.classList.contains("resize-handle")) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Gerenciamento do redimensionamento
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  // Função que gerencia o movimento do mouse
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isResizing) {
      // Calcula novas dimensões com base no movimento do mouse
      const newWidth = Math.max(
        300,
        resizeStart.width + (e.clientX - resizeStart.x)
      );
      const newHeight = Math.max(
        350,
        resizeStart.height + (e.clientY - resizeStart.y)
      );

      setSize({
        width: newWidth,
        height: newHeight,
      });
    }
  };

  // Função para encerrar o arrasto ou redimensionamento
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Scroll para a última mensagem após redimensionamento ou adição de mensagem
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [size.height, messages.length]);

  // Adiciona e remove event listeners
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
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      ref={cardRef}
    >
      <Card className="w-full h-full relative flex flex-col overflow-hidden">
        <CardHeader className="select-none pb-2 flex-shrink-0">
          <CardTitle className="items-center flex justify-center">
            <Image
              src="/logo_black.png"
              alt="Logo"
              width={80}
              height={70}
              className="w-30 h-auto"
            />
          </CardTitle>
          {/* <CardDescription> alguma coisa</CardDescription> */}
        </CardHeader>
        
        <CardContent className="select-none flex-grow p-2 overflow-hidden">
          <ScrollArea 
            className="border p-4 shadow-sm rounded-md" 
            style={{ height: `${scrollAreaHeight}px` }}
            ref={scrollAreaRef}
          >
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex space-x-2 text-slate-600 text-sm mb-4"
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
                    <span className="block font-bold text-slate-700">
                      {message.role === "user" ? "User" : "FurAi"}
                    </span>
                    {message.content}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
        
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