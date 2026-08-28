import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

pattern = r'\) : \(\s*<div className="relative group/carousel">'
replacement = ') : (\n                <div className="w-full flex flex-col">\n                  <div className="relative group/carousel">'

home = re.sub(pattern, replacement, home)

# Find where the ternary condition ends
# It's at the end of the Dots Indicator div.
# We need to add a closing </div> for the wrapper.
dots_pattern = r'aria-label=\{`Go to project \$\{idx \+ 1\}`\}\s*/>\s*\)\)\}\s*</div>\s*\)'
dots_replacement = 'aria-label={`Go to project ${idx + 1}`}\n                      />\n                    ))}\n                  </div>\n                </div>\n              )'
home = re.sub(dots_pattern, dots_replacement, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
