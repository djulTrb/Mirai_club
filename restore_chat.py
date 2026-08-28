import re

with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

old_header = r'<div className="bg-\[#10002b\] text-\[#c77dff\] dark:bg-secondary dark:text-white p-4 flex items-center justify-between">'
new_header = r'<div className="p-4 bg-[#240046] dark:bg-[#c77dff] flex justify-between items-center rounded-t-2xl">'
chat = re.sub(old_header, new_header, chat)

old_h3 = r'<h3 className="font-display font-bold text-sm">\{t\(\'ai_title\'\)\}</h3>'
new_h3 = r'<h3 className="font-display font-bold text-lg text-white dark:text-[#240046]">{t(\'ai_title\')}</h3>'
chat = re.sub(old_h3, new_h3, chat)

old_close = r'<button onClick=\{.*\} className="hover:opacity-70 transition-opacity">\s*<span className="material-symbols-outlined text-sm">close</span>'
new_close = r'<button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white dark:text-[#240046]/80 dark:hover:text-[#240046]"><span className="material-symbols-outlined text-sm">close</span>'
chat = re.sub(old_close, new_close, chat)

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)
