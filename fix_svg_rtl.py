import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_svg_text = re.search(r'<text className=\{`font-display.*?<\/text>', text, re.DOTALL).group(0)

new_svg_text = """<text className={`font-display font-black text-[10.5px] fill-[#c77dff] dark:fill-white capitalize tracking-[0.1em] ${i18n.language?.startsWith('ar') ? 'font-sans' : ''}`} style={{ fontFamily: i18n.language?.startsWith('ar') ? 'system-ui, sans-serif' : 'Bricolage Grotesque, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%" textLength="236" lengthAdjust="spacing">
                   {t('home_join_circle')} &bull; {t('home_join_circle')} &bull; 
                 </textPath>
               </text>"""

text = text.replace(old_svg_text, new_svg_text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
