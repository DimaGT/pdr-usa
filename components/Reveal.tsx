"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const directions = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof directions;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: Props) {
  const offset = directions[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, delay, ease: [0.21, 0.65, 0.35, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
