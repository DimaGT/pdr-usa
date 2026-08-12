"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PHONE } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.21, 0.65, 0.35, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden">
      <Image
        src="/images/hero-bg.png"
        alt="Paintless dent repair technician working on a car"
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 pb-16 lg:px-8">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl font-bold tracking-wide uppercase sm:text-6xl lg:text-7xl"
        >
          Dent Repair
          <span className="block text-gold">Perfected.</span>
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-md text-lg leading-relaxed text-neutral-300"
        >
          Paintless Dent Repair in Austin, Texas.
          <br />
          Mobile service. Premium results.
        </motion.p>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/estimate"
            className="group flex items-center gap-2.5 rounded-sm bg-gold px-7 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-ink uppercase transition-all hover:bg-gold-dark"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Zm-5 4h8v2H8v-2Zm0 4h8v2H8v-2Z" />
            </svg>
            Estimate Now
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2.5 rounded-sm border border-neutral-500 px-7 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-white uppercase transition-all hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
            </svg>
            Call Now
          </a>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex items-center gap-2.5"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-xs font-medium tracking-[0.22em] uppercase">
            Free estimates by photos
          </span>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-neutral-500 p-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-gold" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
