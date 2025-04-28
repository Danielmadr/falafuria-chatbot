// hooks/useInitialPositionAndResize.ts
import { useEffect, useRef } from "react";
import { calculateInitialPositionAndSize, constrainPositionToViewport, constrainSize } from "../utils/layoutUtils";
import { MIN_WIDTH, MIN_HEIGHT, DEFAULT_WIDTH_PERCENTAGE, DEFAULT_HEIGHT_PERCENTAGE } from "../constants/layout";
import { Size, Position } from "../../types/common"; // Assume you have these

interface Props {
  windowWidth: number;
  windowHeight: number;
  size: Size;
  setSize: (size: Size) => void;
  position: Position;
  setPosition: (pos: Position) => void;
}

export const useInitialPositionAndResize = ({
  windowWidth,
  windowHeight,
  size,
  setSize,
  position,
  setPosition,
}: Props) => {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (windowWidth <= 0 || windowHeight <= 0) return;

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

    const constrainedSize = constrainSize(
      size,
      MIN_WIDTH,
      MIN_HEIGHT,
      windowWidth,
      windowHeight
    );

    if (
      constrainedSize.width !== size.width ||
      constrainedSize.height !== size.height
    ) {
      setSize(constrainedSize);
    }

    const constrainedPosition = constrainPositionToViewport(
      position,
      constrainedSize,
      windowWidth,
      windowHeight
    );

    if (
      constrainedPosition.x !== position.x ||
      constrainedPosition.y !== position.y
    ) {
      setPosition(constrainedPosition);
    }
  }, [windowWidth, windowHeight, size, position, setSize, setPosition]);
};
