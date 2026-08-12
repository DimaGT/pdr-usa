import Image from "next/image";
import Reveal from "./Reveal";

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "2,500+", label: "Dents removed" },
  { value: "100%", label: "Original paint kept" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <p className="font-display text-sm font-medium tracking-[0.3em] text-gold uppercase">
              About Me
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-wide uppercase sm:text-5xl">
              Quality. Precision.
              <br />
              Trust.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-lg leading-relaxed text-neutral-400">
              I&apos;m Dmitriy, a certified PDR technician based in Austin,
              Texas. I specialize in removing dents without damaging the
              original paint. Fast, clean, and reliable service — at your
              location. Your car, like new.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-y border-line py-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <a
              href="#contact"
              className="mt-10 inline-block rounded-sm bg-gold px-7 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:bg-gold-dark"
            >
              Get In Touch
            </a>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <div className="group relative">
            <div className="absolute -top-4 -right-4 h-full w-full rounded-sm border border-gold/40" />
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/images/image.jpeg"
                alt="Dmitriy performing paintless dent repair with an LED light board"
                width={900}
                height={620}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
