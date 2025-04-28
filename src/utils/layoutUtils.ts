import { Position, Size } from "../types/common";
import { isMobileDevice } from "./common";

// Constants for layout calculations
const MOBILE_WIDTH_PERCENTAGE = 0.9;
const MOBILE_HEIGHT_PERCENTAGE = 0.7;
const MOBILE_BREAKPOINT = 768; // Pixel width threshold for mobile
const MOBILE_TOP_OFFSET_PERCENTAGE = 0.1; // Position at 10% from top for mobile
const DESKTOP_HORIZONTAL_DIVISOR = 5; // Controls horizontal position on desktop
const DESKTOP_VERTICAL_DIVISOR = 4; // Controls vertical position on desktop

/**
 * Calculates initial position and size of the chat window based on window dimensions
 * and preferred proportions, with special handling for mobile devices.
 *
 * @param windowWidth Current width of the window in pixels
 * @param windowHeight Current height of the window in pixels
 * @param minWidth Minimum allowed width for the chat window in pixels
 * @param minHeight Minimum allowed height for the chat window in pixels
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
  const isMobile = isMobileDevice() || windowWidth < MOBILE_BREAKPOINT;
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

  // Set position based on device type
  let position: Position;

  if (isMobile) {
    position = {
      x: Math.floor((windowWidth - width) / 2), // Center horizontally
      y: Math.floor(windowHeight * MOBILE_TOP_OFFSET_PERCENTAGE),
    };
  } else {
    position = {
      x: Math.floor((windowWidth - width) / DESKTOP_HORIZONTAL_DIVISOR),
      y: Math.floor((windowHeight - height) / DESKTOP_VERTICAL_DIVISOR),
    };
  }

  return { position, size: { width, height } };
};

/**
 * Calculates a centered position for an element
 *
 * @param elementWidth Width of the element to center
 * @param elementHeight Height of the element to center
 * @param containerWidth Width of the container
 * @param containerHeight Height of the container
 * @param verticalOffset Optional offset from perfect vertical center (positive moves down)
 * @returns Centered position coordinates
 */
export const calculateCenteredPosition = (
  elementWidth: number,
  elementHeight: number,
  containerWidth: number,
  containerHeight: number,
  verticalOffset = 0
): Position => {
  return {
    x: Math.floor((containerWidth - elementWidth) / 2),
    y: Math.floor((containerHeight - elementHeight) / 2) + verticalOffset,
  };
};

/**
 * Constrains position to ensure the element stays within the viewport
 *
 * @param position Current position coordinates
 * @param size Element size dimensions
 * @param windowWidth Window width in pixels
 * @param windowHeight Window height in pixels
 * @returns Constrained position that keeps the element in view
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
 * @param size Current size dimensions
 * @param minWidth Minimum width in pixels
 * @param minHeight Minimum height in pixels
 * @param maxWidth Maximum width in pixels
 * @param maxHeight Maximum height in pixels
 * @returns Constrained size within the specified boundaries
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
