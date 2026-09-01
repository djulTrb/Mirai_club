import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroller from './components/SmoothScroller';
import RouteLoader from './components/ui/RouteLoader';

import { HelmetProvider } from 'react-helmet-async';

const Home = React.lazy(() => import('./pages/Home'));
const Events = React.lazy(() => import('./pages/Events'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Recruitment = React.lazy(() => import('./pages/Recruitment'));
const Admin = React.lazy(() => import('./pages/Admin'));
const AdminAuth = React.lazy(() => import('./pages/AdminAuth'));
const EventDetails = React.lazy(() => import('./pages/EventDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
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
            {/* <RouteLoader /> */}
          <ScrollToTop />
          
            <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-background"><div className="w-12 h-12 rounded-full border-4 border-[#c87fff] border-t-transparent animate-spin"></div></div>}>
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
            </Suspense>
          
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
