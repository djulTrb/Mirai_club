import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button 
        aria-label="Back to top" 
        className="w-[54px] h-[54px] rounded-full bg-white/80 backdrop-blur-md border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-white dark:border-white dark:text-black dark:hover:bg-[#c77dff] dark:hover:text-[#240046]" 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <span className="material-symbols-outlined text-[28px]">arrow_upward</span>
      </button>
    </div>
  );
};

export default BackToTop;
