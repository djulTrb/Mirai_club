import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';

import Chatbot from './Chatbot';

const Layout = () => {
  return (
    <div className="antialiased min-h-screen flex flex-col overflow-x-hidden bg-background relative">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <BackToTop />
      <Chatbot />
    </div>
  );
};

export default Layout;
