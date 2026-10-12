import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import sacolas from "@/assets/delivery-sacolas.jpg";
import { condicoesEntrega, delivery } from "@/data/delivery";
import { DeliveryConditionCard } from "./DeliveryConditionCard";

export function DeliverySection() {
  return (
    <section id="delivery" className="bg-primary-soft py-16 sm:py-20">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-promo px-3 py-1 text-xs font-bold uppercase tracking-wider text-promo-foreground">
              Delivery
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">Suas compras na porta de casa!</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Não precisa sair de casa para fazer suas compras! O Varejão das Frutas entrega em Janaúba e Nova
              Porteirinha para deixar seu dia a dia mais prático.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/sobre"
                hash="nosso-delivery"
                className="inline-flex h-12 items-center rounded-full bg-primary px-7 font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Conheça nosso delivery
              </Link>
              <Link
                to="/contato"
                className="inline-flex h-12 items-center rounded-full border-2 border-primary px-7 font-bold text-primary-dark transition-colors hover:bg-card"
              >
                Entre em contato
              </Link>
            </div>
          </div>
          <img
            src={sacolas}
            alt="Sacolas com compras de supermercado: frutas, verduras, pão e leite"
            loading="lazy"
            width={1200}
            height={912}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {condicoesEntrega.map((c) => (
            <DeliveryConditionCard key={c.id} {...c} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-card sm:flex-row sm:justify-center sm:text-left">
          <span className="font-display text-lg font-bold text-foreground">Onde entregamos?</span>
          <span className="text-muted-foreground">Atendemos</span>
          <div className="flex flex-wrap justify-center gap-2">
            {delivery.cidades.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 font-semibold text-primary-dark">
                <MapPin className="h-4 w-4 text-promo" /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
