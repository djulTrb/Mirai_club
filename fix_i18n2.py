import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# Replace the specific lines
i18n = i18n.replace(
    '"home_cta_title": "See AI <pill1></pill1> From a <br/> different lens <pill2></pill2>"',
    '"home_cta_title": "See AI <pill1></pill1> <brDesktop/> From a <brDesktop/> different lens <pill2></pill2>"'
)
i18n = i18n.replace(
    '"home_cta_title": "Voir l\'IA <pill1></pill1> Sous un <br/> autre angle <pill2></pill2>"',
    '"home_cta_title": "Voir l\'IA <pill1></pill1> <brDesktop/> Sous un <brDesktop/> autre angle <pill2></pill2>"'
)
i18n = i18n.replace(
    '"home_cta_title": "رؤية الذكاء الاصطناعي <pill1></pill1> <br/> من منظور مختلف <pill2></pill2>"',
    '"home_cta_title": "رؤية الذكاء الاصطناعي <pill1></pill1> <brDesktop/> من <brDesktop/> منظور مختلف <pill2></pill2>"'
)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
