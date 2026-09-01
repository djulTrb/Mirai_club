const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/Rw/Downloads/scrapy/bookshelf_scraper/mirai-club/src/pages/Admin.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Replace imports and dummy data
content = content.replace(/import React.*?;\nimport \{ useTranslation \} from 'react-i18next';\n/g, 
`import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';\n`);

content = content.replace(/const DUMMY_EVENTS[\s\S]*?\];\n/g, '');
content = content.replace(/const DUMMY_GALLERIES[\s\S]*?\];\n/g, '');

// 2. Replace state and useEffect
const stateToReplaceRegex = /const Admin = \(\) => \{[\s\S]*?const handleDeleteImage = \(galleryId, imageId\) => \{[\s\S]*?\}\s*\};\s*const handleLogout = \(\) => \{\s*localStorage\.removeItem\('adminAuth'\);\s*window\.location\.href = '\/';\s*\};/g;

const newStateCode = `const Admin = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [galleries, setGalleries] = useState([]);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', snippet: '', details: '', location: '', deadline: '' });
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', link: '' });
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newResource, setNewResource] = useState({ title: '', description: '', link: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get('/accounts/me/');
        
        const [eventsRes, projectsRes, galleriesRes, recruitmentRes] = await Promise.all([
          api.get('/events/').catch(() => ({ data: [] })),
          api.get('/website/projects/').catch(() => ({ data: [] })),
          api.get('/gallery/albums/').catch(() => ({ data: [] })),
          api.get('/recruitment/settings/').catch(() => ({ data: {} }))
        ]);
        
        setEvents(eventsRes.data || []);
        setProjects(projectsRes.data || []);
        setGalleries(galleriesRes.data || []);
        
        const phase = recruitmentRes.data?.phase || (Array.isArray(recruitmentRes.data) && recruitmentRes.data[0]?.phase);
        setIsRecruitmentOpen(phase === 'ouvert');
      } catch (err) {
        console.error('Auth error or API error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = '/admin-auth';
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedEvent || selectedGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent, selectedGallery]);

  const handleLogout = async () => {
    try {
      await api.post('/accounts/logout/');
    } catch (err) {
      console.error(err);
    } finally {
      window.location.href = '/admin-auth';
    }
  };

  const toggleRecruitment = async () => {
    try {
      const newPhase = isRecruitmentOpen ? 'ferme' : 'ouvert';
      await api.post('/recruitment/settings/', { phase: newPhase }).catch(async () => {
         await api.patch('/recruitment/settings/', { phase: newPhase });
      });
      setIsRecruitmentOpen(!isRecruitmentOpen);
    } catch (err) {
      console.error(err);
      setIsRecruitmentOpen(!isRecruitmentOpen); 
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/events/', newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ title: '', date: '', snippet: '', details: '', location: '', deadline: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(\`/events/\${id}/\`);
      setEvents(events.filter(ev => ev.id !== id));
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const res = await api.post('/website/projects/', newProject);
      setProjects([...projects, res.data]);
      setNewProject({ title: '', category: '', description: '', link: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(\`/website/projects/\${id}/\`);
      setProjects(projects.filter(p => p.id !== id));
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle) return;
    try {
      const res = await api.post('/gallery/albums/', { title: newGalleryTitle });
      setGalleries([...galleries, { ...res.data, images: [] }]);
      setNewGalleryTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id) => {
    try {
      await api.delete(\`/gallery/albums/\${id}/\`);
      setGalleries(galleries.filter(g => g.id !== id));
      setSelectedGallery(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async (galleryId, imageId) => {
    try {
      await api.delete(\`/gallery/images/\${imageId}/\`);
      setGalleries(galleries.map(g => {
        if (g.id === galleryId) {
          return { ...g, images: (g.images || []).filter(img => img.id !== imageId) };
        }
        return g;
      }));
      if (selectedGallery && selectedGallery.id === galleryId) {
        setSelectedGallery({
          ...selectedGallery,
          images: (selectedGallery.images || []).filter(img => img.id !== imageId)
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titre: newResource.title,
        description: newResource.description,
        fichier_url: newResource.link,
        type_ressource: 'DOCUMENT'
      };
      await api.post('/resources/', payload);
      setNewResource({ title: '', description: '', link: '' });
      alert("Resource added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center w-full h-screen bg-background font-body">
        <div className="w-16 h-16 border-4 border-[#9D4EDD] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }`;

content = content.replace(stateToReplaceRegex, newStateCode);

// Add Logout button in UI
content = content.replace(
  /<div className="max-w-\[1400px\] mx-auto w-full px-6 md:px-24 pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">/,
  `<div className="max-w-[1400px] mx-auto w-full px-6 md:px-24 pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="absolute top-8 right-8 z-20">
          <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-600 font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-sm">logout</span> Logout
          </button>
        </div>`
);

// Update forms with onSubmit and value/onChange
// Add Event Form
content = content.replace(
  /<form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant\/30 pb-8">([\s\S]*?)<\/form>/,
  `<form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_name", "Event Name")}</label>
                <input required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_event_name_ph", "Enter event name")} type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_date", "Date")}</label>
                <input required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="date" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_snippet", "Short Snippet")}</label>
                <textarea required value={newEvent.snippet} onChange={e => setNewEvent({...newEvent, snippet: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_event_snippet_ph", "Brief summary for the event card...")} rows="2"></textarea>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_details", "Full Details")}</label>
                <textarea required value={newEvent.details} onChange={e => setNewEvent({...newEvent, details: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_event_details_ph", "Enter full event information for the details window...")} rows="4"></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_location", "Location")}</label>
                <input required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_event_location_ph", "Enter location")} type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Deadline {t("admin_event_date", "Date")}</label>
                <input required value={newEvent.deadline} onChange={e => setNewEvent({...newEvent, deadline: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="date" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">calendar_add_on</span>{t("admin_event_add", "Add Event")}
                </button>
              </div>
            </form>`
);

// Update Gallery form
content = content.replace(
  /<form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant\/30 pb-8">([\s\S]*?)(<div className="w-full bg-surface-container-low border border-dashed border-outline-variant\/30 rounded-2xl px-6 py-8 font-body text-sm flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors gap-2">)[\s\S]*?<\/div>\s*<\/div>([\s\S]*?)<\/form>/,
  `<form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_gallery_group", "Group Title")}</label>
                <input required value={newGalleryTitle} onChange={e => setNewGalleryTitle(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_gallery_group_ph", "Enter group title (e.g. Workshop 2024)")} type="text" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_gallery_upload", "Upload Images")}</label>
                <div className="w-full bg-surface-container-low border border-dashed border-outline-variant/30 rounded-2xl px-6 py-8 font-body text-sm flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors gap-2">
                  <span className="material-symbols-outlined text-3xl text-[#9D4EDD]">add_photo_alternate</span>
                  <span className="text-on-surface-variant/60 text-xs">{t("admin_gallery_drag", "Click or drag to upload multiple images")}</span>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">gallery_thumbnail</span>{t("admin_gallery_add", "Add to Gallery")}
                </button>
              </div>
            </form>`
);


// Add Resources Form
content = content.replace(
  /<form className="grid grid-cols-1 md:grid-cols-2 gap-6">([\s\S]*?)<\/form>/,
  `<form onSubmit={handleAddResource} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_title", "Resource Title")}</label>
                <input required value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_resource_title_ph", "Enter resource title (e.g. ML Cheat Sheet)")} type="text" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_desc", "Description")}</label>
                <textarea required value={newResource.description} onChange={e => setNewResource({...newResource, description: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_resource_desc_ph", "Enter resource description...")} rows="3"></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_pdf", "Upload PDF")}</label>
                <div className="w-full bg-surface-container-low border border-dashed border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
                  <span className="text-on-surface-variant/60 text-xs">{t("admin_resource_pdf_hint", "Click to upload PDF...")}</span>
                  <span className="material-symbols-outlined text-sm text-[#9D4EDD]">picture_as_pdf</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_link", "Resource Link")}</label>
                <input required value={newResource.link} onChange={e => setNewResource({...newResource, link: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="https://..." type="url" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">library_add</span>{t("admin_resource_add", "Add to Resources")}
                </button>
              </div>
            </form>`
);


// In galleries map, handle null images gracefully
content = content.replace(/\{gallery\.images\.length\}/g, '{gallery.images?.length || 0}');
content = content.replace(/\{selectedGallery\.images\.map/g, '{(selectedGallery.images || []).map');

// Save the rewritten content back to Admin.jsx
fs.writeFileSync(filePath, content);
console.log("Rewrote Admin.jsx!");
