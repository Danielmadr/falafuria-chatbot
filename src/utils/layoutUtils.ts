/**
 * layoutUtils.ts
 *
 * This module provides utility functions for calculating and managing
 * UI element layouts, specifically for positioning and sizing elements
 * responsively based on the viewport dimensions and device type.
 */

import { Position, Size } from "../types/common";
import { isMobileDevice } from "./common";

/**
 * Layout configuration constants
 */

/** Percentage of window width to use on mobile devices */
const MOBILE_WIDTH_PERCENTAGE = 0.9;

/** Percentage of window height to use on mobile devices */
const MOBILE_HEIGHT_PERCENTAGE = 0.7;

/** Viewport width threshold (in pixels) below which layout is treated as mobile */
const MOBILE_BREAKPOINT = 768;

/** Vertical position offset as a percentage of window height for mobile views */
const MOBILE_TOP_OFFSET_PERCENTAGE = 0.1;

/** Divisor that controls horizontal positioning on desktop views */
const DESKTOP_HORIZONTAL_DIVISOR = 5;

/** Divisor that controls vertical positioning on desktop views */
const DESKTOP_VERTICAL_DIVISOR = 4;

/**
 * Calculates the initial position and size of a UI element based on the current viewport
 * dimensions and configured proportions. Applies special handling for mobile devices.
 *
 * The function ensures responsive layout behavior by:
 * - Using different proportions for mobile vs desktop views
 * - Enforcing minimum dimensions
 * - Positioning elements appropriately based on device type
 *
 * @param windowWidth - Current width of the viewport in pixels
 * @param windowHeight - Current height of the viewport in pixels
 * @param minWidth - Minimum allowed width for the element in pixels
 * @param minHeight - Minimum allowed height for the element in pixels
 * @param widthPercentage - Desired width as a percentage of window width (0-1)
 * @param heightPercentage - Desired height as a percentage of window height (0-1)
 * @returns An object containing the calculated position and size
 */
export const calculateInitialPositionAndSize = (
  windowWidth: number,
  windowHeight: number,
  minWidth: number,
  minHeight: number,
  widthPercentage: number,
  heightPercentage: number
): { position: Position; size: Size } => {
  // Determine if we should use mobile layout based on device detection or viewport width
  const isMobile = isMobileDevice() || windowWidth < MOBILE_BREAKPOINT;

  // Adjust proportions based on device type
  const effectiveWidthPercentage = isMobile
    ? MOBILE_WIDTH_PERCENTAGE
    : widthPercentage;
  const effectiveHeightPercentage = isMobile
    ? MOBILE_HEIGHT_PERCENTAGE
    : heightPercentage;

  // Calculate dimensions while respecting minimum constraints
  const width = Math.max(
    minWidth,
    Math.floor(windowWidth * effectiveWidthPercentage)
  );
  const height = Math.max(
    minHeight,
    Math.floor(windowHeight * effectiveHeightPercentage)
  );

  // Calculate position based on device type
  let position: Position;

  if (isMobile) {
    // For mobile: center horizontally and position at configured top offset
    position = {
      x: Math.floor((windowWidth - width) / 2),
      y: Math.floor(windowHeight * MOBILE_TOP_OFFSET_PERCENTAGE),
    };
  } else {
    // For desktop: use divisors to create offset positioning
    position = {
      x: Math.floor((windowWidth - width) / DESKTOP_HORIZONTAL_DIVISOR),
      y: Math.floor((windowHeight - height) / DESKTOP_VERTICAL_DIVISOR),
    };
  }

  return { position, size: { width, height } };
};

/**
 * Calculates a position that centers an element within its container.
 *
 * This is useful for modal dialogs, tooltips, and other UI elements that
 * should appear centered relative to their parent or the viewport.
 *
 * @param elementWidth - Width of the element to be centered in pixels
 * @param elementHeight - Height of the element to be centered in pixels
 * @param containerWidth - Width of the container element in pixels
 * @param containerHeight - Height of the container element in pixels
 * @param verticalOffset - Optional vertical adjustment from perfect center (positive moves downward) in pixels
 * @returns Position coordinates for centering the element within its container
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
 * Constrains a position to ensure an element stays completely within the viewport.
 *
 * This prevents UI elements from being positioned partially or completely
 * outside the visible area, which could make them inaccessible to users.
 *
 * @param position - Current position coordinates of the element
 * @param size - Current size dimensions of the element
 * @param windowWidth - Current width of the viewport in pixels
 * @param windowHeight - Current height of the viewport in pixels
 * @returns Adjusted position that keeps the element within the viewport boundaries
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
 * Constrains the size of an element to ensure it remains within specified minimum
 * and maximum dimensions.
 *
 * This is useful for implementing resizable UI elements that must maintain
 * reasonable dimensions for usability and layout integrity.
 *
 * @param size - Current size dimensions of the element
 * @param minWidth - Minimum allowed width in pixels
 * @param minHeight - Minimum allowed height in pixels
 * @param maxWidth - Maximum allowed width in pixels
 * @param maxHeight - Maximum allowed height in pixels
 * @returns Adjusted size that respects the specified dimension constraints
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
