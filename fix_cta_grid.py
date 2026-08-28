with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace Wrapper and H2
old_wrapper = """<div className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full max-w-[1200px] mx-auto gap-16 md:gap-32">
          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line">"""

new_wrapper = """<div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-16 md:gap-8 text-center md:text-left rtl:md:text-right">
          <h2 className={`md:col-span-2 font-display font-bold tracking-tighter leading-[1.1] whitespace-pre-line text-on-surface ${i18n.language?.startsWith('ar') ? 'text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem]' : 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]'}`}>"""

text = text.replace(old_wrapper, new_wrapper)

# 2. Add 'group' to the Link
old_link_start = '<Link to="/recruitment" className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">'
new_link_start = '<div className="md:col-span-1 flex justify-center md:justify-start rtl:md:justify-end w-full">\n            <Link to="/recruitment" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c77dff] shadow-xl">'

text = text.replace(old_link_start, new_link_start)

# 3. Add animate-eager to arrow
old_arrow = '<span className="material-symbols-outlined text-5xl md:text-7xl">'
new_arrow = '<span className="material-symbols-outlined text-5xl md:text-7xl animate-eager group-hover:animate-none">'
text = text.replace(old_arrow, new_arrow)

# 4. Close the col-span-1 div after the Link closes
# The link ends with:
#                 </span>
#               </div>
#             </Link>
#           </div>
#         </section>
old_link_end = """              </div>
            </Link>
          </div>
        </section>"""
new_link_end = """              </div>
            </Link>
          </div>
          </div>
        </section>"""
text = text.replace(old_link_end, new_link_end)


with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
