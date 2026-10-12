import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/data/banners";
import { cn } from "@/lib/utils";

export function PromoCarousel({ slides, interval = 5000 }: { slides: Banner[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // reinicia o temporizador após navegação manual
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => {
      setIndex((i + slides.length) % slides.length);
      setTick((t) => t + 1);
    },
    [slides.length],
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [interval, slides.length, tick]);

  return (
    <section
      className="relative h-[380px] w-full overflow-hidden bg-overlay sm:h-[420px] lg:h-[460px]"
      aria-roledescription="carrossel"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <img
            src={s.imagem}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={800}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="container-site absolute inset-0 flex items-center">
            <div className="max-w-lg px-10 text-primary-foreground sm:px-12">
              <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">{s.titulo}</h1>
              <p className="mt-3 text-base text-primary-foreground/90 sm:text-lg">{s.descricao}</p>
              <Link
                to={s.destino.to}
                hash={s.destino.hash ?? ""}
                tabIndex={i === index ? 0 : -1}
                className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-7 font-bold text-primary-foreground shadow-card transition-colors hover:bg-primary-dark"
              >
                {s.botaoTexto}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => go(index - 1)}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-foreground shadow-card transition hover:bg-card sm:left-4"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Próximo slide"
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-foreground shadow-card transition hover:bg-card sm:right-4"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === index ? "w-8 bg-primary-foreground" : "w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
