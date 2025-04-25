import React from "react";
import Image from "next/image";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ChatHeaderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMouseDown, isDragging }) => {
  return (
    <CardHeader
      className={`${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseDown={onMouseDown}
      role="button"
      aria-label="Drag to move chat window"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Simulate a mouse down event for keyboard accessibility
          onMouseDown(e as unknown as React.MouseEvent);
        }
      }}
    >
      <CardTitle className="items-center flex justify-center">
        <Image
          src="/logo_black.png"
          alt="FurAi Chat Logo"
          width={80}
          height={70}
          className="w-30 h-auto"
          priority
        />
      </CardTitle>
    </CardHeader>
  );
};

export default React.memo(ChatHeader);