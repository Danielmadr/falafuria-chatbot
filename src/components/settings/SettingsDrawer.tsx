/**
 * SettingsDrawer Component
 *
 * A slide-out drawer that provides application settings controls including:
 * - Theme switching (light, dark, system)
 * - Font size adjustment
 *
 * The component uses the useTheme hook from next-themes for theme management
 * and the useChat context for font size preferences.
 *
 * @param className - Optional CSS class to apply to the trigger button
 */
import React from "react";
import { Moon, Sun, Settings, Type } from "lucide-react";
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
import { useChat } from "../../contexts/ChatContext";

interface SettingsDrawerProps {
  className?: string;
}

const labelBaseClass = `
  flex flex-col items-center justify-between rounded-md border-2 border-muted
  bg-white dark:bg-gray-800 p-2 hover:bg-gray-100 dark:hover:bg-gray-700
  hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer
  data-[state=checked]:border-blue-500
`;

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ className }) => {
  const { setTheme, theme } = useTheme();
  const { setMessageFontSize, messageFontSize } = useChat();

  /**
   * Updates the application theme when the user selects a different option
   * @param value - The selected theme value ("light", "dark", or "system")
   */
  const handleThemeChange = (value: string) => {
    setTheme(value);
  };
  
  /**
   * Updates the message font size when the slider is adjusted
   * @param value - Array containing the single font size value from the slider
   */
  const handleFontSizeChange = (value: number[]) => {
    setMessageFontSize(value[0]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={`p-2 h-8 w-8 rounded-full ${className}`}
          aria-label="Abrir configurações"
        >
          <Settings className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72 px-3">
        <SheetHeader>
          <SheetTitle>Configurações</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Tema</h3>
            <RadioGroup
              defaultValue={theme || "system"}
              onValueChange={handleThemeChange}
              className="grid grid-cols-3 gap-2"
            >
              {["light", "dark", "system"].map((mode) => (
                <div key={mode}>
                  <RadioGroupItem
                    value={mode}
                    id={`theme-${mode}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`theme-${mode}`}
                    className={labelBaseClass}
                    data-state={theme === mode ? "checked" : "unchecked"}
                  >
                    {mode === "light" && (
                      <>
                        <Sun className="h-5 w-5 mb-1" />
                        <span className="text-xs">Claro</span>
                      </>
                    )}
                    {mode === "dark" && (
                      <>
                        <Moon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Escuro</span>
                      </>
                    )}
                    {mode === "system" && (
                      <>
                        <div className="flex">
                          <Sun className="h-4 w-4" />
                          <Moon className="h-4 w-4" />
                        </div>
                        <span className="text-xs">Sistema</span>
                      </>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Tamanho da Fonte</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {messageFontSize}px
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Slider
                value={[messageFontSize]}
                min={12}
                max={20}
                step={1}
                onValueChange={handleFontSizeChange}
                className="flex-1"
              />
              <Type className="h-4 w-4" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;
