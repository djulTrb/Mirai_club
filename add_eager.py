with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write("\n\n/* CTA Arrow Eager Shake */\n@keyframes eager-shake {\n  0%, 100% { transform: translate(0, 0); }\n  50% { transform: translate(3px, -3px); }\n}\n.animate-eager {\n  animation: eager-shake 0.4s ease-in-out infinite;\n}\n")
