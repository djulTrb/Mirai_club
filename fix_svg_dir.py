import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Force LTR direction on the SVG text so it always draws normally even if document is RTL
old_svg = re.search(r'<text className="font-accent font-black text-\[10px\].*?<\/text>', text, re.DOTALL).group(0)

new_svg = """<text dir="ltr" className="font-accent font-black text-[10px] fill-[#c77dff] dark:fill-white tracking-widest" style={{ direction: 'ltr', fontFamily: 'Sora, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')}
                 </textPath>
                 <textPath href="#circlePath" startOffset="50%">
                   {t('home_join_circle')}
                 </textPath>
               </text>"""

text = text.replace(old_svg, new_svg)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
