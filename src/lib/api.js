// Mock API for Vercel Demo Showcase

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const DUMMY_MEMBERS = [
  {
    id: 1,
    prenom: 'Ali',
    nom: 'Benali',
    poste: 'President',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    skills: 'Leadership, Strategy',
    ordre_affichage: 1,
  },
  {
    id: 2,
    prenom: 'Sara',
    nom: 'Tech',
    poste: 'Vice President',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    skills: 'UI/UX, Product',
    ordre_affichage: 2,
  },
  {
    id: 3,
    prenom: 'Karim',
    nom: 'Dev',
    poste: 'Lead Developer',
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    skills: 'React, Node.js',
    ordre_affichage: 3,
  }
];

const DUMMY_RESOURCES = [
  { id: 1, title: 'React Guide', url: 'https://react.dev', category: 'Frontend', description: 'Official React Documentation' },
  { id: 2, title: 'Django Tutorial', url: 'https://djangoproject.com', category: 'Backend', description: 'Official Django Tutorial' },
  { id: 3, title: 'Figma Basics', url: 'https://figma.com', category: 'Design', description: 'Learn Figma' }
];

let state = {
  events: [...DUMMY_EVENTS],
  galleries: [...DUMMY_GALLERIES],
  members: [...DUMMY_MEMBERS],
  resources: [...DUMMY_RESOURCES]
};

const api = {
  get: async (url) => {
    await delay(300);
    if (url.includes('/events')) return { data: state.events };
    if (url.includes('/gallery')) return { data: state.galleries };
    if (url.includes('/team')) return { data: state.members };
    if (url.includes('/resources')) return { data: state.resources };
    
    // Auth mocking
    if (url.includes('/accounts/me')) {
      return { data: { username: 'admin', is_staff: true, is_superuser: true } };
    }
    
    return { data: [] };
  },
  post: async (url, data) => {
    await delay(400);
    if (url.includes('/accounts/login/')) {
      return { data: { success: true } };
    }
    if (url.includes('/accounts/logout/')) {
      return { data: { success: true } };
    }
    
    const newItem = { id: Math.floor(Math.random() * 10000), ...data };
    
    if (url.includes('/events')) state.events.push(newItem);
    if (url.includes('/gallery')) {
      if (url.includes('/images')) {
        // adding image to gallery
        const galId = parseInt(url.split('/')[2]);
        const gal = state.galleries.find(g => g.id === galId);
        if (gal) gal.images.push(newItem);
      } else {
        state.galleries.push({...newItem, images: []});
      }
    }
    if (url.includes('/team')) state.members.push(newItem);
    if (url.includes('/resources')) state.resources.push(newItem);

    return { data: newItem };
  },
  put: async (url, data) => {
    await delay(400);
    const id = parseInt(url.split('/').filter(Boolean).pop());
    
    if (url.includes('/team')) {
      state.members = state.members.map(m => m.id === id ? { ...m, ...data } : m);
      return { data: state.members.find(m => m.id === id) };
    }
    if (url.includes('/events')) {
      state.events = state.events.map(m => m.id === id ? { ...m, ...data } : m);
      return { data: state.events.find(m => m.id === id) };
    }
    return { data };
  },
  delete: async (url) => {
    await delay(400);
    const id = parseInt(url.split('/').filter(Boolean).pop());
    
    if (url.includes('/events')) state.events = state.events.filter(e => e.id !== id);
    if (url.includes('/team')) state.members = state.members.filter(m => m.id !== id);
    if (url.includes('/resources')) state.resources = state.resources.filter(r => r.id !== id);
    if (url.includes('/gallery')) {
      if (url.includes('/images')) {
        const parts = url.split('/').filter(Boolean);
        const galId = parseInt(parts[1]);
        const imgId = parseInt(parts[3]);
        const gal = state.galleries.find(g => g.id === galId);
        if (gal) {
          gal.images = gal.images.filter(img => img.id !== imgId);
        }
      } else {
        state.galleries = state.galleries.filter(g => g.id !== id);
      }
    }
    
    return { data: { success: true } };
  }
};

export default api;
