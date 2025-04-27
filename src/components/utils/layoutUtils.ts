import { Position, Size } from "../../types/common";
import { isMobileDevice } from "./common";

// Constants for layout calculations
const MOBILE_WIDTH_PERCENTAGE = 0.9;
const MOBILE_HEIGHT_PERCENTAGE = 0.7;

/**
 * Calculates initial position and size of the chat window based on window dimensions
 * and preferred proportions, with special handling for mobile devices.
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
  // Adjust percentages for mobile devices
  const isMobile = isMobileDevice() || windowWidth < 768;
  const effectiveWidthPercentage = isMobile
    ? MOBILE_WIDTH_PERCENTAGE
    : widthPercentage;
  const effectiveHeightPercentage = isMobile
    ? MOBILE_HEIGHT_PERCENTAGE
    : heightPercentage;

  const width = Math.max(
    minWidth,
    Math.floor(windowWidth * effectiveWidthPercentage)
  );
  const height = Math.max(
    minHeight,
    Math.floor(windowHeight * effectiveHeightPercentage)
  );

  // Center the chat window with adjustments for mobile
  let x: number, y: number;

  if (isMobile) {
    // Mobile positioning - center horizontally, slightly higher vertically
    x = Math.floor((windowWidth - width) / 2);
    y = Math.floor(windowHeight * 0.1); // Position at 10% from top
  } else {
    // Desktop positioning - slightly off-center
    x = Math.floor((windowWidth - width) / 5); // Position slightly to the left
    y = Math.floor((windowHeight - height) / 4); // Position slightly above center
  }

  return { position: { x, y }, size: { width, height } };
};

/**
 * Constrains position to ensure the element stays within the viewport
 *
 * @param position Current position
 * @param size Element size
 * @param windowWidth Window width
 * @param windowHeight Window height
 * @returns Constrained position
 */
export const constrainPositionToViewport = (
  position: Position,
  size: Size,
  windowWidth: number,
  windowHeight: number
): Position => {
  return {
    x: Math.max(0, Math.min(position.x, windowWidth - size.width)),
    y: Math.max(0, Math.min(position.y, windowHeight - size.height)),
  };
};

/**
 * Constrains size to ensure the element doesn't exceed min/max boundaries
 *
 * @param size Current size
 * @param minWidth Minimum width
 * @param minHeight Minimum height
 * @param maxWidth Maximum width
 * @param maxHeight Maximum height
 * @returns Constrained size
 */
export const constrainSize = (
  size: Size,
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number
): Size => {
  return {
    width: Math.max(minWidth, Math.min(size.width, maxWidth)),
    height: Math.max(minHeight, Math.min(size.height, maxHeight)),
  };
};
