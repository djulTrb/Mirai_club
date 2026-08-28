import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the textPath contents and styling
old_svg_text = """               <text className="font-display font-black text-[8px] fill-[#c77dff] dark:fill-white capitalize tracking-[0.3em]">
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')} • {t('home_join_circle')} • {t('home_join_circle')} • 
                 </textPath>
               </text>"""

new_svg_text = """               <text className="font-display font-black text-[9px] fill-[#c77dff] dark:fill-white capitalize tracking-[0.35em]" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')} • {t('home_join_circle')} • 
                 </textPath>
               </text>"""

text = text.replace(old_svg_text, new_svg_text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
