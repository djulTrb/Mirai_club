import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import PageTitleBlob from '../components/ui/PageTitleBlob';
import { usePageEntrance } from '../hooks/usePageEntrance';
import api from '../lib/api';

const Contact = () => {
  const containerRef = usePageEntrance();
  const { t } = useTranslation();
  const location = useLocation();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (location.state?.prefillEmail) {
      setValue('email', location.state.prefillEmail);
    }
  }, [location]);

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await api.post('/contact/', {
        nom: data.name,
        email: data.email,
        sujet: 'Message from Website Contact Form',
        message: data.message
      });
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 relative z-10">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative" ref={containerRef}>
          <PageTitleBlob />
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">{t('contact_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('contact_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('contact_desc')}
          </p>
        </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Address Card (Full Width) */}
              <div className="md:col-span-2 bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#9D4EDD] text-3xl">location_on</span>
                <h3 className="font-display font-bold text-xl text-black tracking-tight">{t('address')}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed" dir="ltr">{t('address_val')}</p>
              </div>
              
              {/* Email Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#9D4EDD] text-3xl">mail</span>
                <h3 className="font-display font-bold text-xl text-black tracking-tight">{t('email')}</h3>
                <a href="mailto:contact@mirai-club.dz" className="font-body text-sm text-[#9D4EDD] hover:underline font-medium">contact@mirai-club.dz</a>
              </div>

              {/* Instagram Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#9D4EDD] text-3xl">photo_camera</span>
                <h3 className="font-display font-bold text-xl text-black tracking-tight">Instagram</h3>
                <a href="#" className="font-body text-sm text-on-surface-variant hover:text-[#9D4EDD] font-medium">{t('follow_ig')}</a>
              </div>

              {/* Facebook Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#9D4EDD] text-3xl">groups</span>
                <h3 className="font-display font-bold text-xl text-black tracking-tight">Facebook</h3>
                <a href="#" className="font-body text-sm text-on-surface-variant hover:text-[#9D4EDD] font-medium">{t('follow_fb')}</a>
              </div>

              {/* LinkedIn Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#9D4EDD] text-3xl">work</span>
                <h3 className="font-display font-bold text-xl text-black tracking-tight">LinkedIn</h3>
                <a href="#" className="font-body text-sm text-on-surface-variant hover:text-[#9D4EDD] font-medium">{t('follow_in')}</a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white border border-outline-variant/30 p-6 md:p-12 rounded-2xl shadow-sm">
              <h2 className="font-display font-bold text-2xl text-black tracking-tight mb-8">{t('contact_msg_title')}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined">check_circle</span>
                    Your message has been sent successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    Failed to send message. Please try again.
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs text-on-surface-variant uppercase tracking-wider">{t('form_name').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                  <input {...register("name", { required: true })} type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs text-on-surface-variant uppercase tracking-wider">{t('form_email').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                  <input {...register("email", { required: true })} type="email" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs text-on-surface-variant uppercase tracking-wider">{t('form_msg').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                  <textarea {...register("message", { required: true })} rows="5" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none resize-none transition-all disabled:opacity-50" disabled={status === 'loading'}></textarea>
                </div>
                <button type="submit" disabled={status === 'loading'} className="bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider py-4 rounded-xl hover:opacity-90 transition-opacity mt-4 shadow-sm w-full flex justify-center items-center gap-2 disabled:opacity-70">
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : t('form_send')}
                </button>
              </form>
            </div>
          </div>
      </div>
      </main>
  );
};

export default Contact;
