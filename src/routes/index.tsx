import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PromoCarousel } from "@/components/site/PromoCarousel";
import { OfferCard } from "@/components/site/OfferCard";
import { FlyerViewer } from "@/components/site/FlyerViewer";
import { DeliverySection } from "@/components/site/DeliverySection";
import { StoreCard } from "@/components/site/StoreCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { banners } from "@/data/banners";
import { folhetos, type Folheto } from "@/data/folhetos";
import { lojas } from "@/data/lojas";

const title = "Varejão das Frutas — Ofertas, delivery e lojas em Janaúba e Nova Porteirinha";
const description =
  "Confira os folhetos de ofertas do Varejão das Frutas, receba suas compras em casa e encontre nossas lojas em Janaúba e Nova Porteirinha.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const [aberto, setAberto] = useState<Folheto | null>(null);
  const fechar = useCallback(() => setAberto(null), []);

  return (
    <>
      <PromoCarousel slides={banners} />

      <section id="ofertas" className="container-site py-16 sm:py-20">
        <SectionHeading title="Ofertas em destaque" subtitle="Confira nossos folhetos e aproveite as ofertas disponíveis!" />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {folhetos.map((f) => (
            <OfferCard key={f.id} folheto={f} onOpen={() => setAberto(f)} />
          ))}
        </div>
      </section>

      <DeliverySection />

      <section id="lojas" className="container-site py-16 sm:py-20">
        <SectionHeading title="Nossas lojas" subtitle="Encontre a unidade mais próxima de você!" />
        <div className="grid gap-6 md:grid-cols-2">
          {lojas.map((l) => (
            <StoreCard key={l.id} loja={l} />
          ))}
        </div>
      </section>

      <FlyerViewer folheto={aberto} onClose={fechar} />
    </>
  );
}
