import React, { useState } from "react";
import { Moon, Sun, Settings, TypeBold, Type } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useChat } from "../contexts/ChatContext";

interface SettingsDrawerProps {
  className?: string;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ className }) => {
  const { setTheme, theme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const { setMessageFontSize } = useChat();

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    setMessageFontSize(newSize);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={`p-2 h-8 w-8 rounded-full ${className}`}
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Theme</h3>
            <RadioGroup
              defaultValue={theme || "system"}
              onValueChange={(value) => setTheme(value)}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="theme-light"
                  className="sr-only"
                />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-gray-100 hover:border-gray-200 cursor-pointer data-[state=checked]:border-blue-500"
                  data-state={theme === "light" ? "checked" : "unchecked"}
                >
                  <Sun className="h-5 w-5 mb-1" />
                  <span className="text-xs">Light</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="dark"
                  id="theme-dark"
                  className="sr-only"
                />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-gray-100 hover:border-gray-200 cursor-pointer data-[state=checked]:border-blue-500"
                  data-state={theme === "dark" ? "checked" : "unchecked"}
                >
                  <Moon className="h-5 w-5 mb-1" />
                  <span className="text-xs">Dark</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="system"
                  id="theme-system"
                  className="sr-only"
                />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-2 hover:bg-gray-100 hover:border-gray-200 cursor-pointer data-[state=checked]:border-blue-500"
                  data-state={theme === "system" ? "checked" : "unchecked"}
                >
                  <div className="flex">
                    <Sun className="h-4 w-4" />
                    <Moon className="h-4 w-4" />
                  </div>
                  <span className="text-xs">System</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Message Font Size</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {fontSize}px
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Slider
                value={[fontSize]}
                min={12}
                max={20}
                step={1}
                onValueChange={handleFontSizeChange}
                className="flex-1"
              />
              <TypeBold className="h-4 w-4" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;