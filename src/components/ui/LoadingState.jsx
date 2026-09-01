import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3),
    c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const PATTERNS = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true }
};

const VERBS = [
  "Cooking...", "Scheming...", "Plotting...", "Crunching...", "Computing...",
  "Calculating...", "Crafting...", "Forging...", "Synthesizing...", "Compiling...",
  "Rendering...", "Processing...", "Generating...", "Analyzing...", "Decoding...",
  "Inferring...", "Reasoning...", "Thinking...", "Pondering...", "Brainstorming...",
  "Exploring...", "Searching...", "Investigating...", "Scanning...", "Querying...",
  "Assembling...", "Constructing...", "Building...", "Mixing...", "Stirring...",
  "Whipping...", "Baking...", "Roasting...", "Grilling...", "Simmering...",
  "Marinating...", "Brewing...", "Experimenting...", "Juggling...", "Tinkering...",
  "Vibing..."
];

function useCyclingVerb() {
  // Start with a random verb
  const [index, setIndex] = useState(() => Math.floor(Math.random() * VERBS.length));
  
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => {
        let nextIndex;
        // Make sure we pick a DIFFERENT random verb each time
        do {
          nextIndex = Math.floor(Math.random() * VERBS.length);
        } while (nextIndex === prev && VERBS.length > 1);
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);
  
  return VERBS[index];
}

const LoadingState = ({ variant = "Dots", progress = 0, showPercentage = true }) => {
  const verb = useCyclingVerb();
  const { delays, dur, round } = PATTERNS[variant] || PATTERNS.Drive;

  return (
    <div dir="ltr" className="flex w-fit items-center gap-5">
      {/* Violet Waves Animation */}
      <span aria-hidden className="grid grid-cols-[repeat(3,8px)] gap-[3px]">
        {delays.map((d, i) => (
          <span
            key={i}
            className={`w-[8px] h-[8px] bg-[#c87fff] ${round ? "rounded-full" : "rounded-[1px]"}`}
            style={{
              opacity: d === null ? 0.07 : 0.15,
              animation: d === null
                ? "none"
                : `pixel-on ${dur}ms ease-in-out ${d}ms infinite`,
            }}
          />
        ))}
      </span>
      
      {/* Cycling Verb in Violet with Framer Motion slide-up animation */}
      <div className="relative h-[1.5em] min-w-[140px] flex items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={verb}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute font-accent font-bold text-xl sm:text-2xl text-[#9D4EDD] tracking-wide flex"
          >
            {verb.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  animation: `text-wave ${dur}ms ease-in-out ${i * 70}ms infinite`
                }}
              >
                {char}
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Percentage (Restored to its previous front location) */}
      {showPercentage && (
        <span className="font-accent font-black text-5xl sm:text-6xl text-on-surface tabular-nums tracking-tighter">
          {progress}<span className="text-[0.6em] ml-0.5 text-on-surface/80">%</span>
        </span>
      )}
    </div>
  );
};

export default LoadingState;
