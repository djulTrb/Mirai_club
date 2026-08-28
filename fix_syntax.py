with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the broken closing tags.
# Currently it looks like:
#                 </span>
#               </div>
#           </Link>
#           </div>
#           </div>
#         </section>
#       </main>

# Let's fix it by completely replacing the CTA button structure.
# I will use a reliable regex.

import re

# Revert file to origin state to avoid compounding errors
