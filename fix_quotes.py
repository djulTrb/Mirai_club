import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace(r"startsWith(\'fr\')", "startsWith('fr')")
home = home.replace(r"? \'text-[8.5px] tracking-wider\' : \'text-[10px] tracking-widest\'}", "? 'text-[8.5px] tracking-wider' : 'text-[10px] tracking-widest'}")

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
