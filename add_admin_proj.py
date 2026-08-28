import re

with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    admin = f.read()

# 1. Add states for projects
# Find: const [events, setEvents] = useState(DUMMY_EVENTS);
states_insert = """
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', link: '' });

  useEffect(() => {
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

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
"""

admin = admin.replace("  const [events, setEvents] = useState(DUMMY_EVENTS);", "  const [events, setEvents] = useState(DUMMY_EVENTS);" + states_insert)

# 2. Add the JSX section
# We will insert it before {/* {t("admin_gallery_title", "Manage Gallery")} */}
projects_jsx = """
          {/* Manage Projects */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_projects_title", "Manage Projects")}</h2>
            </div>
            
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Project Name</label>
                <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="Enter project name" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Category</label>
                <input required value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="e.g. NLP, VISION" type="text" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Description</label>
                <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-secondary outline-none transition-all resize-none" placeholder="Brief project summary..." rows="2"></textarea>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Link (Optional)</label>
                <input value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="https://..." type="url" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button className="px-8 py-3 bg-secondary text-white font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 shadow-sm" type="submit">
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
"""

admin = admin.replace('{/* {t("admin_gallery_title", "Manage Gallery")} */}', projects_jsx + '\n          {/* {t("admin_gallery_title", "Manage Gallery")} */}')


with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.write(admin)

