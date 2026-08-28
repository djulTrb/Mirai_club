import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

pill1_pattern = r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner bg-cover bg-center" style=\{\{ backgroundImage: `url\(\$\{ctaImg1\}\)` \}\}></span>,'
pill1_replacement = 'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner"><img src={ctaImg1} alt="" className="absolute bottom-0 left-0 w-full h-auto rounded-b-[3rem] pointer-events-none" /></span>,'
home = home.replace(pill1_pattern, pill1_replacement)

# Regex approach because of newlines or minor differences
home = re.sub(
    r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner bg-cover bg-center" style=\{\{\s*backgroundImage: `url\(\$\{ctaImg1\}\)`\s*\}\}></span>,',
    'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner"><img src={ctaImg1} alt="" className="absolute bottom-[2px] left-0 w-full h-auto rounded-b-[3rem] pointer-events-none" /></span>,',
    home
)

home = re.sub(
    r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner bg-center" style=\{\{\s*backgroundImage: `url\(\$\{heroSticker2\}\)`,\s*backgroundSize: "150%"\s*\}\}></span>,',
    'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner"><img src={heroSticker2} alt="" className="absolute bottom-[2px] left-0 w-full h-auto rounded-b-[3rem] pointer-events-none scale-150 origin-bottom" /></span>,',
    home
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
