import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Revert pill dimensions
home = home.replace("w-[72px] md:w-[108px] h-[30px] md:h-[48px] lg:h-[54px]", "w-24 md:w-36 h-10 md:h-16 lg:h-[72px]")

# Revert ctaImg2 width from 73% back to 85%
home = home.replace("w-[73%]", "w-[85%]")

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
