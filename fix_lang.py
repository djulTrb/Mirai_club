import json

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

# Replace EN
i18n = i18n.replace('"home_join_circle": "Join Mirai Club"', '"home_join_circle": "Join Mirai Club *"')

# Replace FR specifically
# We will find the FR block and replace the English string with French
import re
# Find the block inside fr: { ... }
fr_match = re.search(r'fr:\s*\{\s*translation:\s*\{([^}]+)\}', i18n, re.DOTALL)
if fr_match:
    fr_block = fr_match.group(1)
    new_fr_block = fr_block.replace('"home_join_circle": "Join Mirai Club *"', '"home_join_circle": "Rejoindre le Club MIRAI *"')
    i18n = i18n.replace(fr_block, new_fr_block)

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
