import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Arrow Animation
old_arrow = """             {/* The Static Arrow in the Middle */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="material-symbols-outlined text-4xl text-[#c77dff] dark:text-white">
                 arrow_outward
               </span>
             </div>"""

new_arrow = """             {/* The Static Arrow in the Middle */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="material-symbols-outlined text-4xl text-[#c77dff] dark:text-white animate-eager group-hover:animate-none">
                 arrow_outward
               </span>
             </div>"""
text = text.replace(old_arrow, new_arrow)


# 2. Update Projects Section
old_proj = """      {/* Current Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-24 bg-surface relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-on-surface mb-16 text-center">{t('proj_title')}</h2>"""

new_proj = """      {/* Current Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-24 bg-surface relative overflow-hidden">
        
        {/* Decorative Noisy Blob */}
        <div className="absolute top-[8%] md:top-[12%] left-[50%] -translate-x-1/2 w-96 h-96 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c77dff] opacity-[0.12] dark:opacity-20 blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-50 dark:opacity-40" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
            <svg className="w-full h-full">
              <filter id="projBlobNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#projBlobNoise)"></rect>
            </svg>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-on-surface mb-16 text-center">{t('proj_title')}</h2>"""

text = text.replace(old_proj, new_proj)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
