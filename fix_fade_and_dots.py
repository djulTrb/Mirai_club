import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Fix members slice and fade-out
# I'll just remove the slice and let max-h do the work.
home = home.replace(
    "const visibleMembers = showAllMembers ? TEAM_MEMBERS : TEAM_MEMBERS.slice(0, 4);",
    "const visibleMembers = TEAM_MEMBERS;"
)

# Fade out should be taller and more obvious
home = home.replace(
    'h-[160px] bg-gradient-to-t from-surface to-transparent',
    'h-[220px] bg-gradient-to-t from-surface via-surface/80 to-transparent'
)

# 2. Projects Dots
# Add state: const [activeProjectIdx, setActiveProjectIdx] = useState(0);
state_pattern = r'const \[showAllMembers, setShowAllMembers\] = useState\(false\);'
state_replacement = "const [showAllMembers, setShowAllMembers] = useState(false);\n  const [activeProjectIdx, setActiveProjectIdx] = useState(0);"
home = re.sub(state_pattern, state_replacement, home)

# Add scroll handler function
scroll_fn_pattern = r'const scroll = \(direction\) => \{.*?\n  \};'
scroll_fn_replacement = """const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleProjectScroll = (e) => {
    if (!e.target || e.target.children.length === 0) return;
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = e.target.children.length > 1 
      ? (e.target.children[1].offsetLeft - e.target.children[0].offsetLeft) 
      : e.target.children[0].offsetWidth;
    const idx = Math.round(scrollLeft / itemWidth);
    if (idx !== activeProjectIdx && idx >= 0 && idx < projects.length) {
      setActiveProjectIdx(idx);
    }
  };"""
home = re.sub(scroll_fn_pattern, scroll_fn_replacement, home, flags=re.DOTALL)

# Add onScroll to the carousel wrapper
carousel_pattern = r'ref=\{scrollRef\}\s*className="flex overflow-x-auto'
carousel_replacement = 'ref={scrollRef}\n                    onScroll={handleProjectScroll}\n                    className="flex overflow-x-auto'
home = re.sub(carousel_pattern, carousel_replacement, home)

# Add dots rendering below the carousel wrapper
dots_pattern = r'\{/\* Right Button \*/\}.*?</button>\s*</div>'
dots_replacement = """{/* Right Button */}
                    <button 
                      onClick={() => scroll('right')}
                      className="absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20"
                      aria-label="Scroll right"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  
                  {/* Dots Indicator */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                    {projects.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          const container = scrollRef.current;
                          if (container && container.children[idx]) {
                            container.children[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                          }
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${activeProjectIdx === idx ? 'w-6 bg-[#c77dff]' : 'w-2 bg-outline-variant/40 hover:bg-outline-variant'}`}
                        aria-label={`Go to project ${idx + 1}`}
                      />
                    ))}
                  </div>"""
home = re.sub(dots_pattern, dots_replacement, home, flags=re.DOTALL)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
