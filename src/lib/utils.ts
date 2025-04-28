/**
 * @module utils
 * @description Core utility functions for CSS class handling using clsx and tailwind-merge.
 * This module provides tools for merging and managing CSS classes in a React application
 * with Tailwind CSS.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single className string using clsx and tailwind-merge.
 * This function handles class name conflicts according to Tailwind's precedence rules.
 *
 * @param {...ClassValue[]} inputs - Any number of class values (strings, objects, arrays)
 * @returns {string} A merged className string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
