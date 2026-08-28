import re

with open('src/components/BackToTop.jsx', 'r', encoding='utf-8') as f:
    top = f.read()

# Change to rounded-[1.25rem] and dark:text-[#240046]
old_class = re.search(r'className="w-\[54px\].*?"', top).group(0)
new_class = 'className="w-[54px] h-[54px] rounded-[1.25rem] bg-white/80 backdrop-blur-md border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-white dark:border-white dark:text-[#240046] dark:hover:bg-[#c77dff] dark:hover:text-[#240046]"'

top = top.replace(old_class, new_class)

with open('src/components/BackToTop.jsx', 'w', encoding='utf-8') as f:
    f.write(top)
