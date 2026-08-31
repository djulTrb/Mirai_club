import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PageTitleBlob from '../components/ui/PageTitleBlob';
import { usePageEntrance } from '../hooks/usePageEntrance';

const Recruitment = () => {
  const containerRef = usePageEntrance();
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle');
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('mirai_recruitment_status') === 'open');

  useEffect(() => {
    
    // Cross-tab sync via polling
    const interval = setInterval(() => {
      const currentStatus = localStorage.getItem('mirai_recruitment_status');
      setIsOpen(currentStatus === 'open');
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative" ref={containerRef}>
          <PageTitleBlob />
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">{t('recruitment_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('recruitment_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('recruitment_desc')}
          </p>
        </div>
        
        {isOpen ? (
          <div className="w-full max-w-2xl bg-white border border-outline-variant/30 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col items-center shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  Your application has been submitted successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  Failed to submit application. Please try again.
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label>{t('form_name').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <input {...register("fullName", { required: true })} type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} required />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t('form_uni_email').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <input {...register("email", { required: true })} type="email" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} required />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t('form_major').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <input {...register("fieldOfStudy", { required: true })} type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} required />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t('form_year').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <select {...register("yearOfStudy", { required: true })} dir="ltr" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} required>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>M1</option>
                  <option>M2</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>{t('form_why').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <textarea {...register("reason", { required: true })} rows="4" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none disabled:opacity-50" disabled={status === 'loading'} required></textarea>
              </div>

              
              {/* Warning Note */}
              <div className="bg-[#fff8e1] border border-[#ffe082] text-[#8f6a00] p-4 rounded-xl flex items-start gap-3 mt-2 shadow-sm">
                <span className="material-symbols-outlined shrink-0 text-[#ffb300]">warning</span>
                <p className="font-body text-sm font-medium leading-relaxed">
                  <strong className="block mb-1 text-[#664d00]">{t('form_warning_title')}</strong>
                  {t('form_warning_desc')}
                </p>
              </div>

              <button type="submit" disabled={status === 'loading'} className="mt-4 bg-[#9D4EDD] text-white px-8 py-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-2 disabled:opacity-70">
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : t('form_submit')}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white border border-outline-variant/30 rounded-2xl p-8 md:p-16 flex flex-col items-center shadow-sm">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-black mb-4 text-center tracking-tight">{t('app_closed_title')}</h2>
            <p className="font-body text-base text-on-surface-variant text-center mb-8 max-w-md leading-relaxed">
              {t('app_closed_desc')}
            </p>
            <a href="mailto:contact@mirai-club.dz" className="bg-[#9D4EDD] text-white px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity shadow-sm">
              CONTACT US
            </a>
          </div>
        )}
      </div>
      
      {/* Background SVG elements */}
      </main>
  );
};

export default Recruitment;
