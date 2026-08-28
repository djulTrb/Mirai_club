import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace('h-auto snap-center shrink-0', 'h-auto snap-start shrink-0')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
