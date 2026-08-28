import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Projects padding
home = home.replace(
    'className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 w-full pb-8 scrollbar-hide',
    'className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 w-full px-4 md:px-8 pb-8 scrollbar-hide'
)

# 2. CTA French font size
home = home.replace(
    "? 'text-[8.5px] tracking-wider' : 'text-[10px] tracking-widest'",
    "? 'text-[9.5px] tracking-widest' : 'text-[10px] tracking-widest'"
)

# 3. Members cards layout on mobile
# Card wrapper
home = home.replace(
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-4 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 min-h-[120px]',
    'bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col sm:flex-row items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md px-6 py-6 gap-6 min-h-[120px]'
)

# Card inner content
home = home.replace(
    'flex flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 text-left',
    'flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 text-center sm:text-left'
)

# Role and title wrapper
home = home.replace(
    'flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2',
    'flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2'
)

# Skills wrapper
home = home.replace(
    'flex flex-wrap gap-2 mt-1 justify-start',
    'flex flex-wrap gap-2 mt-1 justify-center sm:justify-start'
)

# Social buttons
home = home.replace(
    'className="flex flex-col gap-2 shrink-0 w-24 sm:w-40 mt-0"',
    'className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-40 mt-4 sm:mt-0"'
)

home = home.replace(
    'className="py-2 px-2 sm:px-4 sm:py-2.5 bg-black text-white hover:bg-secondary rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1"',
    'className="py-2.5 px-4 bg-black text-white hover:bg-secondary rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1"'
)

home = home.replace(
    'className="py-2 px-2 sm:px-4 sm:py-2.5 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1"',
    'className="py-2.5 px-4 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-xl font-body font-semibold text-xs text-center transition-colors uppercase tracking-wider flex items-center justify-center gap-1 flex-1"'
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
