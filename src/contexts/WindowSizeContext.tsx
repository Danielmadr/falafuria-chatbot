import React, { createContext, useContext, useState, useEffect } from "react";
import { WindowSize } from "../types/common";

interface WindowSizeContextType {
  windowSize: WindowSize;
}

const defaultWindowSize: WindowSize = { width: 0, height: 0 };

const WindowSizeContext = createContext<WindowSizeContextType>({
  windowSize: defaultWindowSize,
});

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(defaultWindowSize);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions(); // Set initial size
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => useContext(WindowSizeContext);
