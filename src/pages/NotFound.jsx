import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTitleBlob from '../components/ui/PageTitleBlob';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center relative w-full h-screen font-body px-6 text-center overflow-hidden bg-background">
      {/* Giant Background 404 — half-visible watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[5%] text-[60vw] sm:text-[50vw] md:text-[45vw] lg:text-[40vw] font-display font-black select-none pointer-events-none leading-[0.85] tracking-tighter"
        style={{ color: 'var(--color-on-background)', opacity: 0.06 }}
      >
        404
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mt-12 md:mt-24">
        <PageTitleBlob />
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-black tracking-tight mb-4">
          {t('404_title', 'Page not found')}
        </h1>
        <p className="font-body text-base sm:text-lg text-[#9D4EDD] font-medium mb-12">
          {t('404_subtitle', "Sorry, the page you're looking for doesn't exist")}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-surface-container-high hover:bg-surface-variant text-black font-body font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t('404_go_back', 'Go back')}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3.5 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto"
          >
            {t('404_take_home', 'Take me home')}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
