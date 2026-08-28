import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# Replace the Arabic translation
old_ar = '"home_cta_title": "رؤية الذكاء الاصطناعي <pill1></pill1> <brDesktop/> من <brDesktop/> منظور مختلف <pill2></pill2>"'
new_ar = '"home_cta_title": "انظر إلى الذكاء الاصطناعي <pill1></pill1> <brDesktop/> من <brDesktop/> منظور مختلف <pill2></pill2>"'

i18n = i18n.replace(old_ar, new_ar)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
