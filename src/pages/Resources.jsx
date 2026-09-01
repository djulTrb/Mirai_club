import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageTitleBlob from '../components/ui/PageTitleBlob';
import { usePageEntrance } from '../hooks/usePageEntrance';

import api from '../lib/api';

const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('pdf')) return 'picture_as_pdf';
  if (cat.includes('course') || cat.includes('support')) return 'description';
  if (cat.includes('tutorial')) return 'terminal';
  if (cat.includes('presentation')) return 'present_to_all';
  if (cat.includes('link')) return 'link';
  return 'folder';
};

const getCategoryAction = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('link')) return { icon: 'open_in_new', text: 'Visit' };
  if (cat.includes('tutorial')) return { icon: 'visibility', text: 'View' };
  return { icon: 'download', text: 'Download' };
};

const Resources = () => {
  
  const containerRef = usePageEntrance();
  const { t } = useTranslation();
  
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get('/resources/');
        setResources(response.data);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      }
    };
    fetchResources();
  }, []);

  const categories = ['All', ...new Set(resources.map(r => r.categorie))];
  
  const displayedResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.categorie === selectedCategory);

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
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-colors snap-start whitespace-nowrap ${selectedCategory === cat ? 'bg-[#9D4EDD] text-white shadow-sm' : 'border border-outline-variant text-on-surface hover:bg-[#9D4EDD] hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {displayedResources.length === 0 ? (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4 bg-surface-container-low rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">folder_open</span>
            <p className="font-body font-semibold text-sm text-on-surface-variant uppercase tracking-widest text-center px-4">No resources available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {displayedResources.map(resource => {
              const action = getCategoryAction(resource.categorie);
              return (
                <div key={resource.id} className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#9D4EDD]">{getCategoryIcon(resource.categorie)}</span>
                    </div>
                    <span className="font-accent font-semibold text-[11px] uppercase tracking-wider text-[#9D4EDD]">{resource.categorie}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-black tracking-tight mb-2">{resource.titre}</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">{resource.description}</p>
                  </div>
                  <a href={resource.fichier || resource.lien || '#'} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-center sm:justify-start gap-2 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider hover:opacity-70">
                    <span className="material-symbols-outlined text-sm">{action.icon}</span> {action.text}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      </main>
  );
};

export default Resources;
