import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EstimateForm from "@/components/EstimateForm";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote — Prime PDR",
  description:
    "Request a free paintless dent repair estimate from Prime PDR in Austin, Texas.",
};

export default function EstimatePage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-36 pb-24">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-gold/8 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-0">
          <h1 className="font-display text-5xl font-bold tracking-wide uppercase sm:text-6xl">
            Get a <span className="text-gold">Quote</span>
          </h1>
          <div className="mt-5 h-0.5 w-14 bg-gold" />
          <p className="mt-7 leading-relaxed text-neutral-400">
            Ready to schedule your free evaluation and estimate? Simply fill out
            the form below and we will get back to you to schedule an
            appointment at a date and time that works with your schedule. Prefer
            to text? Send us videos and photos of your vehicle&apos;s damage to{" "}
            <a href={`sms:${PHONE}`} className="font-medium text-gold hover:underline">
              {PHONE_DISPLAY}
            </a>{" "}
            for a repair quote. Our goal is to make it as easy and convenient as
            possible to get an estimate for your repair.
          </p>

          <EstimateForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
