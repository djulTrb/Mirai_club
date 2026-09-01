import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const headerTagRef = useRef(null);
  const headerTitleRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  const widget1Ref = useRef(null);
  const widget2Ref = useRef(null);
  const widget3Ref = useRef(null);
  const widget4Ref = useRef(null);

  // Widget 1 elements
  const ringRef = useRef(null);
  const count1Ref = useRef(null);

  // Widget 2 elements
  const termLine1 = useRef(null);
  const termLine2 = useRef(null);
  const termLine3 = useRef(null);
  const termLine4 = useRef(null);

  // Widget 3 elements
  const avatar1 = useRef(null);
  const avatar2 = useRef(null);
  const avatar3 = useRef(null);
  const count3Ref = useRef(null);

  // Widget 4 elements
  const trackLineRef = useRef(null);
  const dotRef = useRef(null);

    useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    
    let ctx = gsap.context(() => {
      // 1. Header Timeline
      gsap.set([headerTagRef.current, headerTitleRef.current], {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 24,
      });

      if (!prefersReducedMotion) {
        gsap.set(headerTagRef.current, { y: 10 });
        gsap.set(headerTitleRef.current, { y: 20 });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: headerTagRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to(headerTagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(headerTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.1");


      // 2. Helper to setup individual card timelines
      const setupCard = (cardRef, widgetRef, setupWidgetFn, animateWidgetFn) => {
         const isMobile = window.innerWidth < 768;
         gsap.set(cardRef.current, { opacity: 0, y: prefersReducedMotion ? 0 : 24 });
         
         // On mobile, skip the entrance setup for the floating widget so it is just visible
         if (!prefersReducedMotion && !isMobile) {
            gsap.set(widgetRef.current, { scale: 0, opacity: 0, rotation: 10 });
         }
         
         if (setupWidgetFn) setupWidgetFn();

         const tl = gsap.timeline({
           scrollTrigger: {
             trigger: cardRef.current,
             start: "top 90%", // Trigger precisely when the individual card enters the bottom 10%
             toggleActions: "play none none none",
           }
         });

         // Always fade in the main card box
         tl.to(cardRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
         
         if (!prefersReducedMotion) {
             // On mobile, completely skip the entrance bounce animation for the widget
             if (!isMobile) {
                 tl.to(widgetRef.current, {
                   scale: 1.1,
                   opacity: 1,
                   rotation: 0,
                   duration: 0.6,
                   ease: "back.out(1.5)",
                   clearProps: "transform"
                 }, "<0.2");
             }
             
             // Still trigger the numbers/rings counting up on both
             if (animateWidgetFn) {
                animateWidgetFn(tl);
             }
         }
      };

      // CARD 1: Build
      setupCard(card1Ref, widget1Ref, 
        () => {
           gsap.set(ringRef.current, { strokeDasharray: "283", strokeDashoffset: "283" });
        },
        (tl) => {
           tl.to(ringRef.current, { strokeDashoffset: "70", duration: 1.2, ease: "power2.out" }, "-=0.2");
           tl.to(count1Ref.current, {
              innerText: 3,
              duration: 1.2,
              snap: { innerText: 1 },
              ease: "power2.out"
           }, "<");
        }
      );

      // CARD 2: Hack
      setupCard(card2Ref, widget2Ref,
        () => {
           gsap.set([termLine1.current, termLine2.current, termLine3.current, termLine4.current], { opacity: 0, y: 5 });
        },
        (tl) => {
           tl.to([termLine1.current, termLine2.current, termLine3.current, termLine4.current], {
             opacity: 1,
             y: 0,
             duration: 0.3,
             stagger: 0.15,
             ease: "power2.out"
           }, "-=0.2");
        }
      );

      // CARD 3: Connect
      setupCard(card3Ref, widget3Ref,
        () => {
           gsap.set([avatar1.current, avatar2.current, avatar3.current], { scale: 0, opacity: 0 });
        },
        (tl) => {
           tl.to([avatar1.current, avatar2.current, avatar3.current], {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(2)"
           }, "-=0.2");
           tl.to(count3Ref.current, {
              innerText: 11,
              duration: 1,
              snap: { innerText: 1 },
              ease: "power2.out"
           }, "<0.2");
        }
      );

      // CARD 4: Experiment
      setupCard(card4Ref, widget4Ref,
        () => {
           gsap.set(trackLineRef.current, { scaleX: 0 });
           gsap.set(dotRef.current, { x: 0 });
        },
        (tl) => {
           tl.to(trackLineRef.current, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.2");
           tl.to(dotRef.current, { x: 56, duration: 1.2, ease: "power2.inOut" }, "<");
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-24 flex flex-col gap-12 bg-background relative"
    >
      <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto relative z-10">
        <div className="w-full flex flex-col items-center mb-8 relative z-10">
          <span
            ref={headerTagRef}
            className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-4"
          >
            {t("mission_tag")}
          </span>
          <h2
            ref={headerTitleRef}
            className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            {t("mission_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1200px] mx-auto auto-rows-fr">
          {/* Educate Card */}
          <div
            ref={card1Ref}
            className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md group/card py-12 relative overflow-hidden"
          >
            <div className="relative z-10 pe-6 md:pe-[220px] pb-[58px] md:pb-0">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                {t("mission_ed_title")}
              </h3>
              <p
                className="text-base text-on-surface-variant leading-relaxed font-body"
                dangerouslySetInnerHTML={{ __html: t("mission_ed_desc") }}
              ></p>
            </div>

            {/* Floating: Educate */}
            <div
              ref={widget1Ref}
              aria-hidden="true"
              className="absolute -bottom-2 -end-2 md:-bottom-3 md:-end-3 flex flex-col bg-[#F8F6FC] dark:bg-[#1a1a2e] border border-[#9D4EDD]/10 dark:border-[#9D4EDD]/20 shadow-[0_12px_32px_rgba(157,78,221,0.5)] rounded-[14px] p-4 w-[148px] z-20 items-center justify-center transition-transform duration-300 group-hover/card:rotate-[8deg] rtl:group-hover/card:-rotate-[8deg] origin-bottom-right rtl:origin-bottom-left scale-100 md:scale-110"
            >
              <div className="relative w-[54px] h-[54px] mb-2.5 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    className="stroke-[#9D4EDD]/15"
                    strokeWidth="3"
                  />
                  <circle
                    ref={ringRef}
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    className="stroke-[#9D4EDD]"
                    strokeWidth="3"
                    strokeDasharray="94.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span dir="ltr" className="font-display font-bold text-[14px] text-[#3c096c] dark:text-[#F8F6FC] flex"><span ref={count1Ref}>0</span>/8</span>
              </div>
              <span className="font-accent text-[9px] font-bold uppercase tracking-wider text-[#6A5A82] text-center leading-tight">
                DEEP LEARNING
              </span>
            </div>
          </div>

          {/* Inspire Card */}
          <div
            ref={card2Ref}
            className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md group/card py-12 relative overflow-hidden"
          >
            <div className="relative z-10 pe-6 md:pe-[220px] pb-[58px] md:pb-0">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                {t("mission_in_title")}
              </h3>
              <p
                className="text-base text-on-surface-variant leading-relaxed font-body"
                dangerouslySetInnerHTML={{ __html: t("mission_in_desc") }}
              ></p>
            </div>

            {/* Floating: Terminal */}
            <div
              ref={widget2Ref}
              aria-hidden="true"
              className="absolute -bottom-2 -end-2 md:-bottom-3 md:-end-3 flex flex-col bg-[#1a1a2e] border border-[#9D4EDD]/15 shadow-[0_12px_32px_rgba(157,78,221,0.5)] rounded-[12px] p-3 w-[148px] z-20 transition-transform duration-300 group-hover/card:rotate-[8deg] rtl:group-hover/card:-rotate-[8deg] origin-bottom-right rtl:origin-bottom-left scale-100 md:scale-110"
            >
              <div className="flex gap-1.5 mb-2">
                <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f56]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#ffbd2e]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#27c93f]" />
              </div>
              <span
                ref={termLine1}
                className="font-mono text-[10px] text-[#ffffff] font-semibold leading-relaxed mb-0.5"
              >
                $ submit entry
              </span>
              <span
                ref={termLine2}
                className="font-mono text-[9px] text-gray-500 font-semibold leading-relaxed"
              >
                &gt; compiling...
              </span>
              <span
                ref={termLine3}
                className="font-mono text-[9px] text-[#c87fff]/80 font-semibold leading-relaxed"
              >
                &gt; uploading
              </span>
              <div ref={termLine4} className="inline-block">
                <span className="font-mono text-[9px] text-[#ffffff] font-semibold leading-relaxed">
                  &gt; submitted ✓
                </span>
              </div>
            </div>
          </div>

          {/* Connect Card */}
          <div
            ref={card3Ref}
            className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md group/card py-12 relative overflow-hidden"
          >
            <div className="relative z-10 pe-6 md:pe-[220px] pb-[58px] md:pb-0">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                {t("mission_co_title")}
              </h3>
              <p
                className="text-base text-on-surface-variant leading-relaxed font-body"
                dangerouslySetInnerHTML={{ __html: t("mission_co_desc") }}
              ></p>
            </div>

            {/* Floating: Avatar Stack */}
            <div
              ref={widget3Ref}
              aria-hidden="true"
              className="absolute -bottom-2 -end-2 md:-bottom-3 md:-end-3 flex flex-col justify-center bg-[#F8F6FC] dark:bg-[#1a1a2e] border border-[#9D4EDD]/10 dark:border-[#9D4EDD]/20 shadow-[0_12px_32px_rgba(157,78,221,0.6)] rounded-2xl px-5 py-3.5 z-20 transition-all duration-300 group-hover/card:rotate-[8deg] rtl:group-hover/card:-rotate-[8deg] origin-bottom-right rtl:origin-bottom-left scale-100 md:scale-110"
            >
              <span className="font-accent text-[8.5px] font-bold uppercase tracking-wider text-[#6A5A82] dark:text-[#c87fff]/70 mb-1.5 ms-1">
                Active Members
              </span>
              <div className="flex items-center">
                <div className="flex -space-x-2.5 rtl:space-x-reverse">
                  <div
                    ref={avatar1}
                    className="w-7 h-7 rounded-full border-2 border-[#F8F6FC] dark:border-[#1a1a2e] bg-[#c87fff] flex items-center justify-center text-[10px] font-bold text-white z-30"
                  >
                    A
                  </div>
                  <div
                    ref={avatar2}
                    className="w-7 h-7 rounded-full border-2 border-[#F8F6FC] dark:border-[#1a1a2e] bg-[#9D4EDD] flex items-center justify-center text-[10px] font-bold text-white z-20"
                  >
                    Y
                  </div>
                  <div
                    ref={avatar3}
                    className="w-7 h-7 rounded-full border-2 border-[#F8F6FC] dark:border-[#1a1a2e] bg-[#5a189a] flex items-center justify-center text-[10px] font-bold text-white z-10"
                  >
                    S
                  </div>
                </div>
                <span className="ms-2.5 font-display font-bold text-[14px] text-[#3c096c] dark:text-[#c87fff] flex">+<span ref={count3Ref}>0</span></span>
              </div>
            </div>
          </div>

          {/* Experiment Card */}
          <div
            ref={card4Ref}
            className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 flex flex-col justify-center transition-all hover:shadow-md group/card py-12 relative overflow-hidden"
          >
            <div className="relative z-10 pe-6 md:pe-[220px] pb-[58px] md:pb-0">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                {t("mission_ex_title")}
              </h3>
              <p
                className="text-base text-on-surface-variant leading-relaxed font-body"
                dangerouslySetInnerHTML={{ __html: t("mission_ex_desc") }}
              ></p>
            </div>

            {/* Floating: Stepper */}
            <div
              ref={widget4Ref}
              aria-hidden="true"
              className="absolute -bottom-2 -end-2 md:-bottom-3 md:-end-3 flex flex-col justify-center bg-[#2A1B38] border border-[#c87fff]/10 shadow-[0_12px_32px_rgba(157,78,221,0.5)] rounded-[14px] px-4 py-3.5 w-[200px] z-20 transition-transform duration-300 group-hover/card:rotate-[4deg] rtl:group-hover/card:-rotate-[4deg] origin-bottom-right rtl:origin-bottom-left scale-100 md:scale-110"
            >
              <div
                dir="ltr"
                className="relative flex justify-between items-start w-full"
              >
                {/* Track background */}
                <div className="absolute left-[28px] right-[28px] top-[5px] h-[2px] bg-white/10" />
                {/* Track progress */}
                <div
                  ref={trackLineRef}
                  className="absolute left-[28px] top-[5px] w-[56px] h-[2px] bg-[#c87fff] origin-left"
                />

                {/* Animated Dot overlay over Prototype/Test */}
                <div
                  ref={dotRef}
                  className="absolute left-[22px] top-[-1px] w-[12px] h-[12px] rounded-full bg-[#c87fff] border-2 border-[#2A1B38] shadow-[0_0_8px_rgba(200,127,255,0.5)] z-20"
                />

                {/* Node 1 */}
                <div className="relative flex flex-col items-center gap-1.5 z-10 w-14">
                  <div className="w-[12px] h-[12px] rounded-full border-2 border-[#2A1B38] bg-[#2A1B38]" />
                  <span className="font-accent text-[7px] font-bold text-[#ffffff] uppercase tracking-wider mt-0.5">
                    Prototype
                  </span>
                </div>

                {/* Node 2 */}
                <div className="relative flex flex-col items-center gap-1.5 z-10 w-14">
                  <div className="w-[12px] h-[12px] rounded-full border-2 border-[#2A1B38] bg-[#2A1B38]" />
                  <span className="font-accent text-[7px] font-bold text-[#ffffff] uppercase tracking-wider mt-0.5">
                    Test
                  </span>
                </div>

                {/* Node 3 */}
                <div className="relative flex flex-col items-center gap-1.5 z-10 w-14">
                  <div className="w-[12px] h-[12px] rounded-full border-[2px] border-[#c87fff]/40 bg-[#2A1B38]" />
                  <span className="font-accent text-[7px] font-bold text-[#c87fff]/60 uppercase tracking-wider mt-0.5">
                    Deploy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
