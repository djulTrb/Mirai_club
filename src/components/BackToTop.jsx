import React from 'react';

const BackToTop = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        aria-label="Back to top" 
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/30 shadow-xl flex items-center justify-center text-black hover:bg-secondary hover:text-white transition-all duration-300 group" 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <span className="material-symbols-outlined text-2xl">arrow_upward</span>
      </button>
    </div>
  );
};

export default BackToTop;
