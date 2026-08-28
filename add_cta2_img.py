import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Add import
if "import ctaImg2 from '../assets/cta_img_2.png';" not in home:
    home = home.replace(
        "import ctaImg1 from '../assets/cta_img_1.webp';",
        "import ctaImg1 from '../assets/cta_img_1.webp';\nimport ctaImg2 from '../assets/cta_img_2.png';"
    )

pill2_pattern = r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 relative shadow-inner"></span>,'

pill2_replacement = """pill2: (
                  <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner">
                    <img src={ctaImg2} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      <img src={ctaImg2} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto" />
                    </div>
                  </span>
                ),"""

home = home.replace(pill2_pattern, pill2_replacement)

# Fallback regex if exact string replace fails
if pill2_replacement not in home:
    home = re.sub(
        r'pill2: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#9d4edd\] rounded-\[3rem\] mx-2 md:mx-4 relative shadow-inner">.*?</span>,',
        pill2_replacement,
        home,
        flags=re.DOTALL
    )

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
