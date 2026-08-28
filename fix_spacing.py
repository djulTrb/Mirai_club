import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure we have useTranslation setup properly to get i18n.language
# The component is: const Home = () => { const { t } = useTranslation();
if 'const { t, i18n } = useTranslation();' not in text:
    text = text.replace('const { t } = useTranslation();', 'const { t, i18n } = useTranslation();')

# 1. Update the Meet the members button to be higher (from -mt-16 to -mt-24 = 32px higher)
text = text.replace("-mt-16", "-mt-24")

# 2. Rewrite the CTA SVG text
old_svg_text = re.search(r'<text className="font-display font-black[^>]*>.*?<\/text>', text, re.DOTALL).group(0)

new_svg_text = """<text className={`font-display font-black text-[11px] fill-[#c77dff] dark:fill-white capitalize tracking-[0.15em] ${i18n.language?.startsWith('ar') ? 'font-sans' : ''}`} style={{ fontFamily: i18n.language?.startsWith('ar') ? 'system-ui, sans-serif' : 'Bricolage Grotesque, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')} &bull; 
                 </textPath>
                 <textPath href="#circlePath" startOffset="50%">
                   {t('home_join_circle')} &bull; 
                 </textPath>
               </text>"""

text = text.replace(old_svg_text, new_svg_text)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Home.jsx updated")

# 3. Update Chatbot.jsx button size
with open('src/components/Chatbot.jsx', 'r', encoding='utf-8') as f:
    chat = f.read()

chat = chat.replace('w-12 h-12', 'w-[54px] h-[54px]')
chat = chat.replace('text-2xl', 'text-[28px]')

with open('src/components/Chatbot.jsx', 'w', encoding='utf-8') as f:
    f.write(chat)

print("Chatbot.jsx updated")

# 4. Update BackToTop.jsx
with open('src/components/BackToTop.jsx', 'r', encoding='utf-8') as f:
    top = f.read()

new_top = """import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button 
        aria-label="Back to top" 
        className="w-[54px] h-[54px] rounded-full bg-white/80 backdrop-blur-md border-[2.5px] border-outline-variant/60 shadow-xl flex items-center justify-center text-black hover:bg-[#240046] hover:text-white transition-all duration-300 group dark:bg-surface-container dark:border-outline-variant/40 dark:text-white dark:hover:bg-[#c77dff] dark:hover:text-[#240046]" 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <span className="material-symbols-outlined text-[28px]">arrow_upward</span>
      </button>
    </div>
  );
};

export default BackToTop;
"""

with open('src/components/BackToTop.jsx', 'w', encoding='utf-8') as f:
    f.write(new_top)

print("BackToTop.jsx updated")

