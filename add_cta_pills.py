import re

# 1. Update i18n.js
with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# English
i18n = i18n.replace(
    '"home_cta_title": "See AI\\nFrom a different lens"',
    '"home_cta_title": "See AI <pill1></pill1> From a <br/> different lens <pill2></pill2>"'
)
# French
i18n = i18n.replace(
    '"home_cta_title": "Voir l\'IA\\nSous un autre angle"',
    '"home_cta_title": "Voir l\'IA <pill1></pill1> Sous un <br/> autre angle <pill2></pill2>"'
)
# Arabic
i18n = i18n.replace(
    '"home_cta_title": "رؤية الذكاء الاصطناعي\\nمن منظور مختلف"',
    '"home_cta_title": "رؤية الذكاء الاصطناعي <pill1></pill1> <br/> من منظور مختلف <pill2></pill2>"'
)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)

# 2. Update Home.jsx
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Add Trans to import
home = home.replace(
    "import { useTranslation } from 'react-i18next';",
    "import { useTranslation, Trans } from 'react-i18next';"
)

# Update the H2 tag
old_h2 = """          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line">
            {t('home_cta_title')}
          </h2>"""

new_h2 = """          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.1] flex-1 whitespace-pre-line uppercase">
            <Trans 
              i18nKey="home_cta_title"
              components={{
                pill1: <span className="inline-block align-middle w-24 md:w-36 h-12 md:h-16 lg:h-20 bg-[#c77dff] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                pill2: <span className="inline-block align-middle w-8 md:w-12 h-12 md:h-16 lg:h-20 bg-[#9d4edd] rounded-[3rem] mx-2 md:mx-4 overflow-hidden relative shadow-inner"></span>,
                br: <br />
              }}
            />
          </h2>"""

home = home.replace(old_h2, new_h2)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
