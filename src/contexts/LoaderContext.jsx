import React, { createContext, useContext, useState, useEffect } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [hasVisited, setHasVisited] = useState(true); 
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const visited = sessionStorage.getItem('hasVisited');
      setHasVisited(!!visited);
    } catch (e) {
      setHasVisited(false);
    }
    setIsReady(true);
  }, []);

  const markVisited = () => {
    try {
      sessionStorage.setItem('hasVisited', 'true');
    } catch (e) {}
    setHasVisited(true);
  };

  return (
    <LoaderContext.Provider value={{ hasVisited, markVisited, isReady }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
