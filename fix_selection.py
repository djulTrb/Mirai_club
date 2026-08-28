with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write("\n\n/* Custom Selection Colors */\n::selection {\n  background-color: #240046;\n  color: #c77dff;\n}\n.dark ::selection {\n  background-color: #c77dff;\n  color: #ffffff;\n}\n")
