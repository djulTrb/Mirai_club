import re

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add overflow-x: hidden to html, body if not present
if "overflow-x: hidden;" not in css:
    css = css.replace("html {\n  scroll-behavior: smooth;\n}", "html {\n  scroll-behavior: smooth;\n  overflow-x: hidden;\n}\nbody {\n  overflow-x: hidden;\n}")

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)
