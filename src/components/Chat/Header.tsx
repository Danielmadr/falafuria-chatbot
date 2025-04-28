/**
 * Header Component
 *
 * The draggable top section of the chat window with the logo and settings.
 */
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { GripHorizontal } from "lucide-react";
import SvgIcon from "../icons/LogoIcon";
import SettingsDrawer from "../settings/SettingsDrawer";

/**
 * Props for the ChatHeader component
 */
interface ChatHeaderProps {
  /** Handler for mouse down events to initiate dragging */
  onMouseDown: (e: React.MouseEvent) => void;
  /** Whether the chat is currently being dragged */
  isDragging: boolean;
}

/**
 * ChatHeader Component
 *
 * Displays the top header of the chat with a drag handle, logo, and settings button.
 * The entire header is draggable to move the chat window.
 *
 * @param {ChatHeaderProps} props - Component properties
 * @returns {JSX.Element} The rendered header component
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ onMouseDown, isDragging }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (e.target as HTMLDivElement).click();
    }
  };

  return (
    <CardHeader
      className={`pt-5 flex flex-row items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-b ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={onMouseDown}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Drag to move chat window"
      tabIndex={0}
    >
      <div className="flex items-center">
        <GripHorizontal className="h-5 w-5 text-gray-500 mr-2" />
      </div>
      <CardTitle className="flex items-center justify-center">
        <SvgIcon
          width={135}
          height={82}
          className="pointer-events-none"
          lightColor="#000000"
          darkColor="#ffffff"
          viewBox="0 0 1230 750"
        />
      </CardTitle>
      <div className="flex items-center">
        <SettingsDrawer className=" text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
      </div>
    </CardHeader>
  );
};

export default React.memo(ChatHeader);
