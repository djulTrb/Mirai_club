import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

pill2_pattern = r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 relative shadow-inner"><img src=\{heroSticker2\}.*?/></span>,'
pill2_replacement = 'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner"></span>,'
home = re.sub(pill2_pattern, pill2_replacement, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
