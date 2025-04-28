/**
 * Custom hook that manages the initial positioning and resizing of UI elements.
 * This hook handles:
 * 1. Setting initial position and size on first render
 * 2. Maintaining element within viewport when window dimensions change
 * 3. Constraining size to respect minimum and maximum dimensions
 *
 * @module hooks/useInitialPositionAndResize
 */

import { useEffect, useRef } from "react";
import {
  calculateInitialPositionAndSize,
  constrainPositionToViewport,
  constrainSize,
} from "../utils/layoutUtils";
import {
  MIN_WIDTH,
  MIN_HEIGHT,
  DEFAULT_WIDTH_PERCENTAGE,
  DEFAULT_HEIGHT_PERCENTAGE,
} from "../components/constants/layout";
import { Size, Position } from "../types/common";

/**
 * Props for the useInitialPositionAndResize hook
 *
 * @interface Props
 * @property {number} windowWidth - Current window width in pixels
 * @property {number} windowHeight - Current window height in pixels
 * @property {Size} size - Current element size (width/height)
 * @property {Function} setSize - Setter function for updating element size
 * @property {Position} position - Current element position (x/y coordinates)
 * @property {Function} setPosition - Setter function for updating element position
 */
interface Props {
  windowWidth: number;
  windowHeight: number;
  size: Size;
  setSize: (size: Size) => void;
  position: Position;
  setPosition: (pos: Position) => void;
}

/**
 * Hook that handles initial positioning and responsive adjustments of UI elements
 * based on window dimensions.
 *
 * @param {Props} props - Configuration options and state setters
 * @returns {void}
 */
export const useInitialPositionAndResize = ({
  windowWidth,
  windowHeight,
  size,
  setSize,
  position,
  setPosition,
}: Props) => {
  // Track whether initial position/size has been set
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Skip calculations if window dimensions are invalid
    if (windowWidth <= 0 || windowHeight <= 0) return;

    // Set initial position and size on first valid render
    if (!isInitializedRef.current) {
      const { position: initialPosition, size: initialSize } =
        calculateInitialPositionAndSize(
          windowWidth,
          windowHeight,
          MIN_WIDTH,
          MIN_HEIGHT,
          DEFAULT_WIDTH_PERCENTAGE,
          DEFAULT_HEIGHT_PERCENTAGE
        );
      setPosition(initialPosition);
      setSize(initialSize);
      isInitializedRef.current = true;
      return;
    }

    // Constrain size to respect min/max dimensions
    const constrainedSize = constrainSize(
      size,
      MIN_WIDTH,
      MIN_HEIGHT,
      windowWidth,
      windowHeight
    );

    // Only update size if constraints changed the values
    if (
      constrainedSize.width !== size.width ||
      constrainedSize.height !== size.height
    ) {
      setSize(constrainedSize);
    }

    // Ensure position keeps element within viewport
    const constrainedPosition = constrainPositionToViewport(
      position,
      constrainedSize,
      windowWidth,
      windowHeight
    );

    // Only update position if constraints changed the values
    if (
      constrainedPosition.x !== position.x ||
      constrainedPosition.y !== position.y
    ) {
      setPosition(constrainedPosition);
    }
  }, [windowWidth, windowHeight, size, position, setSize, setPosition]);
};
