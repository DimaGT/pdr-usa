import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-panel-2">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
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
