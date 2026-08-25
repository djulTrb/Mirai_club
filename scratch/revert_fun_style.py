import os
import re
import glob

# Mapping of fun classes back to original classes
replacements = {
    # Generic background replacements
    r'bg-primary text-white': 'bg-surface-container-low/40',
    r'text-white whitespace-nowrap': 'text-on-surface whitespace-nowrap',
    
    # Forms & Inputs
    r'bg-surface border-4 border-on-background rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:shadow-\[4px_4px_0px_var\(--color-primary\)\] transition-all font-bold': 'bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all',

    # Buttons
    r'btn-fun flex items-center justify-center gap-2': 'bg-secondary text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2',
    # Note: For the specific black button on home page we'll do a second pass manually if needed, but it's okay if it stays as the secondary button for now, or we can restore it exactly.
    r'btn-fun px-8 py-3': 'px-8 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider transition-colors bg-secondary text-white hover:opacity-90 shadow-sm',
    r'btn-fun !bg-surface !text-on-background border-4 !border-on-background shadow-\[4px_4px_0px_var\(--color-primary\)\] hover:!bg-primary hover:!text-white': 'bg-transparent text-black px-8 font-body font-semibold text-xs uppercase tracking-wider hover:bg-surface-variant transition-all h-[52px] rounded-full border-black border-2',
    
    # Hero Title / Accent
    r'text-primary mb-6 uppercase drop-shadow-\[4px_4px_0px_var\(--color-secondary\)\]': 'text-black mb-6 uppercase',
    r'font-display font-black text-sm text-secondary uppercase tracking-widest': 'font-accent font-semibold text-xs text-secondary uppercase tracking-wider',
    
    # Cards
    r'card-fun p-8 flex flex-col justify-center py-12 group/card': 'bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md hover:border-secondary group/card py-12',
    r'card-fun p-6 flex flex-col items-center justify-center text-center': 'bg-white/80 rounded-[2rem] border border-outline-variant/30 p-6 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]',
    r'card-fun px-8 py-8 flex flex-col justify-between': 'bg-surface-container-lowest border border-outline-variant rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] px-8 py-8',
    r'card-fun group cursor-pointer flex flex-col overflow-hidden relative': 'group cursor-pointer bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-all duration-500 relative',
    
    # Specific fix for Home button
    r'bg-secondary text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2(\s*)\{t\(\'home_join\'\)\}': r'bg-black text-white px-8 flex items-center justify-center gap-2 hover:opacity-90 transition-all h-[52px] rounded-full font-body font-semibold text-xs uppercase tracking-wider\1{t(\'home_join\')}',
}

files = glob.glob('src/pages/*.jsx') + glob.glob('src/components/*.jsx')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content)
        
    # Reverse text-on-background back to text-black for headings
    new_content = re.sub(r'text-on-background', 'text-black', new_content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Reverted {file_path}")

print("Done reverting fun styles.")
