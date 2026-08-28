import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# We need to change the width of ctaImg2 inside pill2.
# The current HTML for pill2 is:
# pill2: (
#   <span className="...">
#     <img src={ctaImg2} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
#     <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
#       <img src={ctaImg2} alt="" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto" />
#     </div>
#   </span>
# ),

# Using regex to target ONLY the img tags that have src={ctaImg2}
def replace_img2_width(match):
    return match.group(0).replace('w-[85%]', 'w-[73%]')

# The pattern matches the img tag containing ctaImg2
pattern = r'<img src=\{ctaImg2\}.*?/>'
home = re.sub(pattern, replace_img2_width, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
