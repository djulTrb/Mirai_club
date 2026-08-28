import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Use regex to match regardless of exact spacing
old_sec = r'\{\/\* Current projects \*\/\}\s*<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative overflow-hidden">'

new_sec = """{/* Current projects */}
      <section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative overflow-hidden">
        
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
        </div>"""

text = re.sub(old_sec, new_sec, text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
