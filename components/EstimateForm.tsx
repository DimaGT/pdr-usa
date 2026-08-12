"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-sm border border-line bg-panel px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-gold focus:outline-none";

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

export default function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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

      <button
        type="submit"
        className="w-full rounded-sm bg-gold px-8 py-4 font-display text-sm font-semibold tracking-[0.2em] text-ink uppercase transition-all hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(232,163,61,0.3)] sm:w-auto"
      >
        Request Estimate
      </button>
    </form>
  );
}
