import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace(
    'className="flex flex-col gap-2 shrink-0 w-28 sm:w-40 mt-0 hidden sm:flex"',
    'className="flex flex-col gap-2 shrink-0 w-24 sm:w-40 mt-0"'
)

home = home.replace(
    'className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-40 mt-4 md:mt-0"',
    'className="flex flex-col gap-2 shrink-0 w-24 sm:w-40 mt-0"'
)

# And reduce button padding on mobile to fit
home = home.replace(
    'className="py-2.5 px-4 bg-black',
    'className="py-2 px-2 sm:px-4 sm:py-2.5 bg-black'
)
home = home.replace(
    'className="py-2.5 px-4 border border-outline-variant',
    'className="py-2 px-2 sm:px-4 sm:py-2.5 border border-outline-variant'
)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
