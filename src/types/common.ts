/**
 * Common interfaces used throughout the application
 */

/**
 * Position interface represents the x and y coordinates of an element
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Size interface represents the width and height of an element
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * WindowSize interface represents the width and height of the browser window
 */
export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Message from the chat conversation
 */
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt?: Date;
}