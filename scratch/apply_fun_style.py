import os
import re
import glob

# Mapping of old class substrings to new fun classes
replacements = {
    # Buttons
    r'bg-black text-white px-8 flex items-center justify-center gap-2 hover:opacity-90 transition-all h-\[52px\] rounded-full font-body font-semibold text-xs uppercase tracking-wider': 'btn-fun flex items-center justify-center gap-2',
    r'bg-transparent text-black px-8 font-body font-semibold text-xs uppercase tracking-wider hover:bg-surface-variant transition-all h-\[52px\] rounded-full border-black border-2': 'btn-fun !bg-surface !text-on-background border-4 !border-on-background shadow-[4px_4px_0px_var(--color-primary)] hover:!bg-primary hover:!text-white',
    r'bg-secondary text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2': 'btn-fun flex items-center justify-center gap-2',
    r'px-8 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider transition-colors bg-secondary text-white hover:opacity-90 shadow-sm': 'btn-fun px-8 py-3',
    
    # Hero Title / Accent
    r'text-black mb-6 uppercase': 'text-primary mb-6 uppercase drop-shadow-[4px_4px_0px_var(--color-secondary)]',
    r'font-accent font-semibold text-xs text-secondary uppercase tracking-wider': 'font-display font-black text-sm text-secondary uppercase tracking-widest',
    
    # Cards
    r'bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12': 'card-fun p-8 flex flex-col justify-center py-12 group/card',
    r'bg-white/80 rounded-\[2rem\] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-\[1.02\]': 'card-fun p-6 flex flex-col items-center justify-center text-center',
    r'bg-surface-container-lowest border border-outline-variant rounded-\[2rem\] flex flex-col justify-between transition-all hover:scale-\[1.02\] px-8 py-8': 'card-fun px-8 py-8 flex flex-col justify-between',
    r'group cursor-pointer bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-all duration-500 relative': 'card-fun group cursor-pointer flex flex-col overflow-hidden relative',
    
    # Generic background replacements to make it more colorful
    r'bg-surface-container-low/40': 'bg-primary text-white',
    r'text-on-surface whitespace-nowrap': 'text-white whitespace-nowrap',
    
    # Forms & Inputs
    r'bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all': 'bg-surface border-4 border-on-background rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_var(--color-primary)] transition-all font-bold',
    
    # Layout sections
    r'bg-background': 'bg-background',
    r'bg-surface': 'bg-surface',
}

files = glob.glob('src/pages/*.jsx') + glob.glob('src/components/*.jsx')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = content
    for pattern, replacement in replacements.items():
        # Use regex to allow slightly different whitespace
        new_content = re.sub(pattern.replace(' ', r'\s+'), replacement, new_content)
        
    # Extra specific replacements for Fun UI
    # Make headings primary colored instead of black
    new_content = re.sub(r'text-black', 'text-on-background', new_content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

print("Done applying fun styles.")
