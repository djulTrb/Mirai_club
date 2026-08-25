import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Recruitment from './pages/Recruitment';
import Admin from './pages/Admin';
import EventDetails from './pages/EventDetails';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
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
            <Route path="admin" element={<Admin />} />
          </Route>
          {/* 404 Catch-all Outside Layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
