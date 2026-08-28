import re

# 1. Update i18n.js
with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

i18n = i18n.replace('"home_join_circle": "انضم إلى نادي Mirai"', '"home_join_circle": "Join Mirai Club"')
i18n = i18n.replace('"home_join_circle": "Rejoindre Mirai"', '"home_join_circle": "Join Mirai Club"') # Optional, but user said "removethe arabic for the button...". They didn't mention French, but "Join Mirai Club" looks best. Let's leave French as is just in case, wait, they only said "removethe arabic".

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)

# 2. Update Chatbot.jsx
with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

chat = chat.replace(
    'bg-[#240046] text-[#c77dff] shadow-',
    'bg-[#240046] text-[#c77dff] dark:bg-[#c77dff] dark:text-white shadow-'
)

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)

# 3. Update BackToTop.jsx
with open('src/components/BackToTop.jsx', 'r', encoding='utf-8') as f:
    top = f.read()

# Current: dark:bg-surface-container dark:border-white dark:text-white dark:hover:bg-[#c77dff] dark:hover:text-[#240046]
# Wait, my previous python replaced `dark:border-outline-variant/40` but let's just regex replace the whole dark classes string
top = re.sub(
    r'dark:bg-[^\s]+ dark:border-[^\s]+ dark:text-[^\s]+ dark:hover:bg-[^\s]+ dark:hover:text-[^\s]+',
    'dark:bg-white dark:border-white dark:text-black dark:hover:bg-[#c77dff] dark:hover:text-[#240046]',
    top
)
# Just in case my regex didn't match the exact classes from previous step, let's do a broader replace
# Current class string: className="w-[54px] h-[54px] rounded-full bg-white/80 backdrop-blur-md border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-surface-container dark:text-white dark:hover:bg-[#c77dff] dark:hover:text-[#240046] dark:border-white"
# Let's completely replace it:
old_class = re.search(r'className="w-\[54px\][^"]*"', top).group(0)
new_class = 'className="w-[54px] h-[54px] rounded-full bg-white/80 backdrop-blur-md border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-white dark:border-white dark:text-black dark:hover:bg-[#c77dff] dark:hover:text-[#240046]"'
top = top.replace(old_class, new_class)

with open('src/components/BackToTop.jsx', 'w', encoding='utf-8') as f:
    f.write(top)

# 4. Update Home.jsx
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Replace uppercase with capitalize
home = home.replace('whitespace-pre-line uppercase">', 'whitespace-pre-line capitalize">')

# Revert SVG text path to 0% and 50%
old_svg_text = re.search(r'<text className=\{`font-display.*?<\/text>', home, re.DOTALL).group(0)

new_svg_text = """<text className="font-display font-black text-[10.5px] fill-[#c77dff] dark:fill-white tracking-[0.2em]" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')}
                 </textPath>
                 <textPath href="#circlePath" startOffset="50%">
                   {t('home_join_circle')}
                 </textPath>
               </text>"""

home = home.replace(old_svg_text, new_svg_text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)

