import React, { useEffect, useState } from 'react';
import LoadingState from './components/ui/LoadingState';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroller from './components/SmoothScroller';
import heroDesktop from './assets/hero_screens/hero_bg_desktop_16x9.webp';
import heroMobile from './assets/hero_screens/hero_bg_mobile_9x16.webp';

import { HelmetProvider } from 'react-helmet-async';

import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Recruitment from './pages/Recruitment';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import EventDetails from './pages/EventDetails';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Timeout ensures the DOM has painted the new route before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);
  }, [pathname]);

  return null;
};


import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/admin-auth" replace />;
  }
  return children;
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetSrc = window.innerWidth < 640 ? heroMobile : heroDesktop;
    
    // Fallback progress just in case XHR is too fast or blocked
    const fallbackTimer = setInterval(() => {
      setProgress(p => (p < 85 ? p + Math.floor(Math.random() * 5) : p));
    }, 200);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', targetSrc, true);
    xhr.responseType = 'blob';
    
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const p = Math.floor((event.loaded / event.total) * 100);
        setProgress(Math.max(p, 10)); // keep at least what fallback has, or jump
      }
    };
    
    const complete = () => {
      clearInterval(fallbackTimer);
      setProgress(100);
      setTimeout(() => setIsLoaded(true), 600); // Wait briefly so user sees 100%
    };

    xhr.onload = complete;
    xhr.onerror = complete; // proceed anyway on error
    xhr.send();

    return () => {
      clearInterval(fallbackTimer);
      xhr.abort();
    };
  }, []);

  if (!isLoaded) {
    return (
      <ThemeProvider>
        <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
          <LoadingState progress={progress} variant="Dots" />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
            <SmoothScroller />
          <ScrollToTop />
          
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:id" element={<EventDetails />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="resources" element={<Resources />} />
                <Route path="contact" element={<Contact />} />
                <Route path="recruitment" element={<Recruitment />} />
                <Route path="admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
                <Route path="admin-auth" element={<AdminAuth />} />
              </Route>
              {/* 404 Catch-all Outside Layout */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
