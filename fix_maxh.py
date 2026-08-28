import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace(
    "'max-h-[780px] sm:max-h-[460px]' : 'max-h-[3000px]'",
    "'max-h-[1100px] sm:max-h-[580px]' : 'max-h-[3000px]'"
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
