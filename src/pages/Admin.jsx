import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DUMMY_EVENTS = [
  { id: 1, title: 'AI Workshop', date: '2024-03-15', snippet: 'Intro to GenAI', details: 'Full details here', location: 'Lab 1', deadline: '2024-03-10' },
  { id: 2, title: 'Hackathon 2024', date: '2024-04-20', snippet: 'Build the future', details: 'Join us for 48 hours...', location: 'Main Hall', deadline: '2024-04-15' }
];

const DUMMY_GALLERIES = [
  { 
    id: 1, 
    title: 'Hackathon 2023', 
    images: [
      { id: 101, url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=200&fit=crop' },
      { id: 102, url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=200&fit=crop' },
      { id: 103, url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop' },
    ] 
  },
  { 
    id: 2, 
    title: 'Workshop AI', 
    images: [
      { id: 201, url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop' },
      { id: 202, url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=200&fit=crop' },
    ] 
  }
];

const Admin = () => {
  const { t } = useTranslation();
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [events, setEvents] = useState(DUMMY_EVENTS);
  const [, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', link: '' });
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('mirai_projects');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    const defaultProjects = [
      { id: 1, title: 'Sentiment Analyzer DZ', category: 'NLP', description: 'Analyse de sentiments sur le dialecte algA©rien. ModA¨le BERT fine-tunA©.', link: '#' },
      { id: 2, title: 'DA©tection Objets Temps RA©el', category: 'VISION', description: 'SystA¨me de dA©tection basA© sur YOLOv8 pour applications locales.', link: '#' },
      { id: 3, title: 'PrA©diction Agricole Locale', category: 'ML', description: "ModA¨le de prA©diction de rendements pour l'agriculture en Kabylie.", link: '#' },
      { id: 4, title: 'Smart Campus Assistant', category: 'AI', description: 'Chatbot intelligent multilingue pour guider les A©tudiants sur le campus universitaire.', link: '#' }
    ];
    return defaultProjects;
  });

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('mirai_projects', JSON.stringify(newProjects));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const project = { ...newProject, id: Date.now() };
    saveProjects([...projects, project]);
    setNewProject({ title: '', category: '', description: '', link: '' });
  };

  const handleDeleteProject = (id) => {
    saveProjects(projects.filter(p => p.id !== id));
    setSelectedProject(null);
  };

  const [galleries, setGalleries] = useState(DUMMY_GALLERIES);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    const status = localStorage.getItem('mirai_recruitment_status');
    if (status === 'open') {
      setIsRecruitmentOpen(true);
    }
  }, []);

  useEffect(() => {
    if (selectedEvent || selectedGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent, selectedGallery]);

  const toggleRecruitment = () => {
    const newState = !isRecruitmentOpen;
    setIsRecruitmentOpen(newState);
    localStorage.setItem('mirai_recruitment_status', newState ? 'open' : 'closed');
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    setSelectedEvent(null);
  };

  const handleDeleteGallery = (id) => {
    setGalleries(galleries.filter(g => g.id !== id));
    setSelectedGallery(null);
  };

  const handleDeleteImage = (galleryId, imageId) => {
    setGalleries(galleries.map(g => {
      if (g.id === galleryId) {
        return { ...g, images: g.images.filter(img => img.id !== imageId) };
      }
      return g;
    }));
    if (selectedGallery && selectedGallery.id === galleryId) {
      setSelectedGallery({
        ...selectedGallery,
        images: selectedGallery.images.filter(img => img.id !== imageId)
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full py-16 bg-background font-body">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-24 pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-2">{t('admin_portal', 'Backoffice Portal')}</span>
        <h1 className="text-black mb-4 text-center font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight">{t('admin_title', 'Admin Page')}</h1>
        <p className="font-body text-base text-on-surface-variant mb-8 text-center max-w-xl">{t('admin_desc', 'Manage executive members, calendar events, media galleries, and public learning resources.')}</p>
        
        <div className="w-full flex flex-col gap-8 max-w-[1400px]">
          
          {/* Recruitment Toggle */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-black tracking-tight mb-1">{t('admin_recruit_status', 'Recruitment Status')}</h2>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant">{t('admin_recruit_desc', 'Toggle whether the student recruitment application form is open or closed for public applicants.')}</p>
              </div>
              <button 
                onClick={toggleRecruitment}
                className={`px-8 py-3 text-white font-body font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 shadow-sm ${
                  isRecruitmentOpen ? 'bg-error hover:bg-error/80' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {isRecruitmentOpen ? 'block' : 'check_circle'}
                </span>
                {isRecruitmentOpen ? t('admin_recruit_close', 'Close Recruitment') : t('admin_recruit_open', 'Open Recruitment')}
              </button>
            </div>
          </div>

          {/* Manage Members */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_members_title", "Manage members")}</h2>
              <button className="px-6 py-2 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:opacity-80 transition-opacity flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm">add</span>{t("admin_member_add", "Add Member")}
              </button>
            </div>
            <div className="flex flex-col divide-y divide-outline-variant/30 border-y border-outline-variant/30">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="py-4 font-body text-black flex justify-between items-center">
                  <span className="font-medium text-sm sm:text-base">{t("admin_member_name", "Member Name")} {num}</span>
                  <div className="flex gap-4">
                    <button className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">edit</span>{t("admin_member_modify", "Modify")}
                    </button>
                    <button className="hover:text-error transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">delete</span>{t("admin_member_delete", "Delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add & Manage Event */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_events_title", "Manage Events")}</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_name", "Event Name")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_event_name_ph", "Enter event name")} type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_date", "Date")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="date" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_snippet", "Short Snippet")}</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_event_snippet_ph", "Brief summary for the event card...")} rows="2"></textarea>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_details", "Full Details")}</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_event_details_ph", "Enter full event information for the details window...")} rows="4"></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_location", "Location")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_event_location_ph", "Enter location")} type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Deadline {t("admin_event_date", "Date")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="date" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">calendar_add_on</span>{t("admin_event_add", "Add Event")}
                </button>
              </div>
            </form>

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">{t("admin_events_existing", "Existing Events")}</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {events.map((event) => (
                <div key={event.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl cursor-pointer transition-colors" onClick={() => setSelectedEvent(event)}>
                  <div>
                    <span className="font-medium text-sm sm:text-base block">{event.title}</span>
                    <span className="text-xs text-on-surface-variant">{event.date}</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          {/* Manage Projects */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_projects_title", "Manage Projects")}</h2>
            </div>
            
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Project Name</label>
                <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="Enter project name" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Category</label>
                <input required value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="e.g. NLP, VISION" type="text" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Description</label>
                <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder="Brief project summary..." rows="2"></textarea>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Link (Optional)</label>
                <input value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="https://..." type="url" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">add</span>Add Project
                </button>
              </div>
            </form>

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">Existing Projects</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {projects.length === 0 ? <p className="text-sm text-on-surface-variant py-4">No projects yet.</p> : null}
              {projects.map((project) => (
                <div key={project.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl cursor-pointer transition-colors" onClick={() => setSelectedProject(project)}>
                  <div>
                    <span className="font-medium text-sm sm:text-base block">{project.title}</span>
                    <span className="text-xs text-on-surface-variant uppercase">{project.category}</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }} className="hover:text-error transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {t("admin_gallery_title", "Manage Gallery")} */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_gallery_title", "Manage Gallery")}</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_gallery_group", "Group Title")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_gallery_group_ph", "Enter group title (e.g. Workshop 2024)")} type="text" />
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
            </form>

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">{t("admin_galleries_existing", "Existing Galleries")}</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl cursor-pointer transition-colors" onClick={() => setSelectedGallery(gallery)}>
                  <div>
                    <span className="font-medium text-sm sm:text-base block">{gallery.title}</span>
                    <span className="text-xs text-on-surface-variant">{gallery.images.length} {t("admin_gallery_images", "images")}</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">edit</span>{t("admin_gallery_edit", "Edit Album")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {t("admin_resources_title", "Manage Resources")} */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_resources_title", "Manage Resources")}</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_title", "Resource Title")}</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder={t("admin_resource_title_ph", "Enter resource title (e.g. ML Cheat Sheet)")} type="text" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_desc", "Description")}</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none" placeholder={t("admin_resource_desc_ph", "Enter resource description...")} rows="3"></textarea>
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
                <input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="https://..." type="url" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
                  <span className="material-symbols-outlined text-sm">library_add</span>{t("admin_resource_add", "Add to Resources")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}></div>
          <div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 w-10 h-10 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h2 className="font-display font-bold text-2xl mb-6">{t("admin_modal_edit_event", "Edit Event")}</h2>
            <form className="flex flex-col gap-4">
              <input defaultValue={selectedEvent.title} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="text" />
              <input defaultValue={selectedEvent.date} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="date" />
              <textarea defaultValue={selectedEvent.snippet} rows="2" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none resize-none"></textarea>
              <textarea defaultValue={selectedEvent.details} rows="4" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none resize-none"></textarea>
              <input defaultValue={selectedEvent.location} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="text" />
              
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => handleDeleteEvent(selectedEvent.id)} className="px-6 py-3 bg-red-50 text-red-600 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">delete</span> {t("admin_member_delete", "Delete")} Event
                </button>
                <button type="button" onClick={() => setSelectedEvent(null)} className="px-8 py-3 bg-[#9D4EDD] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity">
                  {t("admin_modal_save", "Save Changes")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedGallery(null)}></div>
          <div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedGallery(null)} className="absolute top-6 right-6 w-10 h-10 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h2 className="font-display font-bold text-2xl mb-2">{t("admin_modal_edit_gallery", "Edit Gallery")}</h2>
            <input defaultValue={selectedGallery.title} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none mb-6" type="text" />
            
            <h3 className="font-display font-bold text-lg mb-4">{t("admin_modal_gallery_images", "Images")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {selectedGallery.images.map(img => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-outline-variant/30">
                  <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDeleteImage(selectedGallery.id, img.id)} className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-outline-variant/30">
              <button type="button" onClick={() => handleDeleteGallery(selectedGallery.id)} className="px-6 py-3 bg-red-50 text-red-600 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">delete_forever</span> {t("admin_member_delete", "Delete")} Entire Album
              </button>
              <button type="button" onClick={() => setSelectedGallery(null)} className="px-8 py-3 bg-[#9D4EDD] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background SVG elements */}
      </main>
  );
};

export default Admin;
