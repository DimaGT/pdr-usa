type Props = {
  title: string;
  align?: "left" | "center";
};

export default function SectionHeading({ title, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="font-display text-3xl font-semibold tracking-wide uppercase sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-0.5 w-14 bg-gold ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
