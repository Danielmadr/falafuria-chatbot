/**
 * ThemeProvider Component
 *
 * Wraps the application with Next-Themes provider to enable theme management.
 * This component provides context for theme switching between light, dark, and system modes.
 *
 * @param children - React nodes to be wrapped by the theme provider
 * @param attribute - HTML attribute to apply to set the theme (defaults to "class")
 * @param defaultTheme - Initial theme to be applied (defaults to "system")
 * @param enableSystem - Whether to enable system theme detection (defaults to true)
 * @param props - Additional props passed to NextThemesProvider
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
