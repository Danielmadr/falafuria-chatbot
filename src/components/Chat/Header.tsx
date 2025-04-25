import React from "react";
import Image from "next/image";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { GripHorizontal } from "lucide-react";

interface ChatHeaderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMouseDown, isDragging }) => {
  return (
    <CardHeader
      className={`pt-4 pb-0 flex flex-row items-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-b ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={onMouseDown}
      role="button"
      aria-label="Drag to move chat window"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onMouseDown(e as unknown as React.MouseEvent);
        }
      }}
    >
      <GripHorizontal className="h-5 w-5 text-gray-500 mr-2" />
      <CardTitle className="flex items-center justify-center w-full">
        <Image
          src="/logo_black.png"
          alt="FurAi Chat Logo"
          width={80}
          height={70}
          className="w-24 h-auto pointer-events-none"
          priority
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />
      </CardTitle>
    </CardHeader>
  );
};

export default React.memo(ChatHeader);