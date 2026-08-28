import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_illustration.png';
import heroSticker1 from '../assets/hero_sticker_1.png';
import heroSticker2 from '../assets/hero_sticker_2.png';
import heroSticker3 from '../assets/hero_sticker_3.png';
import ctaImg1 from '../assets/cta_img_1.webp';
import heroBg from '../assets/hero_bg.png';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      const defaultProjects = [
        { id: 1, title: 'Sentiment Analyzer DZ', category: 'NLP', description: 'Analyse de sentiments sur le dialecte algérien. Modèle BERT fine-tuné.', link: '#' },
        { id: 2, title: 'Détection Objets Temps Réel', category: 'VISION', description: 'Système de détection basé sur YOLOv8 pour applications locales.', link: '#' },
        { id: 3, title: 'Prédiction Agricole Locale', category: 'ML', description: "Modèle de prédiction de rendements pour l'agriculture en Kabylie.", link: '#' },
        { id: 4, title: 'Smart Campus Assistant', category: 'AI', description: 'Chatbot intelligent multilingue pour guider les étudiants sur le campus universitaire.', link: '#' }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('mirai_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleProjectScroll = (e) => {
    if (!e.target || e.target.children.length === 0) return;
    const container = e.target;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIdx = 0;
    let minDiff = Infinity;
    
    Array.from(container.children).forEach((child, idx) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    
    if (closestIdx !== activeProjectIdx && closestIdx >= 0 && closestIdx < projects.length) {
      setActiveProjectIdx(closestIdx);
    }
  };


  const [showAllMembers, setShowAllMembers] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

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

  const visibleMembers = TEAM_MEMBERS;

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 font-body">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden -mt-16 bg-[#240046] dark:bg-[#c77dff]">
        
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center w-full px-6 mb-16 md:mb-20 mt-12 md:mt-24">
          <h1 className="font-display font-black text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] tracking-[-0.04em] text-[#c77dff] dark:text-[#3c096c] uppercase leading-[0.85] drop-shadow-sm mb-8">
            MIRAI<br />CLUB
          </h1>
          
          <p className="font-body text-base md:text-xl text-[#c77dff] dark:text-[#3c096c] mb-12 max-w-2xl leading-relaxed font-medium backdrop-blur-md bg-black/20 dark:bg-white/20 px-8 py-5 rounded-3xl border border-black/30 dark:border-white/30 shadow-sm">
            {t('home_build')} AI. {t('home_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto">
            <Link to="/recruitment" className="w-full sm:w-auto bg-[#c77dff] dark:bg-[#3c096c] text-[#240046] dark:text-[#c77dff] px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] hover:opacity-90 transition-all hover:scale-105 duration-300 shadow-xl">
              {t('home_join')}
            </Link>
            <Link to="/events" className="w-full sm:w-auto bg-white/40 dark:bg-black/40 backdrop-blur-md text-black dark:text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] border border-black/20 dark:border-white/20 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all hover:scale-105 duration-300 shadow-lg">
              {t('home_explore')}
            </Link>
          </div>
        </div>

        
      </section>

      {/* Marquee Section */}
      <section className="w-full overflow-hidden relative border-y border-[#5a189a] bg-[#240046] dark:bg-[#c77dff] py-8 shadow-lg">
        <div className="flex w-max font-display font-bold whitespace-nowrap group">
          <div className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-3xl sm:text-4xl gap-[3.3rem] font-display font-bold tracking-tight animate-marquee" style={{ animationDuration: '30s' }}>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_heritage')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_intelligence')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">{t('marquee_future')}</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c]">Mirai</span><span className="text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1">*</span>
          </div>
        </div>
      </section>

      {/* {t('mission_title')} */}
      <section className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background relative">
        
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
          <div className="w-full flex flex-col items-center mb-8 relative z-10">
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
      <section id="team-section" className="px-6 md:px-24 bg-surface py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('team_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('team_title')}</h2>
          </div>
          
          <div className="relative">
            <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-700 ease-in-out ${!showAllMembers ? 'max-h-[620px] sm:max-h-[480px]' : 'max-h-[3000px]'}`}>
              {visibleMembers.map((member, idx) => (
                <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 w-full h-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    
                    {/* MOBILE LAYOUT */}
                    <div className="flex flex-col w-full sm:hidden">
                        <div className="flex flex-row justify-between items-start w-full mb-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
                                <span className="w-fit font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display font-bold">
                                {member.image ? <img alt={member.name} className="w-full h-full object-cover" src={member.image} /> : member.name.charAt(0)}
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center mb-6">
                            <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
                            {member.skills.map((skill, sIdx) => (
                                <React.Fragment key={sIdx}>
                                    <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-wide">{skill}</span>
                                    {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-secondary/50">|</span>}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex flex-row gap-6">
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> LinkedIn
                            </a>
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> GitHub
                            </a>
                        </div>
                    </div>

                    {/* DESKTOP LAYOUT */}
                    <div className="hidden sm:flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center gap-6 flex-1">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display text-xl font-bold">
                                {member.image ? <img alt={member.name} className="w-full h-full object-cover" src={member.image} /> : member.name.charAt(0)}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-row items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
                                    <span className="font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
                                    {member.skills.map((skill, sIdx) => (
                                        <React.Fragment key={sIdx}>
                                            <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-wide">{skill}</span>
                                            {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-secondary/50">|</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 shrink-0 items-end pr-4">
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> LinkedIn
                            </a>
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> GitHub
                            </a>
                        </div>
                    </div>
                </div>
              ))}
            </div>

            {!showAllMembers && (
              <div className="absolute bottom-0 left-0 w-full h-[220px] bg-gradient-to-t from-surface via-surface/80 to-transparent pointer-events-none z-10"></div>
            )}
            
            <div className={`w-full flex justify-center relative z-20 ${!showAllMembers ? 'mt-4 sm:mt-6' : 'mt-16'}`}>
              <button 
                onClick={() => {
                  setShowAllMembers(!showAllMembers);
                  if (showAllMembers) {
                    setTimeout(() => {
                      document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }
                }}
                className="group flex flex-col items-center justify-center gap-2 text-on-surface hover:text-secondary transition-colors"
              >
                <span className="font-body font-bold text-sm uppercase tracking-[0.2em] bg-surface px-4">
                  {showAllMembers ? "Collapse Team" : "Meet all the team"}
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-1">
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
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">
        
        {/* Decorative Noisy Blob */}
        <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c77dff] opacity-40 dark:opacity-15 blur-[50px] md:blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-60 dark:opacity-30" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
            <svg className="w-full h-full">
              <filter id="projBlobNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#projBlobNoise)"></rect>
            </svg>
          </div>
        </div>
        <div className="w-full max-w-[1400px] mx-auto relative z-10 group">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('proj_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('proj_title')}</h2>
          </div>
          
          <div className="w-full relative z-10">
              {projects.length === 0 ? (
                <div className="w-full flex justify-center items-center py-16">
                  <p className="text-on-surface-variant font-body text-lg italic">No projects for the moment.</p>
                </div>
              ) : (
                <div className="w-full flex flex-col">
                  <div className="relative group/carousel">
                  <div 
                    ref={scrollRef}
                    onScroll={handleProjectScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 w-full px-4 md:px-8 pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {projects.map(proj => (
                      <div key={proj.id} className="w-full min-w-full md:min-w-[calc(50%-16px)] md:w-[calc(50%-16px)] xl:min-w-[calc(33.3333%-21.33px)] xl:w-[calc(33.3333%-21.33px)] h-auto snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card">
                        <p className="font-accent font-semibold uppercase tracking-wider text-xs text-secondary mb-4">{proj.category}</p>
                        <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">{proj.title}</h3>
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8 line-clamp-3">{proj.description}</p>
                        <a href={proj.link || '#'} className="mt-auto flex items-center gap-1 text-secondary font-body font-semibold text-xs uppercase tracking-wider w-fit hover:opacity-80">
                          {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Left Button */}
                  <button 
                      onClick={() => scroll('left')}
                      className={`absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                          : (activeProjectIdx === 0 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll left"
                    >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  {/* Right Button */}
                    <button 
                      onClick={() => scroll('right')}
                      className={`absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx === 0 ? 'hidden' : '')
                          : (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll right"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  
                  {/* Dots Indicator */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(projects.length / visibleCards) }).map((_, pageIdx) => {
                      const isActive = Math.floor(activeProjectIdx / visibleCards) === pageIdx;
                      return (
                        <button 
                          key={pageIdx}
                          onClick={() => {
                            const container = scrollRef.current;
                            const targetProjectIdx = pageIdx * visibleCards;
                            if (container && container.children[targetProjectIdx]) {
                              // We use 'start' because pages align to the left side in standard LTR, but standard behavior in RTL is also handled by 'start' (which means inline-start).
                              container.children[targetProjectIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                            }
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[#c77dff]' : 'w-2 border-[1.5px] border-outline-variant/50 bg-transparent hover:border-outline-variant'}`}
                          aria-label={`Go to page ${pageIdx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      {/* Final CTA Section */}
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center justify-center relative">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise overlay specific to CTA section */}
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.4] z-0">
            <svg className="w-full h-full">
              <filter id="ctaNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#ctaNoise)"></rect>
            </svg>
          </div>
          
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#9d4edd] rounded-full blur-[120px] opacity-10 z-0"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-[#5a189a] rounded-full blur-[100px] opacity-[0.07] z-0"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-16 md:gap-8 text-center md:text-left rtl:md:text-right">
          <h2 className={`md:col-span-2 font-display font-bold tracking-tighter whitespace-pre-line text-on-surface ${i18n.language?.startsWith('ar') ? 'text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] leading-[1.3] md:leading-[1.5]' : 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1]'}`}>
            <Trans 
              i18nKey="home_cta_title"
              components={{
                pill1: (
                  <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner">
                    <img src={ctaImg1} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      <img src={ctaImg1} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto" />
                    </div>
                  </span>
                ),
                pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner"></span>,
                br: <br />,
                brDesktop: <br className="hidden md:block" />
              }}
            />
          </h2>
          
          <div className="md:col-span-1 flex justify-center md:justify-start rtl:md:justify-end w-full">
            <Link to="/recruitment" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">
             {/* The Spinning Circular Text */}
             <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text dir="ltr" className={`font-accent font-black fill-[#c77dff] dark:fill-white ${i18n.language?.startsWith('fr') ? 'text-[9.5px] tracking-widest' : 'text-[10px] tracking-widest'}`} style={{ direction: 'ltr', fontFamily: 'Sora, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')}
                 </textPath>
                 <textPath href="#circlePath" startOffset="50%">
                   {t('home_join_circle')}
                 </textPath>
               </text>
             </svg>
             
             {/* The Static Arrow in the Middle */}
             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10">
               <span className="material-symbols-outlined text-5xl md:text-7xl">
                 arrow_outward
               </span>
             </div>
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
