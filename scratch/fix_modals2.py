import re

with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i in range(len(lines)):
    line = lines[i]
    
    if '<div className="fixed inset-0 z-50 flex items-center justify-center p-4">' in line:
        new_lines.append(line.replace(
            '<div className="fixed inset-0 z-50 flex items-center justify-center p-4">',
            '<div className="fixed inset-0 z-50 overflow-y-auto">\\n            <div className="min-h-full flex items-center justify-center p-4">'
        ))
        continue
        
    if '<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"' in line:
        new_lines.append(line.replace('absolute', 'fixed'))
        continue
        
    if 'max-h-[90vh] overflow-y-auto"' in line:
        new_lines.append(line.replace(' max-h-[90vh] overflow-y-auto"', ' my-8"'))
        continue

    # Need to add the extra closing div before the )} for all 3 modals.
    if line.strip() == ')}' and i > 0 and '</div>' in lines[i-1]:
        new_lines.insert(len(new_lines)-1, '            </div>\n')

    new_lines.append(line)

with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
