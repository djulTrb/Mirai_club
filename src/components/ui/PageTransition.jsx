import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingState from './LoadingState';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = React.useRef(location.pathname);

  useEffect(() => {
    // If only query params or hash changed, update instantly without transition
    if (location.pathname === prevPathname.current && location !== displayLocation) {
      setDisplayLocation(location);
      return;
    }

    if (location.pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = location.pathname;

    if (location.pathname === '/') {
      // No loader needed when going back to the hero section
      setDisplayLocation(location);
      return;
    }

    // Trigger the transition loader
    setIsTransitioning(true);
    
    // Wait 300ms for loader to fade in, then switch the underlying route
    const t1 = setTimeout(() => {
      setDisplayLocation(location);
    }, 300);
    
    // Keep the loader on screen for at least 800ms total for a smooth animation
    const t2 = setTimeout(() => {
      setIsTransitioning(false);
    }, 1100);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9998] bg-background flex items-center justify-center"
          >
            <LoadingState variant="Dots" showPercentage={false} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
        By passing the displayLocation to the Routes component, 
        we freeze the old page in the background until the loader covers it!
      */}
      {React.cloneElement(children, { location: displayLocation })}
    </>
  );
};

export default PageTransition;
