import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'text className="font-display font-black text-[10px] md:text-[10px] fill-[#c77dff] dark:fill-white italic capitalize tracking-[0.2em]"',
    'text className="font-display font-black text-[8px] fill-[#c77dff] dark:fill-white capitalize tracking-[0.3em]"'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
