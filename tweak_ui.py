import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Slice to 4 members
home = home.replace("TEAM_MEMBERS.slice(0, 5)", "TEAM_MEMBERS.slice(0, 4)")

# 2. Fade out height
home = home.replace(
    'h-[400px] bg-gradient-to-t from-surface via-surface to-transparent',
    'h-[120px] bg-gradient-to-t from-surface to-transparent'
)

# 3. Card horizontal layout
home = home.replace(
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col md:flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-6 py-6 gap-6 min-h-[150px]',
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-4 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 min-h-[120px]'
)

home = home.replace(
    'flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 text-center md:text-left',
    'flex flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 text-left'
)

# Fix inner text alignment
home = home.replace(
    'flex flex-col md:flex-row items-center md:items-center gap-3 mb-2',
    'flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2'
)

home = home.replace(
    'flex flex-wrap gap-2 mt-1 justify-center md:justify-start',
    'flex flex-wrap gap-2 mt-1 justify-start'
)

# Fix social buttons on right
home = home.replace(
    'flex items-center gap-3 mt-4 md:mt-0',
    'flex flex-col sm:flex-row items-end sm:items-center gap-3 mt-0'
)

# 4. Projects min-h-[350px] removal and line-clamp-3
old_proj_classes = r'className="min-w-\[85vw\] sm:min-w-\[280px\] md:min-w-\[calc\(33\.333%-1rem\)\] lg:min-w-\[calc\(25%-1\.5rem\)\] min-h-\[350px\] snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'
new_proj_classes = r'className="min-w-[85vw] sm:min-w-[280px] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1.5rem)] h-auto snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card"'
home = re.sub(old_proj_classes, new_proj_classes, home)

old_proj_desc = r'<p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">\{proj.description\}</p>'
new_proj_desc = r'<p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8 line-clamp-3">{proj.description}</p>'
home = re.sub(old_proj_desc, new_proj_desc, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
