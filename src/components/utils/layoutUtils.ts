import { Position, Size } from '../../types/common';

/**
 * Calculates initial position and size of the chat window based on window dimensions
 * and preferred proportions.
 * 
 * @param windowWidth Current width of the window
 * @param windowHeight Current height of the window
 * @param minWidth Minimum allowed width for the chat window
 * @param minHeight Minimum allowed height for the chat window
 * @param widthPercentage Percentage of window width to use (0-1)
 * @param heightPercentage Percentage of window height to use (0-1)
 * @returns Object containing calculated position and size
 */
export const calculateInitialPositionAndSize = (
  windowWidth: number, 
  windowHeight: number,
  minWidth: number,
  minHeight: number,
  widthPercentage: number,
  heightPercentage: number
): { position: Position; size: Size } => {
  const width = Math.max(minWidth, Math.floor(windowWidth * widthPercentage));
  const height = Math.max(minHeight, Math.floor(windowHeight * heightPercentage));
  
  // Center the chat window with slight offset
  const x = Math.floor((windowWidth - width) / 5); // Position slightly to the left of center
  const y = Math.floor((windowHeight - height) / 4); // Position slightly above center
  
  return { position: { x, y }, size: { width, height } };
};

/**
 * Ensures the chat window stays within the viewport boundaries
 * 
 * @param position Current position of the chat window
 * @param size Current size of the chat window
 * @param windowWidth Current width of the viewport
 * @param windowHeight Current height of the viewport
 * @returns Adjusted position within viewport boundaries
 */
export const constrainPositionToViewport = (
  position: Position,
  size: Size,
  windowWidth: number,
  windowHeight: number
): Position => {
  return {
    x: Math.min(Math.max(0, position.x), Math.max(0, windowWidth - size.width)),
    y: Math.min(Math.max(0, position.y), Math.max(0, windowHeight - size.height))
  };
};

/**
 * Constrains the size of the chat window to stay within viewport boundaries
 * and respect minimum dimensions
 * 
 * @param size Current size of the chat window
 * @param minWidth Minimum allowed width
 * @param minHeight Minimum allowed height
 * @param maxWidth Maximum allowed width
 * @param maxHeight Maximum allowed height
 * @returns Adjusted size within constraints
 */
export const constrainSize = (
  size: Size,
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number
): Size => {
  return {
    width: Math.min(Math.max(minWidth, size.width), maxWidth),
    height: Math.min(Math.max(minHeight, size.height), maxHeight)
  };
};