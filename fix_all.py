import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Remove LampContainer imports
home = home.replace('import { LampContainer } from "../components/ui/Lamp";\n', '')
home = home.replace('import { motion } from "framer-motion";\n', '')

# 2. Revert Projects section title
old_projects = """        <div className="w-full max-w-[1400px] mx-auto relative z-10 group flex flex-col items-center">
          <LampContainer className="-mb-32 md:-mb-16 -mt-32 scale-75 md:scale-100">
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-full flex flex-col items-center z-50 pt-32"
            >
              <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4 relative z-50">{t('proj_tag')}</span>
              <h2 className="text-black text-center font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight relative z-50">{t('proj_title')}</h2>
            </motion.div>
          </LampContainer>"""

new_projects = """        <div className="w-full max-w-[1400px] mx-auto relative z-10 group">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('proj_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('proj_title')}</h2>
          </div>"""

home = home.replace(old_projects, new_projects)

# 3. Add id="team-section" to Team section
home = home.replace(
    '<section className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">',
    '<section id="team-section" className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">'
)

# 4. Modify onClick for Team collapse
old_onclick = 'onClick={() => setShowAllMembers(!showAllMembers)}'
new_onclick = """onClick={() => {
                  setShowAllMembers(!showAllMembers);
                  if (showAllMembers) {
                    setTimeout(() => {
                      document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }
                }}"""
home = home.replace(old_onclick, new_onclick)

# 5. Fix CTA Button Layout (justify-center instead of justify-between)
home = home.replace(
    'className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left w-full max-w-[1200px] mx-auto gap-16 md:gap-32"',
    'className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full max-w-[1200px] mx-auto gap-16 md:gap-32"'
)

# 6. Fix CTA Button Hover / Colors
old_cta_button = '<Link to="/recruitment" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden transition-transform duration-500 hover:scale-105 shrink-0 bg-[#240046] shadow-xl hover:bg-[#3c096c]">'
new_cta_button = '<Link to="/recruitment" className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">'
home = home.replace(old_cta_button, new_cta_button)

# 7. Fix CTA SVG text (italic, lowercase/capitalize, dark mode colors)
old_cta_svg = """             <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text className="font-display font-black text-[10px] md:text-[10px] fill-[#c77dff] uppercase tracking-[0.2em]">"""
new_cta_svg = """             <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text className="font-display font-black text-[10px] md:text-[10px] fill-[#c77dff] dark:fill-white italic capitalize tracking-[0.2em]">"""
home = home.replace(old_cta_svg, new_cta_svg)

# 8. Fix CTA inner arrow
old_cta_arrow = """             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] z-10 transition-colors">
               <span className="material-symbols-outlined text-5xl md:text-7xl transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                 arrow_outward
               </span>
             </div>"""
new_cta_arrow = """             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10">
               <span className="material-symbols-outlined text-5xl md:text-7xl">
                 arrow_outward
               </span>
             </div>"""
home = home.replace(old_cta_arrow, new_cta_arrow)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)

print("Home.jsx updated")

# 9. Update i18n.js to make "JOIN MIRAI CLUB" lowercase/titlecase so CSS `capitalize` works perfectly.
with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

i18n = i18n.replace('"home_join_circle": "JOIN MIRAI CLUB"', '"home_join_circle": "Join Mirai Club"')
i18n = i18n.replace('"home_join_circle": "REJOINDRE MIRAI"', '"home_join_circle": "Rejoindre Mirai"')
with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)

print("i18n.js updated")

