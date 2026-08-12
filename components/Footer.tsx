import Image from "next/image";
import Link from "next/link";
import { EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row lg:px-8">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Prime PDR logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-display leading-none">
            <span className="block text-base font-semibold tracking-widest">
              PRIME <span className="text-gold">PDR</span>
            </span>
            <span className="mt-0.5 block text-[8px] font-light tracking-[0.28em] text-muted">
              PAINTLESS DENT REPAIR
            </span>
          </span>
        </Link>

        <div className="text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} Prime PDR. All rights reserved.</p>
          <p className="mt-1.5">
            Developed by{" "}
            <a
              href="http://calibersystems.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-gold"
            >
              Caliber Systems
            </a>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-neutral-400 transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Zm5.23-9.65a1.17 1.17 0 1 0 0 2.34 1.17 1.17 0 0 0 0-2.34Z" />
            </svg>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-neutral-400 transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
