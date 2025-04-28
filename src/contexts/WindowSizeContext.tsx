import React, { createContext, useContext, useState, useEffect } from "react";
import { WindowSize } from "../types/common";

/**
 * Context type definition for Window Size
 * Provides the current dimensions of the browser window
 */
interface WindowSizeContextType {
  windowSize: WindowSize; // Current window dimensions
}

/**
 * Default window size value used before measurements are available
 */
const defaultWindowSize: WindowSize = { width: 0, height: 0 };

/**
 * Context instance for accessing window size data throughout the component tree
 */
const WindowSizeContext = createContext<WindowSizeContextType>({
  windowSize: defaultWindowSize,
});

/**
 * Provider component that tracks and provides window size information
 *
 * @param children - Child components that will have access to window size data
 */
export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to track the current window dimensions
  const [windowSize, setWindowSize] = useState<WindowSize>(defaultWindowSize);

  useEffect(() => {
    /**
     * Updates the window size in state when browser is resized
     */
    const updateWindowDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions(); // Set initial size

    // Add resize event listener to track window size changes
    window.addEventListener("resize", updateWindowDimensions);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

/**
 * Custom hook for accessing window size data
 *
 * @returns The current window dimensions
 */
export const useWindowSize = () => useContext(WindowSizeContext);
