import re

# 1. Fix Home.jsx (Bullet points and Meet the Members spacing)
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Fix the bullet point mojibake
home = re.sub(
    r"\{t\('home_join_circle'\)\}.*?\{t\('home_join_circle'\)\}.*?<\/textPath>",
    "{t('home_join_circle')} &bull; {t('home_join_circle')} &bull; </textPath>",
    home,
    flags=re.DOTALL
)

# Move Meet the members button up a bit. Currently it's:
# <div className={`w-full flex justify-center relative z-20 ${!showAllMembers ? '-mt-6' : 'mt-12'}`}>
home = home.replace(
    "<div className={`w-full flex justify-center relative z-20 ${!showAllMembers ? '-mt-6' : 'mt-12'}`}>",
    "<div className={`w-full flex justify-center relative z-20 ${!showAllMembers ? '-mt-16' : 'mt-12'}`}>"
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)

# 2. Fix i18n.js Translations
with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# I will find all instances of home_cta_title and replace them based on context.
# We have 3 major translation blocks in i18n.js: en, fr, ar.

# Let's split by language or just use regex replacements for the exact blocks.
en_block = '"home_cta_title": "See AI\\nFrom a different lens", "home_cta_desc": "",\n      "home_join_circle": "Join Mirai Club",'
fr_block = '"home_cta_title": "Voir l\'IA\\nSous un autre angle", "home_cta_desc": "",\n      "home_join_circle": "Rejoindre Mirai",'
ar_block = '"home_cta_title": "رؤية الذكاء الاصطناعي\\nمن منظور مختلف", "home_cta_desc": "",\n      "home_join_circle": "انضم إلى نادي ميراي",'

# Re-write the translation blocks manually using regex. 
# We know the keys are always around "home_cta_title": "...", "home_cta_desc": "",\n      "home_join_circle": "...",
i18n = re.sub(
    r'"home_cta_title":\s*"[^"]*",\s*"home_cta_desc":\s*"",\s*"home_join_circle":\s*"[^"]*",',
    lambda m: "REPLACEMENT_MARKER",
    i18n
)

# Now there should be exactly 3 REPLACEMENT_MARKERs.
i18n = i18n.replace("REPLACEMENT_MARKER", en_block, 1)
i18n = i18n.replace("REPLACEMENT_MARKER", fr_block, 1)
i18n = i18n.replace("REPLACEMENT_MARKER", ar_block, 1)

# Let's also fix footer_slogan and footer_copy just in case they were corrupted
i18n = re.sub(r'"footer_slogan":\s*"[^"]*",', '"footer_slogan": "REPLACEMENT_SLOGAN",', i18n)
i18n = i18n.replace('"footer_slogan": "REPLACEMENT_SLOGAN",', '"footer_slogan": "Heritage • Intelligence • Future",', 1)
i18n = i18n.replace('"footer_slogan": "REPLACEMENT_SLOGAN",', '"footer_slogan": "Héritage • Intelligence • Futur",', 1)
i18n = i18n.replace('"footer_slogan": "REPLACEMENT_SLOGAN",', '"footer_slogan": "تراث • ذكاء • مستقبل",', 1)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)

print("done")
