import re

with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

old_header = '<div className="bg-secondary text-white p-4 flex items-center justify-between">'
new_header = '<div className="bg-[#10002b] text-[#c77dff] dark:bg-secondary dark:text-white p-4 flex items-center justify-between">'
chat = chat.replace(old_header, new_header)

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)
