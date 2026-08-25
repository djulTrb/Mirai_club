import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DUMMY_EVENTS } from '../data/events';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const event = DUMMY_EVENTS.find(e => e.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-16 font-body">
        <h1 className="text-4xl font-display font-bold text-black mb-4">Event Not Found</h1>
        <button onClick={() => navigate('/events')} className="text-secondary hover:underline">
          Return to Events
        </button>
      </main>
    );
  }

  const isEnded = new Date(event.realDate) < new Date();
  const isClosed = new Date(event.deadline) < new Date();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted for event:", event.title, formData);
    setSubmitted(true);
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-24 font-body">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12">
        <button 
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary mb-8 transition-colors text-sm font-semibold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-lg rtl:rotate-180">arrow_back</span>
          {t('go_back', 'Go Back')}
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Event Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-video rounded-3xl overflow-hidden relative shadow-sm border border-outline-variant/30">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              {isEnded && (
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-secondary text-white px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest text-xs shadow-md">
                  {t('event_ended')}
                </div>
              )}
            </div>
            
            <div>
              <p className="font-accent font-semibold text-xs text-secondary tracking-wide uppercase mb-2">{event.date}</p>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mb-4">{event.title}</h1>
              
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-body mb-8 bg-surface-variant/40 p-4 rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary shrink-0">location_on</span>
                <p className="font-medium">{event.location}</p>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none font-body text-on-surface-variant leading-relaxed">
                <h3 className="font-semibold text-black text-xl mb-4 font-display">{t('event_details', 'About this event')}</h3>
                <p>{event.details}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm p-8 sm:p-10 sticky top-32">
              <h2 className="text-2xl font-display font-bold text-black mb-2 tracking-tight">
                {t('event_register_title', 'Register for Event')}
              </h2>
              <p className="text-on-surface-variant text-sm mb-8">
                {t('event_register_desc', 'Fill out the form below to secure your spot.')}
              </p>

              {isClosed ? (
                <div className="bg-error-container/20 border border-error/30 text-error p-6 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-3xl mb-2">event_busy</span>
                  <p className="font-bold">{t('event_closed', 'Registration is closed')}</p>
                  <p className="text-sm mt-1">The deadline for this event has passed.</p>
                </div>
              ) : submitted ? (
                <div className="bg-secondary/10 border border-secondary/30 text-secondary p-6 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                  <h3 className="font-display font-bold text-xl mb-2">Registration Successful!</h3>
                  <p className="text-sm text-on-surface-variant">We have received your application. See you there!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Motivation</label>
                    <textarea 
                      name="motivation"
                      required
                      rows="4"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none"
                      placeholder="Why do you want to attend this event?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 w-full bg-secondary text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
                  >
                    {t('event_submit', 'Submit Registration')}
                    <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
