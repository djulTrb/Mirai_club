import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Add state for visibleCards
state_pattern = r'const \[showAllMembers, setShowAllMembers\] = useState\(false\);\n\s*const \[activeProjectIdx, setActiveProjectIdx\] = useState\(0\);'
state_replacement = """const [showAllMembers, setShowAllMembers] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);"""
home = re.sub(state_pattern, state_replacement, home)

# 2. Modify dots rendering
# Replace the projects.map with Array(totalPages).map
dots_pattern = r'\{projects\.map\(\(\_, idx\) => \(\s*<button.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?/>\s*\)\)\}'

# We will calculate total pages and active page
dots_replacement = """{Array.from({ length: Math.ceil(projects.length / visibleCards) }).map((_, pageIdx) => {
                      const isActive = Math.floor(activeProjectIdx / visibleCards) === pageIdx;
                      return (
                        <button 
                          key={pageIdx}
                          onClick={() => {
                            const container = scrollRef.current;
                            const targetProjectIdx = pageIdx * visibleCards;
                            if (container && container.children[targetProjectIdx]) {
                              // We use 'start' because pages align to the left side in standard LTR, but standard behavior in RTL is also handled by 'start' (which means inline-start).
                              container.children[targetProjectIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                            }
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[#c77dff]' : 'w-2 border-[1.5px] border-outline-variant/50 bg-transparent hover:border-outline-variant'}`}
                          aria-label={`Go to page ${pageIdx + 1}`}
                        />
                      );
                    })}"""
home = re.sub(dots_pattern, dots_replacement, home, flags=re.DOTALL)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
