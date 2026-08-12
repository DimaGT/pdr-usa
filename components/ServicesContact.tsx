import Link from "next/link";
import Reveal from "./Reveal";
import { EMAIL, INSTAGRAM, INSTAGRAM_URL, PHONE, PHONE_DISPLAY } from "@/lib/site";

const services = [
  "Hail Damage Repair",
  "Door Ding Repair",
  "Small Dent Repair",
  "Crease & Body Line Repair",
  "Mobile PDR Service",
  "Free Estimates by Photos",
];

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 13l4 4L19 7" stroke="#e8a33d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ServicesContact() {
  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gold/8 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
        {/* Services */}
        <Reveal direction="right">
          <p className="font-display text-sm font-medium tracking-[0.3em] text-gold uppercase">
            Services
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-wide uppercase sm:text-5xl">
            What I Fix
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-neutral-400">
            From tiny door dings to hail damage across the whole panel — every
            repair keeps your factory paint intact.
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 border-b border-line/70 py-3.5 text-neutral-300"
              >
                <CheckIcon />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Contact card */}
        <Reveal direction="left" delay={0.2}>
          <div
            id="contact"
            className="relative overflow-hidden rounded-sm border border-line bg-panel p-8 sm:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <h2 className="font-display text-2xl font-semibold tracking-wide text-gold uppercase">
              Contact
            </h2>

            <ul className="mt-8 space-y-5 text-neutral-300">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8a33d" aria-hidden>
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
                  </svg>
                  {PHONE_DISPLAY}
                  <span className="text-xs text-muted">Text / Call</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all transition-colors hover:text-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8a33d" aria-hidden>
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                  </svg>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8a33d" aria-hidden>
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Zm5.23-9.65a1.17 1.17 0 1 0 0 2.34 1.17 1.17 0 0 0 0-2.34Z" />
                  </svg>
                  {INSTAGRAM}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8a33d" className="mt-0.5 shrink-0" aria-hidden>
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                </svg>
                <span>
                  Austin, Cedar Park, Round Rock
                  <br />& surrounding areas
                </span>
              </li>
            </ul>

            <Link
              href="/estimate"
              className="mt-9 block rounded-sm bg-gold px-6 py-3.5 text-center font-display text-sm font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-gold-dark"
            >
              Send Photos for Estimate
            </Link>
            <p className="mt-3 text-center text-xs text-muted">
              Quick response guaranteed.
            </p>
          </div>
        </Reveal>
      </div>

      {/* CTA */}
      <div className="relative mx-auto mt-24 max-w-4xl border-t border-line px-5 pt-20 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-wide uppercase sm:text-4xl">
            Request an Estimate <span className="text-gold">Today</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-neutral-400">
            If you&apos;re ready to repair unsightly dents and dings on your
            vehicle, reach out to Prime PDR today. We&apos;d be happy to provide
            you with a free, in-person evaluation and estimate for repairs.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <Link
            href="/estimate"
            className="mt-9 inline-block rounded-sm bg-gold px-9 py-4 font-display text-sm font-semibold tracking-[0.2em] text-ink uppercase transition-all hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(232,163,61,0.35)]"
          >
            Get a Quote Now
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
