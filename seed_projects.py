import re

default_projects_str = """const defaultProjects = [
        { id: 1, title: 'Sentiment Analyzer DZ', category: 'NLP', description: 'Analyse de sentiments sur le dialecte algérien. Modèle BERT fine-tuné.', link: '#' },
        { id: 2, title: 'Détection Objets Temps Réel', category: 'VISION', description: 'Système de détection basé sur YOLOv8 pour applications locales.', link: '#' },
        { id: 3, title: 'Prédiction Agricole Locale', category: 'ML', description: "Modèle de prédiction de rendements pour l'agriculture en Kabylie.", link: '#' },
        { id: 4, title: 'Smart Campus Assistant', category: 'AI', description: 'Chatbot intelligent multilingue pour guider les étudiants sur le campus universitaire.', link: '#' }
      ];"""

# 1. Update Home.jsx
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

old_effect = """  useEffect(() => {
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Temporarily clear it out so empty state shows as requested
      setProjects([]); 
    }
  }, []);"""

new_effect = f"""  useEffect(() => {{
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {{
      setProjects(JSON.parse(saved));
    }} else {{
      {default_projects_str}
      setProjects(defaultProjects);
      localStorage.setItem('mirai_projects', JSON.stringify(defaultProjects));
    }}
  }}, []);"""

home = home.replace(old_effect, new_effect)
with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)


# 2. Update Admin.jsx
with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    admin = f.read()

old_admin_effect = """  useEffect(() => {
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);"""

new_admin_effect = f"""  useEffect(() => {{
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {{
      setProjects(JSON.parse(saved));
    }} else {{
      {default_projects_str}
      setProjects(defaultProjects);
      localStorage.setItem('mirai_projects', JSON.stringify(defaultProjects));
    }}
  }}, []);"""

admin = admin.replace(old_admin_effect, new_admin_effect)
with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.write(admin)
