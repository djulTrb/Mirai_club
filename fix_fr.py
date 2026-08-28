import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

i18n = i18n.replace('"home_join_circle": "Rejoindre le Club MIRAI *"', '"home_join_circle": "Rejoindre MIRAI *"     ')

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
