import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

count = 0
def replacer(match):
    global count
    count += 1
    if count == 3:
        return '"home_cta_title": "<pill2></pill2> رؤية جديدة <brDesktop/> <pill1></pill1> للذكاء الاصطناعي", "home_cta_desc": "",'
    return match.group(0)

i18n = re.sub(r'"home_cta_title":\s*".*?",\s*"home_cta_desc":\s*"",', replacer, i18n)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
