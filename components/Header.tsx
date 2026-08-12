"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Prime PDR logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
            priority
          />
          <span className="font-display leading-none">
            <span className="block text-xl font-semibold tracking-widest">
              PRIME <span className="text-gold">PDR</span>
            </span>
            <span className="mt-0.5 block text-[9px] font-light tracking-[0.28em] text-muted">
              PAINTLESS DENT REPAIR
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-display text-xs font-medium tracking-[0.2em] text-neutral-300 uppercase transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/estimate"
            className="hidden rounded-sm border border-gold px-5 py-2.5 font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-all hover:bg-gold hover:text-ink sm:block"
          >
            Get Estimate
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-white ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-ink/95 backdrop-blur-md lg:hidden">
          <div className="flex flex-col px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line/60 py-3 font-display text-sm tracking-[0.2em] text-neutral-200 uppercase last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/estimate"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-sm bg-gold px-5 py-3 text-center font-display text-sm font-semibold tracking-[0.2em] text-ink uppercase"
            >
              Get Estimate
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
