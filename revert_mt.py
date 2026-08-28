import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("-mt-24", "-mt-16")

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
