with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    '<section className="px-6 md:px-24 bg-surface py-24">',
    '<section id="team-section" className="px-6 md:px-24 bg-surface py-24">'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
