import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

card_pattern = r'className="w-full min-w-full sm:min-w-\[calc\(50%-8px\)\] sm:w-\[calc\(50%-8px\)\] lg:min-w-\[calc\(33\.3333%-21\.33px\)\] lg:w-\[calc\(33\.3333%-21\.33px\)\] h-auto snap-center shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'

card_replacement = 'className="w-full min-w-full md:min-w-[calc(50%-16px)] md:w-[calc(50%-16px)] xl:min-w-[calc(33.3333%-21.33px)] xl:w-[calc(33.3333%-21.33px)] h-auto snap-center shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'

home = re.sub(card_pattern, card_replacement, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
