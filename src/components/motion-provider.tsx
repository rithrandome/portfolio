"use client";

import { MotionConfig } from "motion/react";

// One place to set animation defaults for the whole site. reducedMotion="user"
// respects the visitor's "reduce motion" OS setting: movement is dropped and
// only fades remain.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
