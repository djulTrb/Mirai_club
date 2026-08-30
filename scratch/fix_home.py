import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the paragraphs render HTML for the <br>
content = content.replace(\"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\">{t('mission_ed_desc')}</p>\", \"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\" dangerouslySetInnerHTML={{ __html: t('mission_ed_desc') }}></p>\")
content = content.replace(\"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\">{t('mission_in_desc')}</p>\", \"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\" dangerouslySetInnerHTML={{ __html: t('mission_in_desc') }}></p>\")
content = content.replace(\"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\">{t('mission_co_desc')}</p>\", \"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\" dangerouslySetInnerHTML={{ __html: t('mission_co_desc') }}></p>\")
content = content.replace(\"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\">{t('mission_ex_desc')}</p>\", \"<p className=\\\"text-base text-on-surface-variant leading-relaxed font-body\\\" dangerouslySetInnerHTML={{ __html: t('mission_ex_desc') }}></p>\")

# Make the widgets bigger by changing scale-[0.85] md:scale-100 to scale-100 md:scale-110 and setting origin
content = content.replace(' scale-[0.85] md:scale-100', ' origin-bottom-right scale-100 md:scale-110')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated Home.jsx')
