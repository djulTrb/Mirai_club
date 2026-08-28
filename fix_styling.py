import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Remove overflow-hidden from sections
# Mission section
home = re.sub(
    r'<section className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background relative overflow-hidden">',
    r'<section className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background relative">',
    home
)

# Projects section
home = re.sub(
    r'<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative overflow-hidden">',
    r'<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">',
    home
)

# Final CTA section
home = re.sub(
    r'<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center justify-center relative overflow-hidden">',
    r'<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center justify-center relative">',
    home
)

# CTA blob wrapper
home = re.sub(
    r'<div className="absolute inset-0 pointer-events-none overflow-hidden">',
    r'<div className="absolute inset-0 pointer-events-none">',
    home
)

# 2. Fix Meet the members height overflow
# Find h-[150px] in the map
home = re.sub(
    r'h-\[150px\]',
    r'min-h-[150px]',
    home
)

# 3. Modify Project Card Width & Height
old_proj_classes = r'className="min-w-\[85vw\] sm:min-w-\[300px\] md:min-w-\[calc\(50%-1rem\)\] lg:min-w-\[calc\(33\.333%-1\.5rem\)\] snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'

new_proj_classes = r'className="min-w-[85vw] sm:min-w-[280px] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1.5rem)] min-h-[350px] snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'
home = re.sub(old_proj_classes, new_proj_classes, home)

# 4. Modify Carousel Arrow Buttons
old_left_btn = r'<button\s*onClick=\{\(\) => scroll\(\'left\'\)\}\s*className="absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border border-outline-variant/30 rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-surface-variant z-20"'

new_left_btn = r'''<button 
                    onClick={() => scroll('left')}
                    className="absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20"'''

home = re.sub(old_left_btn, new_left_btn, home)

old_right_btn = r'<button\s*onClick=\{\(\) => scroll\(\'right\'\)\}\s*className="absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border border-outline-variant/30 rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-surface-variant z-20"'

new_right_btn = r'''<button 
                    onClick={() => scroll('right')}
                    className="absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20"'''

home = re.sub(old_right_btn, new_right_btn, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
