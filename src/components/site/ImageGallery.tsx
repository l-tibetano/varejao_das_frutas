import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + images.length) % images.length);
  const btn =
    "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-foreground shadow-card transition hover:bg-card";

  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
      {images.map((img, idx) => (
        <img
          key={img.src + idx}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          width={1200}
          height={800}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            idx === i ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <button className={`${btn} left-3`} onClick={() => go(i - 1)} aria-label="Imagem anterior">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button className={`${btn} right-3`} onClick={() => go(i + 1)} aria-label="Próxima imagem">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ver imagem ${idx + 1}`}
            className={cn("h-2 rounded-full transition-all", idx === i ? "w-6 bg-card" : "w-2 bg-card/60")}
          />
        ))}
      </div>
    </div>
  );
}
