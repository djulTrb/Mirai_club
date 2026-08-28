import re

with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

chat = chat.replace(r"{t(\'ai_title\')}", "{t('ai_title')}")

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)
