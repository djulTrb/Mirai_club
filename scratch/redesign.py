import os
import re

css_content = """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #ffffff;
    --color-surface: #f9f6fd;
    --color-surface-container: #e0aaff;
    --color-surface-container-low: #f1e4fc;
    --color-surface-container-lowest: #ffffff;
    --color-surface-variant: #e0aaff;
    
    --color-primary: #5a189a;
    --color-on-primary: #ffffff;
    --color-primary-container: #3c096c;
    --color-on-primary-container: #ffffff;
    
    --color-secondary: #7b2cbf;
    --color-on-secondary: #ffffff;
    --color-secondary-container: #9d4edd;
    
    --color-tertiary: #c77dff;
    --color-on-tertiary: #10002b;
    
    --color-on-background: #10002b;
    --color-on-surface: #240046;
    --color-on-surface-variant: #3c096c;
    
    --color-outline: #c77dff;
    --color-outline-variant: #e0aaff;
    
    --color-error: #ba1a1a;
    --color-on-error: #ffffff;
  }
  .dark {
    --color-background: #10002b;
    --color-surface: #240046;
    --color-surface-container: #3c096c;
    --color-surface-container-low: #1d003a;
    --color-surface-container-lowest: #10002b;
    --color-surface-variant: #3c096c;
    
    --color-primary: #c77dff;
    --color-on-primary: #10002b;
    --color-primary-container: #9d4edd;
    --color-on-primary-container: #ffffff;
    
    --color-secondary: #e0aaff;
    --color-on-secondary: #10002b;
    --color-secondary-container: #7b2cbf;
    
    --color-tertiary: #5a189a;
    --color-on-tertiary: #ffffff;
    
    --color-on-background: #e0aaff;
    --color-on-surface: #ffffff;
    --color-on-surface-variant: #c77dff;
    
    --color-outline: #5a189a;
    --color-outline-variant: #3c096c;
    
    --color-error: #ffb4ab;
    --color-on-error: #690005;
  }
}

@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee 25s linear infinite;
}

body {
  @apply bg-background text-on-background antialiased font-body transition-colors duration-500 selection:bg-primary selection:text-on-primary;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-display font-black tracking-tight;
}

/* Playful bold button class */
.btn-fun {
  @apply bg-primary text-on-primary font-display font-black uppercase tracking-wider px-8 py-4 rounded-[2rem] shadow-[4px_4px_0px_var(--color-on-background)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-on-background)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all;
}

/* Playful card class */
.card-fun {
  @apply bg-surface border-4 border-on-background rounded-[3rem] shadow-[8px_8px_0px_var(--color-on-background)] overflow-hidden transition-transform hover:-translate-y-2;
}

html[dir="rtl"] .btn-fun {
  @apply shadow-[-4px_4px_0px_var(--color-on-background)] hover:-translate-x-[2px] hover:translate-y-[2px] hover:shadow-[-2px_2px_0px_var(--color-on-background)] active:-translate-x-[4px] active:translate-y-[4px] active:shadow-none;
}
html[dir="rtl"] .card-fun {
  @apply shadow-[-8px_8px_0px_var(--color-on-background)];
}
"""

with open("src/index.css", "w") as f:
    f.write(css_content)
    
print("Updated index.css")
