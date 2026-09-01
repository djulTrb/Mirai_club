import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingState from './LoadingState';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = React.useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = location.pathname;

    if (location.pathname === '/') {
      return;
    }

    setIsTransitioning(true);
    
    const t = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
    
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9998] bg-background flex items-center justify-center"
          >
            <LoadingState variant="Dots" showPercentage={false} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default PageTransition;
