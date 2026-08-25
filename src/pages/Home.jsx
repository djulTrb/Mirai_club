import React from 'react';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/hero_illustration.png';
import heroSticker1 from '../assets/hero_sticker_1.png';
import heroSticker2 from '../assets/hero_sticker_2.png';
import heroSticker3 from '../assets/hero_sticker_3.png';

const Home = () => {
  const { t } = useTranslation();
  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 font-body">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden -mt-16 bg-surface">
        
        {/* Scattered Image Placeholders */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 md:opacity-100">
          {/* Under content */}
          <img src={heroSticker2} alt="Sticker" className="absolute top-[8%] left-[2%] md:top-[12%] md:left-[10%] w-16 h-16 md:w-32 md:h-32 object-contain transform -rotate-[15deg] opacity-90" />
          <img src={heroSticker1} alt="Sticker" className="absolute top-[25%] right-[2%] md:right-[8%] w-20 h-20 md:w-40 md:h-40 object-contain transform rotate-[8deg] opacity-95" />
          <div className="hidden md:block absolute bottom-[20%] left-[12%] w-24 h-32 bg-outline-variant/20 rounded-xl transform rotate-[20deg]"></div>
          <img src={heroSticker3} alt="Sticker" className="absolute bottom-[28%] right-[5%] md:bottom-[18%] md:right-[20%] w-24 h-24 md:w-48 md:h-48 object-contain transform -rotate-[5deg]" />
          
          {/* Over content (z-30) */}
          <div className="hidden md:block absolute top-[40%] left-[8%] w-20 h-20 bg-outline-variant/30 rounded-xl transform -rotate-[25deg] z-30"></div>
          <div className="hidden md:block absolute top-[55%] right-[12%] w-16 h-16 bg-outline-variant/30 rounded-full z-30"></div>
          <div className="hidden md:block absolute bottom-[15%] left-[40%] w-28 h-20 bg-outline-variant/30 rounded-lg transform rotate-[15deg] z-30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl w-full px-6 mb-24 mt-4">
          <p className="font-accent font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-secondary mb-4 md:mb-6">
            {t('home_subtitle')}
          </p>
          
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-black mb-4 uppercase leading-tight">
            MIRAI<br />CLUB
          </h1>
          
          <p className="font-body text-base sm:text-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed font-light mt-4">
            {t('home_build')} AI. {t('home_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black text-[#ffffff] px-8 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-all hover:scale-105 duration-300">
              {t('home_join')}
            </button>
            <button className="bg-transparent text-black px-8 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-[0.2em] border border-black hover:bg-black hover:text-[#ffffff] transition-all duration-300">
              {t('home_explore')}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
          <span className="font-accent text-[10px] uppercase tracking-widest text-black">Scroll</span>
          <span className="material-symbols-outlined text-black animate-bounce text-sm">arrow_downward</span>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full overflow-hidden mt-8 relative border-y border-[#5a189a] bg-[#240046] dark:bg-[#3c096c] py-8 shadow-lg">
        <div className="flex w-max font-display font-bold whitespace-nowrap group">
          <div className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff]">{t('marquee_heritage')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">{t('marquee_future')}</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff]">Mirai</span><span className="text-[#c77dff] text-5xl translate-y-1">*</span>
          </div>
        </div>
      </section>

      {/* {t('mission_title')} */}
      <section className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background">
        <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto">
          <div className="w-full flex flex-col items-center mb-8">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('mission_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('mission_title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t('mission_ed_title')}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed font-body">{t('mission_ed_desc')}</p>
            </div>
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t('mission_in_title')}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed font-body">{t('mission_in_desc')}</p>
            </div>
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t('mission_co_title')}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed font-body">{t('mission_co_desc')}</p>
            </div>
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t('mission_ex_title')}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed font-body">{t('mission_ex_desc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <div className="bg-white/80 rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">14</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_members')}</span>
            </div>
            <div className="bg-white/80 rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">3</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_events')}</span>
            </div>
            <div className="bg-white/80 rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">3</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_projects')}</span>
            </div>
            <div className="bg-white/80 rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">5</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_resources')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the members */}
      <section className="px-6 md:px-24 bg-surface py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('team_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('team_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Member 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] px-8 py-8">
              <div className="flex justify-between items-start">
                <span className="font-accent text-xs font-semibold bg-surface-variant/40 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider">{t('team_pres')}</span>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-variant/80">
                  <img alt="Amine Hamidi" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIU7DXVGhLTvu5SQ9jeBh_5LBUN6oz6p1eYLjOlMHqbg0Yw7t4WKqVNE4hTBPqryOG694CrKZGB5iyOA4-vHMedFwZgITTKcVZv2N-7OuvXZQppHV5AsgWTZXWCYOcnGQ8Fjqzb-Py6PViLSb-gg_1DiKnLJU8NI7TfQEYij5Tu4-hSFSyjgeBKcdV_Ohjs-Gm-0WacZjnRyGO5rs5hYi8Jq9QVnK8BoFcVd7yu3kAOCMP-occR1wW4ElRVWL0kkyj4Cc" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight text-on-surface tracking-tight">Amine Hamidi</h3>
                <div className="mt-4">
                  <p className="font-accent font-semibold text-xs uppercase tracking-wider text-on-surface-variant mb-2">{t('team_skills')}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_mgt')}</span>
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_str')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-8 w-full">
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">LinkedIn <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">GitHub <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
              </div>
            </div>
            {/* Member 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] px-8 py-8">
              <div className="flex justify-between items-start">
                <span className="font-accent text-xs font-semibold bg-surface-variant/40 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider">{t('team_vp')}</span>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-variant/80">
                  <img alt="Sara Moussaoui" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3NfbPsOTPBIeO9tc09MXmHjTSEPl5bD3zly9MRvLIfkcCfc-rVGcxW0xk4N8SdpzwJX82JCV4Np5Mt-ijbVDk8xC6T-CivUK19elmM3tTHd9QEvMsR949NNgZljq53ZrlcDvvLtpS16r4GwTFmAaB7pC-e18_-ykLCLbq0YWS9bBDB_kag6uuCTR0p0uo3TSadA-G4a2k2iIJrioWOFlC5LEG5dz5zyDGs-kbQTgFnI_t88Pyaljk6JUpZ16BPrzSIY" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight text-on-surface tracking-tight">Sara Moussaoui</h3>
                <div className="mt-4">
                  <p className="font-accent font-semibold text-xs uppercase tracking-wider text-on-surface-variant mb-2">{t('team_skills')}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_ops')}</span>
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_log')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-8 w-full">
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">LinkedIn <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">GitHub <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
              </div>
            </div>
            {/* Member 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] px-8 py-8">
              <div className="flex justify-between items-start">
                <span className="font-accent text-xs font-semibold bg-surface-variant/40 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider">{t('team_sec')}</span>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-variant/80">
                  <img alt="Member Name" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8id0Vtz_n1xSUF5dzm3zhOuGdswxHtgIFJwuvB92swpAVJnEFWfsIPGj6qVcqh7M-bRIpr6fPvY0SfICO6GSgW1M60ph440pHmg1pklMqEinaVyB7g5tB_a8MiND5ZWkAuR0Y-Cjl6SUA5fxm3jQh_3qTmVJIdPRP_ArgnHyTKXe-bsOUaS0joQKnyIMjL_c9j9Ifwk2nGO0WighAXArYvRMiOYcYAeXkXw2zW6CUFt-hO2XTeDBX1BD4TR5qD5M10ys-TIP7mMLx" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight text-on-surface tracking-tight">Member Name</h3>
                <div className="mt-4">
                  <p className="font-accent font-semibold text-xs uppercase tracking-wider text-on-surface-variant mb-2">{t('team_skills')}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_out')}</span>
                    <span className="font-body text-xs font-medium bg-surface-variant/40 px-2.5 py-1 rounded-full text-on-surface-variant uppercase">{t('team_sup')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-8 w-full">
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">LinkedIn <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
                <a className="py-2 px-3 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">GitHub <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current projects */}
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center">
        <div className="w-full max-w-[1400px] mx-auto relative group">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('proj_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('proj_title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card">
              <p className="font-accent font-semibold uppercase tracking-wider text-xs text-secondary mb-4">NLP</p>
              <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">Sentiment Analyzer DZ</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">Analyse de sentiments sur le dialecte algérien. Modèle BERT fine-tuné.</p>
              <div className="mt-auto flex items-center gap-1 text-secondary font-body font-semibold text-xs uppercase tracking-wider">
                {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card">
              <p className="font-accent font-semibold uppercase tracking-wider text-xs text-secondary mb-4">VISION</p>
              <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">Détection Objets Temps Réel</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">Système de détection basé sur YOLOv8 pour applications locales.</p>
              <div className="mt-auto flex items-center gap-1 text-secondary font-body font-semibold text-xs uppercase tracking-wider">
                {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card">
              <p className="font-accent font-semibold uppercase tracking-wider text-xs text-secondary mb-4">ML</p>
              <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">Prédiction Agricole Locale</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">Modèle de prédiction de rendements pour l'agriculture en Kabylie.</p>
              <div className="mt-auto flex items-center gap-1 text-secondary font-body font-semibold text-xs uppercase tracking-wider">
                {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
