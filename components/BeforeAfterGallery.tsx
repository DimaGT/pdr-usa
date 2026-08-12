import BeforeAfterSlider from "./BeforeAfterSlider";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const items: {
  id: number;
  label: string;
  objectPosition?: string;
}[] = [
  { id: 1, label: "Door Dent" },
  { id: 2, label: "Body Line Dent" },
  { id: 3, label: "Tailgate Dent" },
  { id: 4, label: "Quarter Panel" },
  { id: 5, label: "Rocker Panel Dent" },
  // The dent sits near the right edge of the photo, so pull the crop left
  { id: 6, label: "Door Edge Dent", objectPosition: "72% center" },
];

export default function BeforeAfterGallery() {
  return (
    <section id="gallery" className="bg-panel py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading title="Before & After" />
          <p className="mx-auto mt-5 max-w-md text-center text-sm text-muted">
            Drag the slider on each photo to see the difference. Real jobs, real
            results — no repainting, no fillers.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.12}>
              <figure>
                <BeforeAfterSlider
                  before={`/images/${item.id}_1.jpeg`}
                  after={`/images/${item.id}_2.jpeg`}
                  alt={item.label}
                  objectPosition={item.objectPosition}
                />
                <figcaption className="mt-3 font-display text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  {item.id}. {item.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
