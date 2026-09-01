import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingState from './LoadingState';
import heroDesktop from '../../assets/hero_screens/hero_bg_desktop_16x9.webp';
import heroMobile from '../../assets/hero_screens/hero_bg_mobile_9x16.webp';

const RouteLoader = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(location.pathname === '/');
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Show loader ONLY if the route is "/"
    if (location.pathname !== '/') {
      setShowLoader(false);
      isInitialMount.current = false;
      return;
    }
    
    isInitialMount.current = false;
    setShowLoader(true);
    setIsLoaded(false);
    setProgress(0);

    const targetSrc = window.innerWidth < 640 ? heroMobile : heroDesktop;
    
    let currentProg = 0;
    let xhrFinished = false;

    // This interval forces the percentage to smoothly count up over ~500-600ms
    const artificialTimer = setInterval(() => {
      currentProg += Math.floor(Math.random() * 8) + 4; // increment by 4-11
      
      if (currentProg >= 100) {
        if (xhrFinished) {
          currentProg = 100;
          setProgress(100);
          clearInterval(artificialTimer);
          setTimeout(() => {
            setIsLoaded(true);
          }, 400); // slight pause at 100%
        } else {
          currentProg = 99; // hold at 99% if XHR is actually taking a long time
          setProgress(99);
        }
      } else {
        setProgress(currentProg);
      }
    }, 40);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', targetSrc, true);
    xhr.responseType = 'blob';
    
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const realP = Math.floor((event.loaded / event.total) * 100);
        if (realP > currentProg && realP < 100) {
          currentProg = realP;
          setProgress(currentProg);
        }
      }
    };
    
    const complete = () => {
      xhrFinished = true;
    };

    xhr.onload = complete;
    xhr.onerror = complete;
    xhr.send();

    return () => {
      clearInterval(artificialTimer);
      xhr.abort();
    };
  }, [location.pathname]);

  if (!showLoader || isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <LoadingState progress={progress} variant="Dots" />
    </div>
  );
};

export default RouteLoader;
