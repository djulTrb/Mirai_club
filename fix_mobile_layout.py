import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

# 1. Remove scroll indicator
scroll_pattern = r'\{/\* Scroll indicator \*/\}\s*<div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">\s*<span className="font-accent text-\[10px\] uppercase tracking-widest text-black">Scroll</span>\s*<span className="material-symbols-outlined text-black animate-bounce text-sm">arrow_downward</span>\s*</div>'
home = re.sub(scroll_pattern, '', home)

# 2. Replace member cards loop body
card_pattern = r'\{visibleMembers\.map\(\(member, idx\) => \(\s*<div key=\{idx\}.*?</div>\s*\)\)\}'

new_card_code = """{visibleMembers.map((member, idx) => (
                <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 w-full h-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    
                    {/* MOBILE LAYOUT */}
                    <div className="flex flex-col w-full sm:hidden">
                        <div className="flex flex-row justify-between items-start w-full mb-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
                                <span className="w-fit font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display font-bold">
                                {member.image ? <img alt={member.name} className="w-full h-full object-cover" src={member.image} /> : member.name.charAt(0)}
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center mb-6">
                            <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
                            {member.skills.map((skill, sIdx) => (
                                <React.Fragment key={sIdx}>
                                    <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-wide">{skill}</span>
                                    {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-secondary/50">|</span>}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex flex-row gap-6">
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> LinkedIn
                            </a>
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> GitHub
                            </a>
                        </div>
                    </div>

                    {/* DESKTOP LAYOUT */}
                    <div className="hidden sm:flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center gap-6 flex-1">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display text-xl font-bold">
                                {member.image ? <img alt={member.name} className="w-full h-full object-cover" src={member.image} /> : member.name.charAt(0)}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-row items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
                                    <span className="font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
                                    {member.skills.map((skill, sIdx) => (
                                        <React.Fragment key={sIdx}>
                                            <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-wide">{skill}</span>
                                            {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-secondary/50">|</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 shrink-0 items-end pr-4">
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> LinkedIn
                            </a>
                            <a href="#" className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_outward</span> GitHub
                            </a>
                        </div>
                    </div>
                </div>
              ))}"""

home = re.sub(card_pattern, new_card_code, home, flags=re.DOTALL)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
