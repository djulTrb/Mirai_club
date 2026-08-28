import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Projects Gap
old_gap = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">'
new_gap = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">'
home = home.replace(old_gap, new_gap)

# 2. CTA Arrow Animation (Move to wrapper)
# We need to find the arrow wrapper and the span.
old_arrow_sec = """             {/* The Static Arrow in the Middle */}
             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10">
               <span className="material-symbols-outlined text-5xl md:text-7xl animate-eager group-hover:animate-none">
                 arrow_outward
               </span>
             </div>"""
new_arrow_sec = """             {/* The Static Arrow in the Middle */}
             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c77dff] dark:text-white z-10 animate-eager group-hover:animate-none">
               <span className="material-symbols-outlined text-5xl md:text-7xl">
                 arrow_outward
               </span>
             </div>"""
home = home.replace(old_arrow_sec, new_arrow_sec)


# 3. Projects Blob visibility and size
old_blob = """        {/* Decorative Noisy Blob */}
        <div className="absolute top-[8%] md:top-[12%] left-[50%] -translate-x-1/2 w-96 h-96 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c77dff] opacity-[0.12] dark:opacity-20 blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-50 dark:opacity-40" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>"""

new_blob = """        {/* Decorative Noisy Blob */}
        <div className="absolute top-[8%] md:top-[12%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c77dff] opacity-40 dark:opacity-40 blur-[50px] md:blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-70 dark:opacity-60" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>"""
home = home.replace(old_blob, new_blob)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)


# 4. Mirai Assistant window header
with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

old_header = '<div className="p-4 bg-[#240046] dark:bg-[#c77dff] flex justify-between items-center rounded-t-2xl">'
new_header = '<div className="p-4 bg-[#10002b] text-[#c77dff] dark:bg-[#c77dff] dark:text-[#240046] flex justify-between items-center rounded-t-2xl">'
chat = chat.replace(old_header, new_header)
# Also change the h3 text color, it might have its own class
old_h3 = '<h3 className="font-display font-bold text-lg text-white dark:text-[#240046]">'
new_h3 = '<h3 className="font-display font-bold text-lg text-[#c77dff] dark:text-[#240046]">'
chat = chat.replace(old_h3, new_h3)

# And the close button text color
old_close = '<button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white dark:text-[#240046]/80 dark:hover:text-[#240046]">'
new_close = '<button onClick={() => setIsOpen(false)} className="text-[#c77dff]/80 hover:text-[#c77dff] dark:text-[#240046]/80 dark:hover:text-[#240046]">'
chat = chat.replace(old_close, new_close)

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)


# 5. BackToTop
with open('src/components/BackToTop.jsx', 'r', encoding='utf-8') as f:
    btt = f.read()

old_btt_class = 'className="w-[54px] h-[54px] rounded-[1.25rem] bg-white/80 backdrop-blur-md border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-white dark:border-white dark:text-[#240046] dark:hover:bg-[#c77dff] dark:hover:text-[#240046]"'
new_btt_class = 'className="w-[54px] h-[54px] rounded-[1.25rem] bg-white/80 backdrop-blur-md dark:backdrop-blur-none border border-black shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-[#ffffff] dark:border-[#ffffff] dark:text-[#240046] dark:hover:bg-[#c77dff] dark:hover:text-[#240046]"'
btt = btt.replace(old_btt_class, new_btt_class)

with open('src/components/BackToTop.jsx', 'w', encoding='utf-8') as f:
    f.write(btt)
