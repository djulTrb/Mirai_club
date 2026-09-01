import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import PageTitleBlob from '../components/ui/PageTitleBlob';
import { usePageEntrance } from '../hooks/usePageEntrance';

const DUMMY_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlecgydWoEYN3h3-kduNhiESu3DpgwkvOKDaPnEpwLo555wsd1PqgW8egzU0lcTBmPM6JZq-NpYPcrLWDrfaR67_v4BLcsoWSCDLSgYcAJtpa3sa5CujNk4Il-9nxKSJ9HayWSn0HBkdagWRfynzjFKr5OkBNgD_kp5XNAGRrk0r2VpVT9nQcYNHlWzUWn1jhfJ-GfALzzfOlKTh-t2bXckB6Wlght5hh68NlxMU_9t13QeyPv8VYyChjqq3E-72EiLg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIU7DXVGhLTvu5SQ9jeBh_5LBUN6oz6p1eYLjOlMHqbg0Yw7t4WKqVNE4hTBPqryOG694CrKZGB5iyOA4-vHMedFwZgITTKcVZv2N-7OuvXZQppHV5AsgWTZXWCYOcnGQ8Fjqzb-Py6PViLSb-gg_1DiKnLJU8NI7TfQEYij5Tu4-hSFSyjgeBKcdV_Ohjs-Gm-0WacZjnRyGO5rs5hYi8Jq9QVnK8BoFcVd7yu3kAOCMP-occR1wW4ElRVWL0kkyj4Cc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBc3NfbPsOTPBIeO9tc09MXmHjTSEPl5bD3zly9MRvLIfkcCfc-rVGcxW0xk4N8SdpzwJX82JCV4Np5Mt-ijbVDk8xC6T-CivUK19elmM3tTHd9QEvMsR949NNgZljq53ZrlcDvvLtpS16r4GwTFmAaB7pC-e18_-ykLCLbq0YWS9bBDB_kag6uuCTR0p0uo3TSadA-G4a2k2iIJrioWOFlC5LEG5dz5zyDGs-kbQTgFnI_t88Pyaljk6JUpZ16BPrzSIY",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
];

import api from '../lib/api';

const Gallery = () => {
  
  const containerRef = usePageEntrance();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/gallery/albums/');
        setAlbums(response.data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);
  
  const displayImages = selectedAlbumId 
    ? albums.find(a => a.id === selectedAlbumId)?.images || []
    : albums.flatMap(a => a.images);

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full py-16 bg-background font-body">
      <Helmet>
        <title>Gallery | Mirai Club</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col relative z-10 gap-4 items-center">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative" ref={containerRef}>
          <PageTitleBlob />
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">{t('gallery_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('gallery_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('gallery_desc')}
          </p>
        </div>
        
        <div className="w-full flex overflow-x-auto gap-3 mb-8 pb-4 scrollbar-hide justify-start md:justify-center flex-nowrap md:flex-wrap snap-x px-2 md:px-0">
          <button 
            onClick={() => setSelectedAlbumId(null)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-colors whitespace-nowrap snap-start ${selectedAlbumId === null ? 'bg-[#9D4EDD] text-white shadow-sm' : 'border border-outline-variant/40 text-on-surface hover:bg-surface-variant'}`}
          >
            All
          </button>
          {albums.map(album => (
            <button 
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-colors whitespace-nowrap snap-start ${selectedAlbumId === album.id ? 'bg-[#9D4EDD] text-white shadow-sm' : 'border border-outline-variant/40 text-on-surface hover:bg-surface-variant'}`}
            >
              {album.title}
            </button>
          ))}
        </div>
        
        {displayImages.length === 0 ? (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4 bg-surface-container-low rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">photo_library</span>
            <p className="font-body font-semibold text-sm text-on-surface-variant uppercase tracking-widest text-center px-4">No images available in this album yet.</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayImages.map((imgObj, index) => {
              const imgSrc = typeof imgObj === 'string' ? imgObj : imgObj.image;
              return (
                <div 
                  key={index} 
                  className="group relative w-full aspect-[4/3] bg-surface-variant rounded-3xl border border-outline-variant/30 overflow-hidden cursor-pointer hover:border-[#9D4EDD] hover:shadow-md transition-all duration-300"
                  onClick={() => setSelectedImage(imgSrc)}
                >
                  <img src={imgSrc} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Lightbox / Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-10"
            onClick={() => setSelectedImage(null)}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      </main>
  );
};

export default Gallery;
