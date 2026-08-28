import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Update pill1 and pill2
pill1_pattern = r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner"><img src=\{ctaImg1\} alt="" className="w-full h-full object-cover" /></span>,'
pill1_replacement = 'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner bg-cover bg-center" style={{ backgroundImage: `url(${ctaImg1})` }}></span>,'
home = re.sub(pill1_pattern, pill1_replacement, home)

pill2_pattern = r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner"><img src=\{heroSticker2\} alt="" className="w-full h-full object-cover scale-150" /></span>,'
pill2_replacement = 'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner bg-center" style={{ backgroundImage: `url(${heroSticker2})`, backgroundSize: "150%" }}></span>,'
home = re.sub(pill2_pattern, pill2_replacement, home)


# 2. Fix hover color on "Meet all the team"
# Locate the button for "Meet all the team"
meet_team_pattern = r'className="w-12 h-12 rounded-full flex items-center justify-center group-hover:text-secondary transition-colors group-hover:-translate-y-1"'
meet_team_replacement = 'className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-1"'
home = re.sub(meet_team_pattern, meet_team_replacement, home)

# 3. Space out Arabic CTA lines
h2_pattern = r'className=\{`md:col-span-2 font-display font-bold tracking-tighter leading-\[1\.1\] whitespace-pre-line text-on-surface \$\{i18n\.language\?\.startsWith\(\'ar\'\) \? \'text-4xl sm:text-5xl md:text-\[3\.5rem\] lg:text-\[4\.5rem\]\' : \'text-5xl sm:text-6xl md:text-7xl lg:text-\[5\.5rem\]\'\}`\}'
h2_replacement = 'className={`md:col-span-2 font-display font-bold tracking-tighter whitespace-pre-line text-on-surface ${i18n.language?.startsWith(\'ar\') ? \'text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] leading-[1.3] md:leading-[1.5]\' : \'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1]\'}`}'
home = re.sub(h2_pattern, h2_replacement, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
