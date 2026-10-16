"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds to wait before this element starts, used to stagger a group */
  delay?: number;
  /** "load" plays on page load (the hero); "scroll" plays once when scrolled into view */
  trigger?: "load" | "scroll";
};

const hidden = { opacity: 0, y: 14 };
const shown = { opacity: 1, y: 0 };
const ease = [0.2, 0.7, 0.2, 1] as const;

// Fades and lifts its children into place. The one animation primitive the site
// uses, so every entrance shares the same timing and feel.
export function Reveal({ children, className, delay = 0, trigger = "scroll" }: RevealProps) {
  const transition = { duration: 0.8, ease, delay };

  if (trigger === "load") {
    return (
      <motion.div className={className} initial={hidden} animate={shown} transition={transition}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
