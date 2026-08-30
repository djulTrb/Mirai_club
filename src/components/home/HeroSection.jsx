import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import heroDesktop from '../../assets/hero_screens/hero_bg_desktop_16x9.png';
import heroLaptop from '../../assets/hero_screens/hero_bg_laptop_4x3.png';
import heroTablet from '../../assets/hero_screens/hero_bg_tablet_1x1.png';
import heroPhablet from '../../assets/hero_screens/hero_bg_phablet_3x4.png';
import heroMobile from '../../assets/hero_screens/hero_bg_mobile_9x16.png';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden -mt-16 bg-[#E5DFF3] dark:bg-[#240046]">
        
        {/* Background Illustrations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <picture>
            <source media="(min-aspect-ratio: 3/2)" srcSet={heroDesktop} />
            <source media="(min-aspect-ratio: 6/5)" srcSet={heroLaptop} />
            <source media="(min-aspect-ratio: 4/5)" srcSet={heroTablet} />
            <source media="(min-aspect-ratio: 1/2)" srcSet={heroPhablet} />
            <img 
              src={heroMobile} 
              alt="Mirai Club Hero Background" 
              className="w-full h-full object-cover opacity-100 drop-shadow-[0_35px_35px_rgba(36,0,70,0.35)] dark:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-300" 
              style={{ objectPosition: 'center 30%' }}
            />
          </picture>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-6 pb-24 lg:pb-0 h-full">
          <h1 className="font-display font-black text-4xl min-[390px]:text-[4rem] sm:text-[4.75rem] md:text-6xl lg:text-[7rem] tracking-[-0.04em] text-black dark:text-[#ffffff] leading-[0.85] drop-shadow-sm mb-4">
            Mirai club
          </h1>
          
          <p className="font-body text-[11px] leading-[18px] min-[390px]:text-[14px] min-[390px]:leading-[24px] sm:text-[16px] sm:leading-[26px] md:text-[15px] md:leading-[24px] text-gray-600 dark:text-gray-300 mb-6 max-w-md font-medium">
            <Trans i18nKey="home_hero_desc" components={{ br: <br /> }} />
          </p>
          
          <div className="flex flex-row items-center justify-center gap-2 min-[390px]:gap-3 w-auto">
            <Link to="/recruitment" className={`bg-[#240046] text-[#c87fff] border-2 border-transparent px-3 py-2 min-[375px]:px-4 min-[390px]:px-6 min-[390px]:py-2.5 sm:px-8 sm:py-3.5 md:px-7 md:py-2.5 rounded-full font-['Sora'] font-bold text-[9px] min-[375px]:text-[10px] min-[390px]:text-[11.5px] sm:text-[13px] md:text-xs whitespace-nowrap hover:opacity-90 dark:bg-[#c87fff] dark:text-[#240046] dark:border-transparent transition-opacity shadow-xl ${i18n.language?.startsWith('fr') ? 'tracking-normal' : 'tracking-wider'}`}>
              <span dangerouslySetInnerHTML={{ __html: t('home_join') }} />
            </Link>
            <Link to="/events" className={`bg-white/10 dark:bg-black/10 backdrop-blur-md border-2 border-[#240046] text-[#240046] hover:bg-[#240046] hover:text-[#c87fff] dark:border-[#c87fff] dark:text-[#c87fff] dark:hover:bg-[#c87fff] dark:hover:text-[#240046] px-3 py-2 min-[375px]:px-4 min-[390px]:px-6 min-[390px]:py-2.5 sm:px-8 sm:py-3.5 md:px-7 md:py-2.5 rounded-full font-['Sora'] font-bold text-[9px] min-[375px]:text-[10px] min-[390px]:text-[11.5px] sm:text-[13px] md:text-xs whitespace-nowrap transition-colors shadow-lg ${i18n.language?.startsWith('fr') ? 'tracking-normal' : 'tracking-wider'}`}>
              {t('home_explore')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
