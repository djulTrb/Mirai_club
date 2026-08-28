import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Decorative Noisy Blob to Projects section
# I will find the start of the Projects section
proj_start_match = re.search(r'\{/\* Current Projects Section \*/\}\s*<section.*?id="projects".*?>', text, re.DOTALL)
if proj_start_match:
    original = proj_start_match.group(0)
    blob_html = """
        {/* Decorative Noisy Blob */}
        <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c77dff] opacity-40 dark:opacity-40 blur-[50px] md:blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-60 dark:opacity-50" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
            <svg className="w-full h-full">
              <filter id="projBlobNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#projBlobNoise)"></rect>
            </svg>
          </div>
        </div>
"""
    new_start = original + blob_html
    text = text.replace(original, new_start)
else:
    print("Failed to find Projects Section")


# 2. Make the Projects gap smaller on mobile (gap-4 md:gap-8)
old_gap = '<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">'
new_gap = '<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full relative z-10">'
text = text.replace(old_gap, new_gap)

# 3. Add z-10 to the wrapper containing mission_title and proj_title to make sure they are above the blob
old_title_wrap = '<div className="w-full flex flex-col items-center mb-8">'
new_title_wrap = '<div className="w-full flex flex-col items-center mb-8 relative z-10">'
text = text.replace(old_title_wrap, new_title_wrap)


# 4. Move animate-eager to the DIV in the CTA section
# It is currently on the span. I will remove it from the span and put it on the wrapper.
old_arrow = r'<div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-\[#c77dff\] dark:text-white z-10">\s*<span className="material-symbols-outlined text-5xl md:text-7xl animate-eager group-hover:animate-none">\s*arrow_outward\s*</span>\s*</div>'
new_arrow = """<div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10 animate-eager group-hover:animate-none">
               <span className="material-symbols-outlined text-5xl md:text-7xl">
                 arrow_outward
               </span>
             </div>"""
text = re.sub(old_arrow, new_arrow, text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
