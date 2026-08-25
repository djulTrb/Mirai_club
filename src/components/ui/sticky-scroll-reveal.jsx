"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--color-background)", // match the app background
    "var(--color-surface)", // match surface
    "var(--color-surface-container-lowest)",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))", 
    "linear-gradient(to bottom right, var(--color-secondary), var(--color-tertiary))", 
    "linear-gradient(to bottom right, var(--color-tertiary), var(--color-primary))", 
    "linear-gradient(to bottom right, var(--color-secondary-container), var(--color-primary-container))", 
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[40rem] overflow-y-auto flex justify-center relative space-x-10 rounded-3xl p-10 scrollbar-hide"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-4xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="h-[28rem] flex flex-col justify-start pt-12">
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className={cn(
                  "text-2xl sm:text-4xl font-display font-bold tracking-tight transition-colors duration-300",
                  activeCard === index ? "text-[#4214e9] dark:text-[#c993e6]" : "text-on-background"
                )}
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className={cn(
                  "text-lg max-w-lg mt-6 leading-relaxed font-body transition-colors duration-300",
                  activeCard === index ? "text-[#8a63f7] dark:text-[#e4dfff]" : "text-on-surface-variant"
                )}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-[20rem]" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-[26rem] w-[32rem] rounded-2xl bg-white sticky top-10 overflow-hidden shadow-inner",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
