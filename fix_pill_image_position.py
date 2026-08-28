import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

pill1_pattern = r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 relative shadow-inner"><img src=\{ctaImg1\} alt="" className="absolute bottom-\[2px\] left-0 w-full h-auto rounded-b-\[3rem\] pointer-events-none" /></span>,'

pill1_replacement = """pill1: (
                  <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-[72px] bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner">
                    <img src={ctaImg1} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      <img src={ctaImg1} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto" />
                    </div>
                  </span>
                ),"""

home = home.replace(pill1_pattern, pill1_replacement)

# Fallback regex just in case exact string match fails
if pill1_replacement not in home:
    home = re.sub(
        r'pill1: <span className="inline-block align-middle -translate-y-1 md:-translate-y-2 w-24 md:w-36 h-10 md:h-16 lg:h-\[72px\] bg-\[\#c77dff\] rounded-\[3rem\] mx-2 md:mx-4 relative shadow-inner">.*?</span>,',
        pill1_replacement,
        home,
        flags=re.DOTALL
    )

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
