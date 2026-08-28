import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update H2 (remove capitalize, add brDesktop)
old_h2 = re.search(r'<h2 className="font-display.*?<\/h2>', text, re.DOTALL).group(0)

# Notice we removed 'capitalize' from className
new_h2 = """<h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line">
            <Trans 
              i18nKey="home_cta_title"
              components={{
                pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                br: <br />,
                brDesktop: <br className="hidden md:block" />
              }}
            />
          </h2>"""
text = text.replace(old_h2, new_h2)

# 2. Update CTA SVG text (font-accent, tighter tracking, Sora font)
old_svg = re.search(r'<text className="font-display.*?<\/text>', text, re.DOTALL).group(0)

new_svg = """<text className="font-accent font-black text-[10px] fill-[#c77dff] dark:fill-white tracking-widest" style={{ fontFamily: 'Sora, sans-serif' }}>
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
