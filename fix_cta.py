import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add overflow-hidden to make sure it clips anything overflowing
content = content.replace(
    'className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full transition-transform duration-500 hover:scale-105 shrink-0 bg-[#240046] shadow-xl hover:bg-[#3c096c]"',
    'className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden transition-transform duration-500 hover:scale-105 shrink-0 bg-[#240046] shadow-xl hover:bg-[#3c096c]"'
)

# 2. Make the SVG text smaller and pushed into the center (radius 32 instead of 38, font size 10px instead of 12px)
old_svg = """             <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text className="font-display font-black text-[12px] fill-[#c77dff] uppercase tracking-[0.2em]">"""

new_svg = """             <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text className="font-display font-black text-[10px] md:text-[10px] fill-[#c77dff] uppercase tracking-[0.2em]">"""

content = content.replace(old_svg, new_svg)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("done")
