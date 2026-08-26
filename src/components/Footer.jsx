import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/contact', { state: { prefillEmail: email } });
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-surface border-t border-outline-variant/30 pt-24 pb-16 px-6 md:px-24 font-body">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
        {/* Brand Identity */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <h3 className="font-accent text-xs font-semibold text-black uppercase tracking-[0.25em] mb-4">{t('footer_slogan')}</h3>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-10">
          <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors" to="/events">{t('events')}</Link>
          <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors" to="/gallery">{t('gallery')}</Link>
          <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors" to="/resources">{t('resources')}</Link>
          <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors" to="/contact">{t('contact')}</Link>
          <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors" to="/recruitment">{t('recruitment')}</Link>
        </nav>
        
        {/* Subscription Form */}
        <div className="w-full max-w-md mb-10">
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full pl-6 pr-12 rtl:pr-6 rtl:pl-12 py-3.5 font-body text-sm focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder={t('footer_email_ph')} type="email" dir="auto" required />
            <button type="submit" className="absolute right-4 rtl:right-auto rtl:left-4 text-secondary hover:opacity-80 transition-colors flex items-center justify-center" aria-label="Subscribe">
              <span className="material-symbols-outlined text-2xl rtl:-scale-x-100">send</span>
            </button>
          </form>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 mb-10">
          <a aria-label="Instagram" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group" href="https://instagram.com/miraiclubdz" target="_blank" rel="noopener noreferrer">
            <svg className="text-on-surface-variant group-hover:text-white transition-colors" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
          </a>
          <a aria-label="Facebook" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group" href="https://facebook.com/miraiclubdz" target="_blank" rel="noopener noreferrer">
            <svg className="text-on-surface-variant group-hover:text-white transition-colors" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group" href="https://linkedin.com/company/mirai-club" target="_blank" rel="noopener noreferrer">
            <svg className="text-on-surface-variant group-hover:text-white transition-colors" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a aria-label="GitHub" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group" href="#">
            <svg className="text-on-surface-variant group-hover:text-white transition-colors" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <div className="text-on-surface-variant max-w-xl">
            <span className="material-symbols-outlined text-secondary text-sm align-middle inline-block mr-1 rtl:ml-1 rtl:mr-0">location_on</span>
            <span className="font-body text-xs sm:text-sm font-medium align-middle">{t('address_val')}</span>
          </div>
          <a className="text-on-surface-variant hover:text-secondary transition-colors font-body font-semibold uppercase tracking-wider text-xs" href="mailto:contact@mirai-club.dz">
            <span className="material-symbols-outlined text-sm align-middle inline-block mr-1 rtl:ml-1 rtl:mr-0">mail</span>
            <span className="align-middle" dir="ltr">contact@mirai-club.dz</span>
          </a>
        </div>
        
        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-4">
          <p className="font-accent text-[11px] font-medium uppercase tracking-wider text-on-surface-variant text-center leading-relaxed">{t('footer_copy')}</p>
        </div>
      </div>

      {/* Violet Noisy Blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[300px] bg-[#7b2cbf] opacity-50 dark:opacity-30 blur-[100px] rounded-[100%]" />
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px'
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
