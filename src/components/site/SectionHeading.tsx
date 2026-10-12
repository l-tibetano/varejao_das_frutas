export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h2>
      <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-promo" />
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
