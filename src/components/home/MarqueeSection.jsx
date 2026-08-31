import React from 'react';
import { useTranslation } from 'react-i18next';

const MarqueeSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Marquee Section */}
      <section className="w-full overflow-hidden relative border-y border-[#5a189a] bg-[#240046] dark:bg-[#c87fff] py-5 shadow-lg">
        <div className="flex w-max font-display font-bold whitespace-nowrap group">
          <div className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
          <div aria-hidden="true" className="flex items-center px-4 text-2xl sm:text-3xl gap-[3.3rem] font-display font-semibold tracking-tight animate-marquee" >
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_heritage')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_intelligence')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">{t('marquee_future')}</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
            <span className="uppercase text-[#ffffff] dark:text-[#3c096c] flex items-center leading-none">Mirai</span><span className="text-[#c87fff] dark:text-[#ffffff] text-5xl flex items-center ">*</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarqueeSection;
