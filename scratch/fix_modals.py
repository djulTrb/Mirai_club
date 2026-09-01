import re

with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    backdrop_click = match.group(1)
    max_w = match.group(2)
    return (f'<div className=\"fixed inset-0 z-50 overflow-y-auto\">\\n'
            f'            <div className=\"min-h-full flex items-center justify-center p-4\">\\n'
            f'              <div className=\"fixed inset-0 bg-black/60 backdrop-blur-sm\" {backdrop_click}></div>\\n'
            f'              <div className=\"relative bg-surface-container rounded-3xl p-6 md:p-8 {max_w} w-full shadow-2xl my-8\">')

# Fix member, event, gallery modals
content = re.sub(
    r'<div className=\"fixed inset-0 z-50 flex items-center justify-center p-4\">\s*<div className=\"absolute inset-0 bg-black/60 backdrop-blur-sm\" (onClick=\{[^}]+\})></div>\s*<div className=\"relative bg-surface-container rounded-3xl p-6 md:p-8 (max-w-\d?xl) w-full shadow-2xl max-h-\[90vh\] overflow-y-auto\">',
    replacer,
    content
)

# Fix the closing tags.
# Events Modal closes with </form>
content = re.sub(
    r'</div>\s*</form>\s*</div>\s*\)\}',
    r'</div>\n                </form>\n              </div>\n            </div>\n          </div>\n        )}',
    content
)

# Gallery Modal closes with </div></div></div>
content = re.sub(
    r'</div>\s*</div>\s*</div>\s*\)\}',
    r'</div>\n              </div>\n            </div>\n            </div>\n          </div>\n        )}',
    content
)

# Member Modal closes with </form>
content = re.sub(
    r'</button>\s*</div>\s*</form>\s*</div>\s*\)\}',
    r'</button>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        )}',
    content
)

with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
