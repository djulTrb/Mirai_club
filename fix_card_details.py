import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Move button down 20px
home = home.replace(
    "-mt-16' : 'mt-12'",
    "-mt-10' : 'mt-16'"
)

# 2. Image rounded-full -> rounded-2xl (it matches the square identicon look in the screenshot)
home = home.replace(
    'className="w-20 h-20 rounded-full overflow-hidden bg-surface-variant/80 shrink-0 border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface-variant font-display text-xl font-bold"',
    'className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display text-xl font-bold"'
)

# 3. Text block gap (gap between image and text block)
home = home.replace(
    'className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 text-center sm:text-left"',
    'className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 flex-1 text-center sm:text-left"'
)

# 4. Name and Role block (make sure role is below name with proper gap)
home = home.replace(
    'className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2"',
    'className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-3"'
)

home = home.replace(
    'className="font-accent text-[10px] font-semibold bg-surface-variant/40 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/20"',
    'className="font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30"'
)

# 5. Skills block (add margin top, fix separator color)
home = home.replace(
    'className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start"',
    'className="flex flex-wrap gap-2 mt-2 sm:mt-1 justify-center sm:justify-start items-center"'
)

home = home.replace(
    'className="font-body text-xs font-medium text-outline">|</span>',
    'className="font-body text-[10px] font-black text-secondary/50">|</span>'
)

# uppercase for "SKILLS:"
home = home.replace(
    'className="font-body text-xs font-medium text-on-surface-variant">{t(\'team_skills\')}:</span>',
    'className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t(\'team_skills\')}:</span>'
)

# Skills font size a bit smaller to match screenshot
home = home.replace(
    'className="font-body text-xs font-semibold text-secondary uppercase"',
    'className="font-body text-[10px] font-bold text-secondary uppercase tracking-wide"'
)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
