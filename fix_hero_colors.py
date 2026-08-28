import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Hero section background
hero_pattern = r'<section\s+className="relative w-full h-screen min-h-\[700px\] flex flex-col items-center justify-center overflow-hidden\s*-mt-16 bg-\[\#e6e0f4\] bg-\[length:100%_auto\] md:bg-cover bg-top md:bg-center bg-no-repeat"\s*style={{ backgroundImage: `url\(\$\{heroBg\}\)` }}\s*>'
hero_replacement = r'<section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden -mt-16 bg-[#240046] dark:bg-[#c77dff]">'
home = re.sub(hero_pattern, hero_replacement, home)

# 2. Hero overlay (remove it completely)
overlay_pattern = r'\{/\* Subtle overlay to ensure text contrast \*/\}\s*<div className="absolute inset-0 bg-\[\#ffffff\]/20 dark:bg-\[\#000000\]/70 backdrop-blur-\[1px\]\s*md:backdrop-blur-none z-10 pointer-events-none"></div>'
home = re.sub(overlay_pattern, '', home)

# 3. Hero H1 Text
h1_pattern = r'tracking-\[-0\.04em\] text-black uppercase leading-\[0\.85\] drop-shadow-sm mb-8'
h1_replacement = r'tracking-[-0.04em] text-[#c77dff] dark:text-[#3c096c] uppercase leading-[0.85] drop-shadow-sm mb-8'
home = re.sub(h1_pattern, h1_replacement, home)

# 4. Hero Paragraph
p_pattern = r'text-black/90 dark:text-white/90 mb-12 max-w-2xl\s*leading-relaxed font-medium backdrop-blur-md bg-white/20 dark:bg-black/20 px-8 py-5 rounded-3xl border border-white/30\s*dark:border-black/30 shadow-sm'
p_replacement = r'text-[#c77dff] dark:text-[#3c096c] mb-12 max-w-2xl leading-relaxed font-medium backdrop-blur-md bg-black/20 dark:bg-white/20 px-8 py-5 rounded-3xl border border-black/30 dark:border-white/30 shadow-sm'
home = re.sub(p_pattern, p_replacement, home)

# 5. Hero Buttons (Join Mirai)
btn_pattern = r'w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black\s*px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-\[0\.25em\]\s*hover:bg-secondary dark:hover:bg-secondary hover:text-white transition-all hover:scale-105 duration-300 shadow-xl'
btn_replacement = r'w-full sm:w-auto bg-[#c77dff] dark:bg-[#3c096c] text-[#240046] dark:text-[#c77dff] px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] hover:opacity-90 transition-all hover:scale-105 duration-300 shadow-xl'
home = re.sub(btn_pattern, btn_replacement, home)

# Second button in hero
btn2_pattern = r'w-full sm:w-auto bg-transparent text-black dark:text-white border border-black dark:border-white\s*px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-\[0\.25em\]\s*hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all hover:scale-105 duration-300'
btn2_replacement = r'w-full sm:w-auto bg-transparent text-[#c77dff] dark:text-[#3c096c] border border-[#c77dff] dark:border-[#3c096c] px-10 py-4 md:px-12 md:py-5 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-[0.25em] hover:bg-[#c77dff] dark:hover:bg-[#3c096c] hover:text-[#240046] dark:hover:text-[#c77dff] transition-all hover:scale-105 duration-300'
home = re.sub(btn2_pattern, btn2_replacement, home)

# 6. Marquee Section Bg
marquee_pattern = r'bg-\[\#240046\] dark:bg-\[\#3c096c\]'
marquee_replacement = r'bg-[#240046] dark:bg-[#c77dff]'
home = re.sub(marquee_pattern, marquee_replacement, home)

# 7. Marquee Asterisks
ast_pattern = r'text-\[\#c77dff\]\s*text-5xl translate-y-1'
ast_replacement = r'text-[#c77dff] dark:text-[#3c096c] text-5xl translate-y-1'
home = re.sub(ast_pattern, ast_replacement, home)

# 8. Marquee Text
mtext_pattern = r'uppercase text-\[\#ffffff\]'
mtext_replacement = r'uppercase text-[#ffffff] dark:text-[#3c096c]'
home = re.sub(mtext_pattern, mtext_replacement, home)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
