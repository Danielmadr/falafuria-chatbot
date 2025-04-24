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

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div>
      <Card className="w-[440px] pt-0">
        <CardHeader>
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
        <CardContent>
          <ScrollArea className=" h-[400px] border p-4 shadow-sm">
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex space-x-2 text-slate-600 text-sm mb-4"
                >
                  {message.role === "user" ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/iavatar_black.png" alt="AI" />
                      <AvatarFallback>Assistant</AvatarFallback>
                    </Avatar>
                  )}
                  <p className="leading-relaxed">
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

        <CardFooter>
          <form className="flex w-full" onSubmit={handleSubmit}>
            <Input
              placeholder="Digite uma mensagem"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" className="ml-3" variant="secondary">
              Enviar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
