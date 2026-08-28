with open('src/i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"home_join_circle": "انضم إلى نادي ميراي"', '"home_join_circle": "انضم إلى نادي Mirai"')

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(text)
