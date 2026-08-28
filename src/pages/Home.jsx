import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_illustration.png';
import heroSticker1 from '../assets/hero_sticker_1.png';
import heroSticker2 from '../assets/hero_sticker_2.png';
import heroSticker3 from '../assets/hero_sticker_3.png';
import heroBg from '../assets/hero_bg.png';

const Home = () => {
  const { t } = useTranslation();

  const [showAllMembers, setShowAllMembers] = useState(false);

  const TEAM_MEMBERS = [
    {
      name: "Amine Hamidi", role: t('team_pres'), skills: [t('team_mgt'), t('team_str')],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIU7DXVGhLTvu5SQ9jeBh_5LBUN6oz6p1eYLjOlMHqbg0Yw7t4WKqVNE4hTBPqryOG694CrKZGB5iyOA4-vHMedFwZgITTKcVZv2N-7OuvXZQppHV5AsgWTZXWCYOcnGQ8Fjqzb-Py6PViLSb-gg_1DiKnLJU8NI7TfQEYij5Tu4-hSFSyjgeBKcdV_Ohjs-Gm-0WacZjnRyGO5rs5hYi8Jq9QVnK8BoFcVd7yu3kAOCMP-occR1wW4ElRVWL0kkyj4Cc"
    },
    {
      name: "Sara Moussaoui", role: t('team_vp'), skills: [t('team_ops'), t('team_log')],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc3NfbPsOTPBIeO9tc09MXmHjTSEPl5bD3zly9MRvLIfkcCfc-rVGcxW0xk4N8SdpzwJX82JCV4Np5Mt-ijbVDk8xC6T-CivUK19elmM3tTHd9QEvMsR949NNgZljq53ZrlcDvvLtpS16r4GwTFmAaB7pC-e18_-ykLCLbq0YWS9bBDB_kag6uuCTR0p0uo3TSadA-G4a2k2iIJrioWOFlC5LEG5dz5zyDGs-kbQTgFnI_t88Pyaljk6JUpZ16BPrzSIY"
    },
    {
      name: "Member Name 3", role: t('team_sec'), skills: [t('team_out'), t('team_sup')],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8id0Vtz_n1xSUF5dzm3zhOuGdswxHtgIFJwuvB92swpAVJnEFWfsIPGj6qVcqh7M-bRIpr6fPvY0SfICO6GSgW1M60ph440pHmg1pklMqEinaVyB7g5tB_a8MiND5ZWkAuR0Y-Cjl6SUA5fxm3jQh_3qTmVJIdPRP_ArgnHyTKXe-bsOUaS0joQKnyIMjL_c9j9Ifwk2nGO0WighAXArYvRMiOYcYAeXkXw2zW6CUFt-hO2XTeDBX1BD4TR5qD5M10ys-TIP7mMLx"
    },
    { name: "John Doe", role: "Design Lead", skills: ["UI/UX", "Branding"], image: "" },
    { name: "Jane Smith", role: "Tech Lead", skills: ["React", "Node.js"], image: "" },
    { name: "Alex Johnson", role: "Events", skills: ["Planning", "Social"], image: "" },
    { name: "Emily Davis", role: "Marketing", skills: ["Social Media", "Copy"], image: "" },
    { name: "Michael Brown", role: "Manager", skills: ["Agile", "Scrum"], image: "" },
    { name: "Sarah Wilson", role: "AI Research", skills: ["Python", "TensorFlow"], image: "" },
    { name: "David Martinez", role: "Web Dev", skills: ["Frontend", "Tailwind"], image: "" },
    { name: "Jessica Taylor", role: "Design", skills: ["Illustrator", "Figma"], image: "" },
    { name: "Thomas Anderson", role: "Data", skills: ["SQL", "Pandas"], image: "" },
    { name: "Laura White", role: "Content", skills: ["Video", "Editing"], image: "" },
    { name: "James Harris", role: "Workshop", skills: ["Speaking", "Teaching"], image: "" },
    { name: "Olivia Martin", role: "Community", skills: ["Discord", "Engagement"], image: "" }
  ];

  const visibleMembers = showAllMembers ? TEAM_MEMBERS : TEAM_MEMBERS.slice(0, 5);

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 font-body">
      {/* Hero Section */}
      <section 
        className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden -mt-16 bg-[#e6e0f4] bg-[length:100%_auto] md:bg-cover bg-top md:bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-[#ffffff]/20 dark:bg-[#000000]/70 backdrop-blur-[1px] md:backdrop-blur-none z-10 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center w-full px-6 mb-16 md:mb-20 mt-12 md:mt-24">
          <h1 className="font-display font-black text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] tracking-[-0.04em] text-black uppercase leading-[0.85] drop-shadow-sm mb-8">
            MIRAI<br />CLUB
          </h1>
          
          <p className="font-body text-base md:text-xl text-black/90 dark:text-white/90 mb-12 max-w-2xl leading-relaxed font-medium backdrop-blur-md bg-white/20 dark:bg-black/20 px-8 py-5 rounded-3xl border border-white/30 dark:border-black/30 shadow-sm">
            {t('home_build')} AI. {t('home_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto">
            <Link to="/recruitment" className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] hover:bg-secondary dark:hover:bg-secondary hover:text-white transition-all hover:scale-105 duration-300 shadow-xl">
              {t('home_join')}
            </Link>
            <Link to="/events" className="w-full sm:w-auto bg-white/40 dark:bg-black/40 backdrop-blur-md text-black dark:text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] border border-black/20 dark:border-white/20 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all hover:scale-105 duration-300 shadow-lg">
              {t('home_explore')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
          <span className="font-accent text-[10px] uppercase tracking-widest text-black">Scroll</span>
          <span className="material-symbols-outlined text-black animate-bounce text-sm">arrow_downward</span>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full overflow-hidden relative border-y border-[#5a189a] bg-[#240046] dark:bg-[#3c096c] py-8 shadow-lg">
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
      <section className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background relative overflow-hidden">
        
        {/* Scattered Stickers (Randomized Placement) */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40 md:opacity-100">
          <img src={heroSticker1} alt="Sticker 1" className="absolute top-[5%] left-[2%] md:left-[5%] w-24 h-24 md:w-40 md:h-40 object-contain transform -rotate-12" />
          <img src={heroSticker2} alt="Sticker 2" className="absolute top-[40%] right-[3%] md:right-[8%] w-20 h-20 md:w-36 md:h-36 object-contain transform rotate-[15deg]" />
          <img src={heroSticker3} alt="Sticker 3" className="absolute bottom-[10%] left-[8%] md:left-[15%] w-32 h-32 md:w-48 md:h-48 object-contain transform -rotate-6" />
          
          {/* Placeholders for the 3 future images */}
          <div className="hidden md:block absolute top-[15%] right-[25%] w-24 h-24 bg-outline-variant/20 rounded-xl transform rotate-[20deg]"></div>
          <div className="hidden md:block absolute top-[60%] left-[5%] w-32 h-32 bg-outline-variant/20 rounded-full transform -rotate-[10deg]"></div>
          <div className="hidden md:block absolute bottom-[5%] right-[10%] w-28 h-20 bg-outline-variant/20 rounded-xl transform rotate-[5deg]"></div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto relative z-10">
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
            <div className="bg-surface-container rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">14</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_members')}</span>
            </div>
            <div className="bg-surface-container rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">3</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_events')}</span>
            </div>
            <div className="bg-surface-container rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
              <span className="text-4xl sm:text-5xl font-accent font-bold text-black mb-1">3</span>
              <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-on-surface-variant">{t('stats_projects')}</span>
            </div>
            <div className="bg-surface-container rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]">
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
          
          <div className="relative">
            <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-700 ease-in-out ${!showAllMembers ? 'max-h-[850px]' : 'max-h-[3000px]'}`}>
              {visibleMembers.map((member, idx) => (
                <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col md:flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-6 py-6 gap-6 h-[150px]">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 text-center md:text-left">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-variant/80 shrink-0 border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface-variant font-display text-xl font-bold">
                      {member.image ? (
                        <img alt={member.name} className="w-full h-full object-cover" src={member.image} />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2">
                        <h3 className="text-2xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
                        <span className="font-accent text-[10px] font-semibold bg-surface-variant/40 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/20">{member.role}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
                        <span className="font-body text-xs font-medium text-on-surface-variant">{t('team_skills')}:</span>
                        {member.skills.map((skill, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="font-body text-xs font-semibold text-secondary uppercase">{skill}</span>
                            {sIdx < member.skills.length - 1 && <span className="font-body text-xs font-medium text-outline">|</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-40 mt-4 md:mt-0">
                    <a className="py-2.5 px-4 bg-black text-white hover:bg-secondary rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">LinkedIn <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
                    <a className="py-2.5 px-4 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1" href="#">GitHub <span className="material-symbols-outlined text-sm">arrow_outward</span></a>
                  </div>
                </div>
              ))}
            </div>

            {!showAllMembers && (
              <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none z-10"></div>
            )}
            
            <div className={`w-full flex justify-center relative z-20 ${!showAllMembers ? '-mt-6' : 'mt-12'}`}>
              <button 
                onClick={() => setShowAllMembers(!showAllMembers)}
                className="group flex flex-col items-center justify-center gap-2 text-on-surface hover:text-secondary transition-colors"
              >
                <span className="font-body font-bold text-sm uppercase tracking-[0.2em] bg-surface px-4">
                  {showAllMembers ? "Collapse Team" : "Meet all the team"}
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:text-secondary transition-colors group-hover:-translate-y-1">
                  <span className={`material-symbols-outlined transition-transform duration-300 ${showAllMembers ? 'rotate-180' : ''}`}>
                    arrow_downward
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current projects */}
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative overflow-hidden">
        {/* Wide lamp source lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[120%] md:w-[100%] h-[500px] bg-[#9d4edd] opacity-[0.15] dark:opacity-[0.15] blur-[100px] md:blur-[150px] rounded-[100%] pointer-events-none z-0"></div>
        
        <div className="w-full max-w-[1400px] mx-auto relative z-10 group">
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

      {/* Final CTA Section */}
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#9d4edd] rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-[#5a189a] rounded-full blur-[100px] opacity-[0.07]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left w-full max-w-[1200px] mx-auto gap-16 md:gap-32">
          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line">
            {t('home_cta_title')}
          </h2>
          
          <Link to="/recruitment" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full transition-transform duration-500 hover:scale-105 shrink-0 bg-[#240046] shadow-xl hover:bg-[#3c096c]">
             {/* The Spinning Circular Text */}
             <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text className="font-display font-black text-[12px] fill-[#c77dff] uppercase tracking-[0.2em]">
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')} • {t('home_join_circle')} • {t('home_join_circle')} • 
                 </textPath>
               </text>
             </svg>
             
             {/* The Static Arrow in the Middle */}
             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] z-10 transition-colors">
               <span className="material-symbols-outlined text-5xl md:text-7xl transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                 arrow_outward
               </span>
             </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
