import React, { createContext, useContext, useState, useEffect } from 'react';
import { WindowSize } from '../../types/common';

interface WindowSizeContextType {
  windowSize: WindowSize;
}

const WindowSizeContext = createContext<WindowSizeContextType>({
  windowSize: { width: 0, height: 0 }
});

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    updateWindowDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateWindowDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => useContext(WindowSizeContext);