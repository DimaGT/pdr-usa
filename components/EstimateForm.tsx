"use client";

import { useEffect, useRef, useState } from "react";

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1920;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|heic|heif)$/i;

const inputClasses =
  "w-full rounded-sm border border-line bg-panel px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-gold focus:outline-none";

type Photo = {
  id: string;
  file: File;
  url: string;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-xs font-semibold tracking-[0.2em] text-neutral-300 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function isAllowedImage(file: File) {
  const type = file.type.toLowerCase();
  return ALLOWED_TYPES.has(type) || ALLOWED_EXT.test(file.name);
}

function isGif(file: File) {
  return file.type === "image/gif" || /\.gif$/i.test(file.name);
}

async function prepareImage(file: File) {
  if (isGif(file)) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.82);
    });

    if (!blob) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export default function EstimateForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<Photo[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  photosRef.current = photos;

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, []);

  const addPhotos = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      setError(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    setError("");
    setPreparing(true);

    try {
      const next: Photo[] = [];

      for (const file of Array.from(fileList).slice(0, remaining)) {
        if (!isAllowedImage(file)) {
          setError("Please upload JPG, PNG, WEBP, GIF, or HEIC images.");
          continue;
        }

        const prepared = await prepareImage(file);

        if (prepared.size > MAX_PHOTO_BYTES) {
          setError("Each photo must be 8MB or smaller.");
          continue;
        }

        next.push({
          id: crypto.randomUUID(),
          file: prepared,
          url: URL.createObjectURL(prepared),
        });
      }

      if (next.length > 0) {
        setPhotos((current) => [...current, ...next]);
      }
    } finally {
      setPreparing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return current.filter((item) => item.id !== id);
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    photos.forEach((photo) => data.append("photos", photo.file));

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        body: data,
      });

      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        setError(payload?.error || "Could not send the request. Please try again.");
        return;
      }

      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
      setPhotos([]);
      setSubmitted(true);
    } catch {
      setError("Could not send the request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 rounded-sm border border-gold/40 bg-panel p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="#e8a33d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-wide uppercase">
          Request Sent
        </h2>
        <p className="mt-3 text-neutral-400">
          Thank you! We&apos;ll get back to you shortly to schedule your free
          estimate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 space-y-8" noValidate>
      <fieldset>
        <legend className="mb-3 font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Name
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="First Name">
            <input type="text" name="firstName" placeholder="First" required className={inputClasses} />
          </Field>
          <Field label="Last Name">
            <input type="text" name="lastName" placeholder="Last" required className={inputClasses} />
          </Field>
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone">
          <input type="tel" name="phone" placeholder="(___) ___-____" required className={inputClasses} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" placeholder="you@example.com" required className={inputClasses} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Make">
          <input type="text" name="make" placeholder="e.g. Toyota" className={inputClasses} />
        </Field>
        <Field label="Model">
          <input type="text" name="model" placeholder="e.g. Camry" className={inputClasses} />
        </Field>
        <Field label="Year">
          <input
            type="text"
            name="year"
            placeholder="e.g. 2022"
            inputMode="numeric"
            className={inputClasses}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Photos
        </legend>
        <p className="mb-4 text-sm text-neutral-500">
          Add photos of the damage. JPG, PNG, WEBP, or HEIC — up to {MAX_PHOTOS} images.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
          multiple
          className="sr-only"
          onChange={(e) => void addPhotos(e.target.files)}
        />

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square overflow-hidden rounded-sm border border-line bg-panel">
              {/* Blob previews are local object URLs, not remote assets */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-gold hover:text-ink"
                aria-label="Remove photo"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}

          {photos.length < MAX_PHOTOS ? (
            <button
              type="button"
              disabled={preparing || submitting}
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line bg-panel text-neutral-400 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase">
                {preparing ? "Adding..." : "Add"}
              </span>
            </button>
          ) : null}
        </div>
      </fieldset>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || preparing}
        className="w-full rounded-sm bg-gold px-8 py-4 font-display text-sm font-semibold tracking-[0.2em] text-ink uppercase transition-all hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(232,163,61,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Request Estimate"}
      </button>
    </form>
  );
}
