import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Add useState and useEffect to Home.jsx
import_insert = "import React, { useEffect, useState, useRef } from 'react';\n"
home = home.replace("import React from 'react';", import_insert)

# Inside Home component:
home_state = """
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('mirai_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Temporarily clear it out so empty state shows as requested
      setProjects([]); 
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
"""
# Find const Home = () => {
# Add states right after
home = home.replace("const Home = () => {\n  const { t, i18n } = useTranslation();", "const Home = () => {\n  const { t, i18n } = useTranslation();" + home_state)

# 2. Replace the grid
# Find the exact grid text
old_grid = r'<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full relative z-10">[\s\S]*?</div>\s*</div>\s*</section>'

# Replace it with our carousel
new_grid = """<div className="w-full relative z-10">
              {projects.length === 0 ? (
                <div className="w-full flex justify-center items-center py-16">
                  <p className="text-on-surface-variant font-body text-lg italic">No projects for the moment.</p>
                </div>
              ) : (
                <div className="relative group/carousel">
                  <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 w-full pb-8 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {projects.map(proj => (
                      <div key={proj.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md hover:border-secondary group/card">
                        <p className="font-accent font-semibold uppercase tracking-wider text-xs text-secondary mb-4">{proj.category}</p>
                        <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">{proj.title}</h3>
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">{proj.description}</p>
                        <a href={proj.link || '#'} className="mt-auto flex items-center gap-1 text-secondary font-body font-semibold text-xs uppercase tracking-wider w-fit hover:opacity-80">
                          {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Left Button */}
                  <button 
                    onClick={() => scroll('left')}
                    className="absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border border-outline-variant/30 rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-surface-variant z-20"
                    aria-label="Scroll left"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  {/* Right Button */}
                  <button 
                    onClick={() => scroll('right')}
                    className="absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border border-outline-variant/30 rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-surface-variant z-20"
                    aria-label="Scroll right"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>"""

home = re.sub(old_grid, new_grid, home)

# 3. We also need to add a small global CSS to hide scrollbars for WebKit, since we used scrollbar-hide which is a tailwind plugin not guaranteed to exist.
# Actually I put inline styles for firefox/IE. For webkit:
# I can just add a global css style or use `[&::-webkit-scrollbar]:hidden`.
# Tailwind 3 has no built-in scrollbar hide unless you have the plugin. So `[&::-webkit-scrollbar]:hidden` works perfectly.
home = home.replace('scrollbar-hide"', 'scrollbar-hide [&::-webkit-scrollbar]:hidden"')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
