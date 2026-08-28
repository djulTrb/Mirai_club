import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Projects blob smaller
home = home.replace(
    'w-[300px] h-[300px] md:w-[450px] md:h-[450px]',
    'w-[200px] h-[200px] md:w-[300px] md:h-[300px]'
)

# 2. Remove hover effect on members cards
home = home.replace(
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col sm:flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-6 pt-6 pb-10 sm:py-6 gap-6 min-h-[120px]',
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col sm:flex-row items-center justify-between px-6 pt-6 pb-10 sm:py-6 gap-6 min-h-[120px]'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
