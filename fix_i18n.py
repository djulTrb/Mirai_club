import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

count = 0
def replacer(match):
    global count
    count += 1
    if count == 1:
        return '"home_cta_title": "See AI <pill1/> <brDesktop/> From a different <brDesktop/> lens <pill2/>", "home_cta_desc": "",'
    if count == 2:
        return '"home_cta_title": "Voir l\'IA <pill1/> <brDesktop/> Sous un autre <brDesktop/> angle <pill2/>", "home_cta_desc": "",'
    if count == 3:
        return '"home_cta_title": "رؤية جديدة <pill2/> <brDesktop/> للذكاء الاصطناعي <pill1/>", "home_cta_desc": "",'
    return match.group(0)

i18n = re.sub(r'"home_cta_title":\s*".*?",\s*"home_cta_desc":\s*"",', replacer, i18n)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
