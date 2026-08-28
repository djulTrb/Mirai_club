import re

with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

# Floating button: change to bg-[#c77dff] text-[#240046] for both
chat = chat.replace(
    'className="fixed bottom-6 left-6 z-50 w-[54px] h-[54px] rounded-[1.25rem] bg-[#240046] text-[#c77dff] dark:bg-[#c77dff] dark:text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:scale-105 transition-all focus:outline-none group"',
    'className="fixed bottom-6 left-6 z-50 w-[54px] h-[54px] rounded-[1.25rem] bg-[#c77dff] text-[#240046] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:scale-105 transition-all focus:outline-none group"'
)

# Header background
chat = chat.replace(
    'className="p-4 bg-[#240046] dark:bg-[#c77dff] flex justify-between items-center rounded-t-2xl"',
    'className="p-4 bg-[#c77dff] flex justify-between items-center rounded-t-2xl"'
)

# Header Icon
chat = chat.replace(
    '<span className="material-symbols-outlined">auto_awesome</span>',
    '<span className="material-symbols-outlined text-[#240046]">auto_awesome</span>'
)

# Header Title
chat = chat.replace(
    'className="font-display font-bold text-lg text-white dark:text-[#240046]"',
    'className="font-display font-bold text-lg text-[#240046]"'
)

# Header Close Button
chat = chat.replace(
    'className="text-white/80 hover:text-white dark:text-[#240046]/80 dark:hover:text-[#240046]"',
    'className="text-[#240046]/80 hover:text-[#240046]"'
)

# Send button
chat = chat.replace(
    'className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 shadow-sm"',
    'className="w-10 h-10 rounded-full bg-[#c77dff] text-[#240046] flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 shadow-sm"'
)

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)
