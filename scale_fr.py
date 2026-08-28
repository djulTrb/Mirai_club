import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

old_text = r'<text dir="ltr" className="font-accent font-black text-\[10px\] fill-\[#c77dff\] dark:fill-white tracking-widest"'
new_text = r'<text dir="ltr" className={`font-accent font-black fill-[#c77dff] dark:fill-white ${i18n.language?.startsWith(\'fr\') ? \'text-[8.5px] tracking-wider\' : \'text-[10px] tracking-widest\'}`}'
home = re.sub(old_text, new_text, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
