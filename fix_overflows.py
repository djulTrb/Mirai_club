import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Fix members cards
card_pattern = r'className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col sm:flex-row items-center justify-between px-6 pt-6 pb-10 sm:py-6 gap-6 min-h-\[120px\]"'
card_replacement = 'className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col sm:flex-row items-center p-6 gap-6 h-auto w-full overflow-hidden"'
home = re.sub(card_pattern, card_replacement, home)

# Fix max-h so 4th element is hidden properly, and gradient shows
home = home.replace(
    "'max-h-[1100px] sm:max-h-[580px]' : 'max-h-[3000px]'",
    "'max-h-[620px] sm:max-h-[480px]' : 'max-h-[3000px]'"
)

# Fix projects cards widths so they don't show half a card
projects_pattern = r'className="min-w-\[85vw\] sm:min-w-\[280px\] md:min-w-\[calc\(33\.333%-1rem\)\] lg:min-w-\[calc\(25%-1\.5rem\)\] h-auto snap-start shrink-0'
projects_replacement = 'className="w-full min-w-full sm:min-w-[calc(50%-8px)] sm:w-[calc(50%-8px)] lg:min-w-[calc(33.3333%-21.33px)] lg:w-[calc(33.3333%-21.33px)] h-auto snap-center shrink-0'
home = re.sub(projects_pattern, projects_replacement, home)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
