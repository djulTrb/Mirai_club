import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update SVG text in CTA Button
old_svg_text = re.search(r'<text className=\{`font-display.*?<\/text>', text, re.DOTALL).group(0)

# We use text-[14px], tracking-normal. 
# And remove the &bull;
new_svg_text = """<text className={`font-display font-black text-[14px] fill-[#c77dff] dark:fill-white capitalize tracking-normal ${i18n.language?.startsWith('ar') ? 'font-sans' : ''}`} style={{ fontFamily: i18n.language?.startsWith('ar') ? 'system-ui, sans-serif' : 'Bricolage Grotesque, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%" textLength="236" lengthAdjust="spacing">
                   {t('home_join_circle')}          {t('home_join_circle')}          
                 </textPath>
               </text>"""

text = text.replace(old_svg_text, new_svg_text)


# 2. Update the Pills
old_h2 = re.search(r'<h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-\[5\.5rem\].*?<\/h2>', text, re.DOTALL).group(0)

# Make pill2 identical to pill1 (w-24 md:w-36), and add -translate-y-2 to both for vertical alignment tweaking.
new_h2 = """<h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line uppercase">
            <Trans 
              i18nKey="home_cta_title"
              components={{
                pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                br: <br />
              }}
            />
          </h2>"""

text = text.replace(old_h2, new_h2)


# 3. Apply noise to the CTA Section wrapper
# The wrapper is `<div className="relative z-10 flex flex-col md:flex-row items-center justify-center ...">`
# Actually, the section itself is `<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">`
# I'll add the noise absolute div right after the first `div` in the section:
# `<div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">`
# This div already contains the blur blobs for the CTA section. I will add the noise SVG here!

old_blur_blobs = """        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#9d4edd] rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-[#5a189a] rounded-full blur-[100px] opacity-[0.07]"></div>
        </div>"""

new_blur_blobs = """        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Noise overlay specific to CTA section */}
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.4] z-0">
            <svg className="w-full h-full">
              <filter id="ctaNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#ctaNoise)"></rect>
            </svg>
          </div>
          
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#9d4edd] rounded-full blur-[120px] opacity-10 z-0"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-[#5a189a] rounded-full blur-[100px] opacity-[0.07] z-0"></div>
        </div>"""

text = text.replace(old_blur_blobs, new_blur_blobs)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
