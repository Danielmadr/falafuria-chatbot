/**
 * @module types/common
 * @description Common interfaces and types used throughout the application.
 * This module provides type definitions for positioning, sizing, constraints,
 * and other shared data structures.
 */

/**
 * Represents the x and y coordinates of an element in 2D space.
 * Used for element positioning on screen.
 *
 * @interface Position
 * @property {number} x - Horizontal position in pixels from the left edge
 * @property {number} y - Vertical position in pixels from the top edge
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Represents the dimensions of an element.
 *
 * @interface Size
 * @property {number} width - Width in pixels
 * @property {number} height - Height in pixels
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Represents the dimensions of the browser window or viewport.
 *
 * @interface WindowSize
 * @property {number} width - Window width in pixels
 * @property {number} height - Window height in pixels
 */
export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Defines the boundaries for dragging operations to keep elements
 * within a specific area.
 *
 * @interface DragConstraints
 * @property {number} minX - Minimum allowed X coordinate
 * @property {number} minY - Minimum allowed Y coordinate
 * @property {number} maxX - Maximum allowed X coordinate
 * @property {number} maxY - Maximum allowed Y coordinate
 */
export interface DragConstraints {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Defines the size boundaries for resizing operations.
 *
 * @interface ResizeConstraints
 * @property {number} minWidth - Minimum allowed width in pixels
 * @property {number} minHeight - Minimum allowed height in pixels
 * @property {number} [maxWidth] - Optional maximum allowed width in pixels
 * @property {number} [maxHeight] - Optional maximum allowed height in pixels
 */
export interface ResizeConstraints {
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Represents a message in the chat conversation.
 * (Note: This is provided by @ai-sdk/react, included here for reference)
 *
 * @interface ChatMessage
 * @property {string} id - Unique identifier for the message
 * @property {string} content - Text content of the message
 * @property {'user' | 'assistant'} role - Whether the message is from the user or AI assistant
 * @property {Date} [createdAt] - Optional timestamp when the message was created
 */
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt?: Date;
}

/**
 * Represents a group of related questions for FAQs or help sections.
 *
 * @interface QuestionCategory
 * @property {string} title - Category name or heading
 * @property {string[]} questions - List of questions in this category
 */
export interface QuestionCategory {
  title: string;
  questions: string[];
}
