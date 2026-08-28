import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# Replace using regex to handle the non-breaking space character properly
i18n = re.sub(
    r'"home_cta_title": "See AI(.)<pill1></pill1> <brDesktop/> From a <brDesktop/> different lens(.)<pill2></pill2>"',
    r'"home_cta_title": "See AI\1<pill1></pill1> <brDesktop/> From a different <brDesktop/> lens\2<pill2></pill2>"',
    i18n
)

i18n = re.sub(
    r'"home_cta_title": "Voir l\'IA(.)<pill1></pill1> <brDesktop/> Sous un <brDesktop/> autre angle(.)<pill2></pill2>"',
    r'"home_cta_title": "Voir l\'IA\1<pill1></pill1> <brDesktop/> Sous un autre <brDesktop/> angle\2<pill2></pill2>"',
    i18n
)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
