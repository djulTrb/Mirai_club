import re

with open('src/components/BackToTop.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Change border from border-[2.5px] border-outline-variant/60 to border border-black dark:border-white
text = text.replace(
    'border-[2.5px] border-outline-variant/60',
    'border border-black dark:border-white'
)
# also replace dark:border-outline-variant/40 which might exist
text = text.replace(
    'dark:border-outline-variant/40 ',
    ''
)

with open('src/components/BackToTop.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
