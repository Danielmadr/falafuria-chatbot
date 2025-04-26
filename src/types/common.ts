/**
 * Common interfaces and types used throughout the application
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
 * DragConstraints interface defines the boundaries for dragging operations
 */
export interface DragConstraints {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * ResizeConstraints interface defines boundaries for resizing operations
 */
export interface ResizeConstraints {
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * ChatMessage interface represents a message in the chat conversation
 * (Note: This is provided by @ai-sdk/react, included here for reference)
 */
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt?: Date;
}

/**
 * QuestionCategory represents a group of related questions for FAQs
 */
export interface QuestionCategory {
  title: string;
  questions: string[];
}