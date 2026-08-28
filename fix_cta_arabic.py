import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

arabic_cta_pattern = r'"home_cta_title": "O U\+O,O OU,U% O U,OUO O O U,O OOU\+O O1USA<pill1></pill1> <brDesktop/> U\.U\+ <brDesktop/> U\.U\+O,U\^O U\.OrOU,U\?A<pill2></pill2>"'
new_arabic_cta = '"home_cta_title": "<pill2></pill2> رؤية جديدة <brDesktop/> <pill1></pill1> للذكاء الاصطناعي"'

# Just in case the regex fails because of encoding weirdness, let's just do a manual replace looking for the pill tags in the Arabic section.
# The Arabic section is under 'ar': { translation: {
ar_start = i18n.find('"ar": {')
if ar_start != -1:
    cta_start = i18n.find('"home_cta_title":', ar_start)
    if cta_start != -1:
        cta_end = i18n.find(',', cta_start)
        old_cta = i18n[cta_start:cta_end]
        i18n = i18n.replace(old_cta, new_arabic_cta)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)

# Now modify Home.jsx to include the image for pill1 and pill2
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Add import for ctaImg1
if 'cta_img_1.webp' not in home:
    home = home.replace("import heroSticker3 from '../assets/hero_sticker_3.png';", "import heroSticker3 from '../assets/hero_sticker_3.png';\nimport ctaImg1 from '../assets/cta_img_1.webp';")

pill1_pattern = r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 \s*md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>'
pill1_replacement = 'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"><img src={ctaImg1} alt="" className="w-full h-full object-cover" /></span>'

pill2_pattern = r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 \s*md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>'
pill2_replacement = 'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"><img src={heroSticker2} alt="" className="w-full h-full object-cover scale-150" /></span>'

home = re.sub(pill1_pattern, pill1_replacement, home)
home = re.sub(pill2_pattern, pill2_replacement, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
