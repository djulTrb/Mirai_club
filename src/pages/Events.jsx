import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DUMMY_EVENTS } from '../data/events';

const Events = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events] = useState(DUMMY_EVENTS);

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 font-body">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center">
          <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-3 sm:mb-4">{t('events_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('events_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('events_desc')}
          </p>
        </div>
        
        {events.length === 0 ? (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4 bg-surface-container-low rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">event_busy</span>
            <p className="font-body font-semibold text-sm text-on-surface-variant uppercase tracking-widest">{t('event_empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {events.map((event) => {
              const isEnded = new Date(event.realDate) < new Date();
              
              return (
                <div 
                  key={event.id}
                  className={`group cursor-pointer bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-all duration-500 relative`}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {isEnded && (
                    <div className="absolute inset-0 bg-white/40 backdrop-grayscale flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                      <span className="bg-secondary text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-md">
                        {t('event_ended')}
                      </span>
                    </div>
                  )}
                  
                  <div className="w-full aspect-video overflow-hidden bg-surface-variant relative z-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-4 flex-grow relative z-0">
                    <p className="font-accent font-semibold text-xs text-secondary tracking-wide uppercase">{event.date}</p>
                    <h3 className="font-display font-bold text-xl text-black tracking-tight">{event.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs font-body mt-auto">
                      <span className="material-symbols-outlined text-sm text-secondary shrink-0">location_on</span>
                      <p>{event.location}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Events;
