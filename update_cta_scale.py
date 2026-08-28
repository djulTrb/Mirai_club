import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Update image extension
home = home.replace("import ctaImg1 from '../assets/cta_img_1.webp';", "import ctaImg1 from '../assets/cta_img_1.png';")

# Update pill dimensions
# Original: w-24 md:w-36 h-10 md:h-16 lg:h-[72px]
# New: w-[72px] md:w-[108px] h-[30px] md:h-[48px] lg:h-[54px]

home = home.replace("w-24 md:w-36 h-10 md:h-16 lg:h-[72px]", "w-[72px] md:w-[108px] h-[30px] md:h-[48px] lg:h-[54px]")

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
