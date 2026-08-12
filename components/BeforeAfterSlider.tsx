"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  /** CSS object-position for photos where the subject is off-center */
  objectPosition?: string;
};

export default function BeforeAfterSlider({
  before,
  after,
  alt,
  objectPosition = "center",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/3] w-full cursor-ew-resize touch-none overflow-hidden rounded-sm select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* After (base layer, fully visible on the right side) */}
      <Image
        src={after}
        alt={`${alt} — after repair`}
        fill
        className="object-cover"
        style={{ objectPosition }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        draggable={false}
      />

      {/* Before (clipped from the right, visible on the left side) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — before repair`}
          fill
          className="object-cover"
          style={{ objectPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span
        className={`absolute top-3 left-3 rounded-xs bg-ink/70 px-2 py-1 font-display text-[10px] font-medium tracking-[0.18em] text-white uppercase backdrop-blur-sm transition-opacity ${position < 15 ? "opacity-0" : "opacity-100"}`}
      >
        Before
      </span>
      <span
        className={`absolute top-3 right-3 rounded-xs bg-gold/90 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.18em] text-ink uppercase transition-opacity ${position > 85 ? "opacity-0" : "opacity-100"}`}
      >
        After
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          aria-label={`${alt}: drag to compare before and after`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform group-hover:scale-110 focus:outline-2 focus:outline-offset-2 focus:outline-gold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8.6 7.4 4 12l4.6 4.6L10 15.2 6.8 12 10 8.8 8.6 7.4Zm6.8 0L14 8.8l3.2 3.2-3.2 3.2 1.4 1.4L20 12l-4.6-4.6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
