import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Replace handleProjectScroll with a highly robust bounding rect based center detector
old_scroll_fn = """  const handleProjectScroll = (e) => {
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

new_scroll_fn = """  const handleProjectScroll = (e) => {
    if (!e.target || e.target.children.length === 0) return;
    const container = e.target;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIdx = 0;
    let minDiff = Infinity;
    
    Array.from(container.children).forEach((child, idx) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    
    if (closestIdx !== activeProjectIdx && closestIdx >= 0 && closestIdx < projects.length) {
      setActiveProjectIdx(closestIdx);
    }
  };"""

home = home.replace(old_scroll_fn, new_scroll_fn)

# 2. Modify left and right arrows to hide at ends
left_btn_pattern = r'<button \s*onClick=\{\(\) => scroll\(\'left\'\)\}\s*className="absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-\[\#c77dff\] dark:text-\[\#e0aaff\] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20"\s*aria-label="Scroll left"\s*>'
left_btn_replacement = """<button 
                      onClick={() => scroll('left')}
                      className={`absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                          : (activeProjectIdx === 0 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll left"
                    >"""
home = re.sub(left_btn_pattern, left_btn_replacement, home)

right_btn_pattern = r'<button \s*onClick=\{\(\) => scroll\(\'right\'\)\}\s*className="absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-\[\#c77dff\] dark:text-\[\#e0aaff\] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20"\s*aria-label="Scroll right"\s*>'
right_btn_replacement = """<button 
                      onClick={() => scroll('right')}
                      className={`absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-transparent flex items-center justify-center text-[#c77dff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx === 0 ? 'hidden' : '')
                          : (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll right"
                    >"""
home = re.sub(right_btn_pattern, right_btn_replacement, home)

# 3. Modify dots to be unfilled when unfocused
# currently: w-2 bg-outline-variant/40 hover:bg-outline-variant
dots_pattern = r'w-2 bg-outline-variant/40 hover:bg-outline-variant'
dots_replacement = 'w-2 border-[1.5px] border-outline-variant/50 bg-transparent hover:border-outline-variant'
home = home.replace(dots_pattern, dots_replacement)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
