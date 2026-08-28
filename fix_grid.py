import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace(
    'className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-40 mt-4 sm:mt-0"',
    'className="grid grid-cols-2 sm:flex sm:flex-col gap-2 shrink-0 w-full sm:w-40 mt-4 sm:mt-0"'
)

# And fix text container width so it doesn't push
home = home.replace(
    'className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 flex-1 text-center sm:text-left"',
    'className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 flex-1 w-full text-center sm:text-left"'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
