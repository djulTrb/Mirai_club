import { Helmet } from 'react-helmet-async';
import Skeleton from '../components/ui/Skeleton';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageTitleBlob from '../components/ui/PageTitleBlob';
import { usePageEntrance } from '../hooks/usePageEntrance';

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const containerRef = usePageEntrance();
  const { t } = useTranslation();

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body">
      <Helmet>
        <title>Resources | Mirai Club</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative" ref={containerRef}>
          <PageTitleBlob />
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">{t('resources_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('resources_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('resources_desc')}
          </p>
        </div>
        
        <div className="w-full flex overflow-x-auto gap-2 mb-12 pb-4 scrollbar-hide justify-start md:justify-center flex-nowrap md:flex-wrap px-2 md:px-0 snap-x">
          <button className="px-5 py-2 rounded-full border border-outline-variant text-xs sm:text-sm font-body font-medium hover:bg-[#9D4EDD] hover:text-white transition-colors snap-start whitespace-nowrap">All</button>
          <button className="px-5 py-2 rounded-full border border-outline-variant text-xs sm:text-sm font-body font-medium hover:bg-[#9D4EDD] hover:text-white transition-colors snap-start whitespace-nowrap">PDF</button>
          <button className="px-5 py-2 rounded-full border border-outline-variant text-xs sm:text-sm font-body font-medium hover:bg-[#9D4EDD] hover:text-white transition-colors snap-start whitespace-nowrap">Course support</button>
          <button className="px-5 py-2 rounded-full border border-outline-variant text-xs sm:text-sm font-body font-medium hover:bg-[#9D4EDD] hover:text-white transition-colors snap-start whitespace-nowrap">Tutorial</button>
          <button className="px-5 py-2 rounded-full bg-[#9D4EDD] text-white text-xs sm:text-sm font-body font-semibold shadow-sm snap-start whitespace-nowrap">Presentation</button>
          <button className="px-5 py-2 rounded-full border border-outline-variant text-xs sm:text-sm font-body font-medium hover:bg-[#9D4EDD] hover:text-white transition-colors snap-start whitespace-nowrap">Useful link</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9D4EDD]">description</span>
              </div>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">Course Support</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">Introduction to Machine Learning</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">Comprehensive guide to ML fundamentals, math intuition, and core algorithms.</p>
            </div>
            <a href="#" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
              <span className="material-symbols-outlined text-sm">download</span> Download
            </a>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9D4EDD]">picture_as_pdf</span>
              </div>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">PDF</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">Cheat sheet scikit-learn</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">Quick reference guide and code snippets for common scikit-learn functions.</p>
            </div>
            <a href="#" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
              <span className="material-symbols-outlined text-sm">download</span> Download
            </a>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9D4EDD]">terminal</span>
              </div>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">Tutorial</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">Fine-tuning a BERT model</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">Step-by-step practical guide to NLP transformers and fine-tuning techniques.</p>
            </div>
            <a href="#" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
              <span className="material-symbols-outlined text-sm">visibility</span> View
            </a>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9D4EDD]">present_to_all</span>
              </div>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">Presentation</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">Slides - Deep Learning Conference</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">Full slide deck used during the annual deep learning club meetup.</p>
            </div>
            <a href="#" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
              <span className="material-symbols-outlined text-sm">download</span> Download
            </a>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9D4EDD]">link</span>
              </div>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">Useful Link</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">Official PyTorch Documentation</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">The primary documentation and API reference for PyTorch neural network developers.</p>
            </div>
            <a href="#" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
              <span className="material-symbols-outlined text-sm">open_in_new</span> Visit
            </a>
          </div>
        </div>
      </div>
      
      </main>
  );
};

export default Resources;
