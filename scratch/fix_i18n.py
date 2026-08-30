import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

# English
content = content.replace('\"Practical workshops and training on machine learning, deep learning, and essential toolchains.\"', '\"Practical workshops and training on machine learning,<br/>deep learning, and essential toolchains.\"')
content = content.replace('\"Representing Tizi Ouzou in national hackathons and innovative AI competitions.\"', '\"Representing Tizi Ouzou in national hackathons<br/>and innovative AI competitions.\"')
content = content.replace('\"An active community of passionate university students, open to all skill levels.\"', '\"An active community of passionate university students,<br/>open to all skill levels.\"')
content = content.replace('\"Concrete projects, from prototyping to deployment, developed collaboratively in teams.\"', '\"Concrete projects, from prototyping to deployment,<br/>developed collaboratively in teams.\"')

# French
content = content.replace('\"Ateliers pratiques et formations sur le machine learning, le deep learning et les outils essentiels.\"', '\"Ateliers pratiques et formations sur le machine learning,<br/>le deep learning et les outils essentiels.\"')
content = content.replace('\"Représenter Tizi Ouzou dans les hackathons nationaux et compétitions IA.\"', '\"Représenter Tizi Ouzou dans les hackathons<br/>nationaux et compétitions IA.\"')
content = content.replace('\"Une communauté active d\'étudiants passionnés, ouverte à tous les niveaux.\"', '\"Une communauté active d\'étudiants passionnés,<br/>ouverte à tous les niveaux.\"')
content = content.replace('\"Des projets concrets, du prototypage au déploiement, développés en équipe.\"', '\"Des projets concrets, du prototypage au déploiement,<br/>développés en équipe.\"')

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated i18n.js')
