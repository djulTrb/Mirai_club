import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroller from './components/SmoothScroller';

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
