"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  forcedTheme?: string
  themes?: string[]
}

/**
 * Theme provider component that wraps the next-themes ThemeProvider
 * It provides theme context to the entire application
 * 
 * @param children - React children components
 * @param props - Additional props for the ThemeProvider
 * @returns ThemeProvider component
 */
export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}