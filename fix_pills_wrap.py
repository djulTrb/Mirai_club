import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

nbsp = '\u00A0'

# First undo any &nbsp; if they exist (they shouldn't yet because I didn't run it)
i18n = i18n.replace('AI&nbsp;<pill1></pill1>', f'AI{nbsp}<pill1></pill1>')
i18n = i18n.replace('lens&nbsp;<pill2></pill2>', f'lens{nbsp}<pill2></pill2>')

i18n = i18n.replace('AI <pill1></pill1>', f'AI{nbsp}<pill1></pill1>')
i18n = i18n.replace('lens <pill2></pill2>', f'lens{nbsp}<pill2></pill2>')

i18n = i18n.replace("l'IA <pill1></pill1>", f"l'IA{nbsp}<pill1></pill1>")
i18n = i18n.replace("angle <pill2></pill2>", f"angle{nbsp}<pill2></pill2>")

i18n = i18n.replace("الاصطناعي <pill1></pill1>", f"الاصطناعي{nbsp}<pill1></pill1>")
i18n = i18n.replace("مختلف <pill2></pill2>", f"مختلف{nbsp}<pill2></pill2>")

with open('src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n)
