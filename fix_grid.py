import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update the wrapper and title
old_wrapper_match = re.search(r'<div className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full max-w-\[1200px\] mx-auto gap-16 md:gap-32">.*?<h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-\[5\.5rem\] text-on-surface tracking-tighter leading-\[1\.1\] flex-1 whitespace-pre-line">', text, re.DOTALL)

if old_wrapper_match:
    old_wrapper = old_wrapper_match.group(0)
    new_wrapper = """<div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-16 md:gap-8 text-center md:text-left rtl:md:text-right">
          <h2 className={`md:col-span-2 font-display font-bold tracking-tighter leading-[1.1] whitespace-pre-line text-on-surface ${i18n.language?.startsWith('ar') ? 'text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem]' : 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]'}`}>"""
    text = text.replace(old_wrapper, new_wrapper)


# 2. Update the Link in the CTA section
# We match `<Link to="/recruitment" className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">`
old_link = r'<Link to="/recruitment" className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-\[100%\] overflow-hidden shrink-0 bg-\[#240046\] dark:bg-\[#c77dff\] shadow-xl">'
new_link = r'<div className="md:col-span-1 flex justify-center md:justify-start rtl:md:justify-end w-full">\n            <Link to="/recruitment" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">'
text = re.sub(old_link, new_link, text)

# 3. Add animation to the arrow
old_arrow = r'<span className="material-symbols-outlined text-5xl md:text-7xl">\s*arrow_outward\s*</span>'
new_arrow = r'<span className="material-symbols-outlined text-5xl md:text-7xl animate-eager group-hover:animate-none">\n                  arrow_outward\n                </span>'
text = re.sub(old_arrow, new_arrow, text)

# 4. Close the col-span-1 div
old_end = r'<\/Link>\s*<\/div>\s*<\/section>'
new_end = r'</Link>\n          </div>\n        </div>\n      </section>'
text = re.sub(old_end, new_end, text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
