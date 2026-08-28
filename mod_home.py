import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Remove animation from CTA arrow wrapper
old_arrow = r'<div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-\[#c77dff\] dark:text-white z-10 animate-eager group-hover:animate-none">'
new_arrow = r'<div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10">'
home = re.sub(old_arrow, new_arrow, home)

# Resize blob and make it less visible in dark mode
old_blob_wrapper = r'<div className="absolute top-\[5%\] md:top-\[10%\] left-\[50%\] -translate-x-1/2 w-\[400px\] h-\[400px\] md:w-\[600px\] md:h-\[600px\] pointer-events-none z-0">'
new_blob_wrapper = r'<div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-0">'
home = re.sub(old_blob_wrapper, new_blob_wrapper, home)

old_blob_bg = r'<div className="absolute inset-0 bg-\[#c77dff\] opacity-40 dark:opacity-40 blur-\[50px\] md:blur-\[80px\] rounded-full"><\/div>'
new_blob_bg = r'<div className="absolute inset-0 bg-[#c77dff] opacity-40 dark:opacity-15 blur-[50px] md:blur-[80px] rounded-full"></div>'
home = re.sub(old_blob_bg, new_blob_bg, home)

old_blob_noise = r'<div className="absolute inset-0 mix-blend-overlay opacity-60 dark:opacity-50" style={{ WebkitMaskImage:'
new_blob_noise = r'<div className="absolute inset-0 mix-blend-overlay opacity-60 dark:opacity-30" style={{ WebkitMaskImage:'
home = re.sub(old_blob_noise, new_blob_noise, home)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
