import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Add imports
if 'LampContainer' not in home:
    # find last import
    imports_end = home.rfind('import')
    # find the next newline after the last import
    next_newline = home.find('\n', imports_end)
    home = home[:next_newline] + '\nimport { LampContainer } from "../components/ui/Lamp";\nimport { motion } from "framer-motion";' + home[next_newline:]

# Replace the projects section title
old_projects_header = """        {/* Wide lamp source lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[120%] md:w-[100%] h-[500px] bg-[#9d4edd] opacity-[0.15] dark:opacity-[0.15] blur-[100px] md:blur-[150px] rounded-[100%] pointer-events-none z-0"></div>
        
        <div className="w-full max-w-[1400px] mx-auto relative z-10 group">
          <div className="w-full flex flex-col items-center mb-16">
            <span className="font-accent font-semibold text-xs text-secondary uppercase tracking-wider mb-4">{t('proj_tag')}</span>
            <h2 className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('proj_title')}</h2>
          </div>"""

new_projects_header = """        <div className="w-full max-w-[1400px] mx-auto relative z-10 group flex flex-col items-center">
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

home = home.replace(old_projects_header, new_projects_header)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
print("Home.jsx updated")
