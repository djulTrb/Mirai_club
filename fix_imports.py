import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# Fix the import
old_import = r"import React, \{ useState \} from 'react';"
new_import = "import React, { useState, useEffect, useRef } from 'react';"
home = re.sub(old_import, new_import, home)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
