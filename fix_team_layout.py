import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Padding bottom to cards on smaller screens
home = home.replace(
    'px-6 py-6 gap-6 min-h-[120px]',
    'px-6 pt-6 pb-10 sm:py-6 gap-6 min-h-[120px]'
)

# 2. Push button more to the bottom
home = home.replace(
    "-mt-10' : 'mt-16'",
    "mt-4 sm:mt-6' : 'mt-16'"
)

# 3. Cut off 4th element by making max-h smaller
home = home.replace(
    "'max-h-[850px]' : 'max-h-[3000px]'",
    "'max-h-[780px] sm:max-h-[460px]' : 'max-h-[3000px]'"
)

# Optional: increase gradient just a tiny bit so it covers the cutoff smoothly
home = home.replace(
    'h-[120px] bg-gradient-to-t from-surface',
    'h-[160px] bg-gradient-to-t from-surface'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
