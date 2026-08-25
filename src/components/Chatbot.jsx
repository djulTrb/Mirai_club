import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // Hide on admin page
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-[1.25rem] bg-[#EAE5FF] text-secondary shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:scale-105 transition-all focus:outline-none group"
        aria-label="Toggle AI Chatbot"
      >
        <span className="material-symbols-outlined text-2xl text-secondary">
          {isOpen ? 'close' : 'auto_awesome'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] max-h-[calc(100vh-8rem)] bg-white border border-outline-variant/30 rounded-2xl shadow-xl flex flex-col overflow-hidden font-body animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-secondary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">auto_awesome</span>
              <div>
                <h3 className="font-display font-bold text-sm">{t('ai_title')}</h3>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow bg-surface p-4 overflow-y-auto flex flex-col gap-4">
            <div className="flex justify-start">
              <div className="bg-white border border-outline-variant/20 rounded-2xl rounded-tl-sm p-3 max-w-[85%] shadow-sm">
                <p className="text-sm text-on-surface">{t('ai_hello')}</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-outline-variant/20 flex items-center gap-2">
            <input 
              type="text" 
              placeholder={t('ai_placeholder')}
              className="flex-grow bg-surface-container-low border border-outline-variant/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-secondary transition-colors"
            />
            <button className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
