import type { Variants, TargetAndTransition } from "framer-motion";

// ── Entrance variants (use with initial/animate or whileInView) ──

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90 },
  show: { opacity: 1, rotateX: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.9 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Scroll reveal shorthand (spread onto motion.div) ──
// IMPORTANT: This deliberately animates on MOUNT (animate: "show"), NOT via
// whileInView/IntersectionObserver. In the WebContainer preview iframe the
// IntersectionObserver frequently never fires, which would leave every section
// stuck at opacity:0 — i.e. a blank/white page even though the build is fine.
// Mount-based reveal guarantees content is ALWAYS visible. Keep this name so
// existing generated components that spread {...fadeUpOnScroll} keep working.
export const fadeUpOnScroll = {
  variants: fadeUp,
  initial: "hidden",
  animate: "show",
};

// ── Hero entrance — always animates on mount (no viewport dependency) ──
// Use this for hero sections and above-the-fold content that is visible
// immediately on page load. Does NOT rely on IntersectionObserver.

export const heroEntrance = {
  variants: fadeUp,
  initial: "hidden",
  animate: "show",
};

// ── Stagger container + child ──

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Hover / interaction presets (spread onto motion elements) ──

export const hoverScale: { whileHover: TargetAndTransition; whileTap: TargetAndTransition } = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

export const hoverLift: { whileHover: TargetAndTransition; whileTap: TargetAndTransition } = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
  whileTap: { y: 0 },
};

export const buttonPress: { whileHover: TargetAndTransition; whileTap: TargetAndTransition } = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
};