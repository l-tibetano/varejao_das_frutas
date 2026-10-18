import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, MapPin, Store, Users } from "lucide-react";
import { DeliveryConditionCard } from "@/components/site/DeliveryConditionCard";
import { cidadesTexto, condicoesEntrega, delivery, formatBRL } from "@/data/delivery";

const title = "Sobre o Varejão das Frutas — Quem somos e nosso delivery";
const description =
  "Conheça o Varejão das Frutas, nossas lojas em Janaúba e Nova Porteirinha e as condições do nosso delivery.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Sobre,
});

function Bloco({ icon: Icon, title, children }: { icon: typeof Users; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function Sobre() {
  return (
    <div className="container-site max-w-4xl py-12 sm:py-16">
      <h1 className="text-center text-4xl font-extrabold text-foreground sm:text-5xl">Sobre o Varejão das Frutas</h1>
      <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-promo" />

      <div className="mt-10 space-y-6">
        <Bloco icon={Users} title="Quem somos">
          <p>
            O Varejão das Frutas é uma empresa familiar de Janaúba-MG, criada para oferecer às famílias da nossa cidade 
            produtos de qualidade, variedade e preços justos, sempre com um atendimento próximo e de confiança.
            Hoje, somos um supermercado completo, com hortifruti, mercearia, bebidas, laticínios, congelados, produtos de 
            limpeza e açougue, além de um forte trabalho de delivery e atendimento digital. Somos uma empresa jovem, que 
            acredita em inovação, tecnologia e no poder de estar cada vez mais perto dos nossos clientes.
            Mais do que vender alimentos, queremos facilitar a vida das pessoas e fazer parte do dia a dia das famílias de 
            Janaúba e região.
          </p>
        </Bloco>

        <Bloco icon={Store} title="Nossas lojas">
          <p>
            Estamos presentes em Janaúba e Nova Porteirinha, atendendo clientes que buscam praticidade, variedade e
            boas oportunidades de economia.
          </p>
          <Link
            to="/"
            hash="lojas"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Conheça nossas lojas
          </Link>
        </Bloco>

        <section id="nosso-delivery" className="rounded-2xl bg-primary-soft p-6 sm:p-8">
          <span className="inline-block rounded-full bg-promo px-3 py-1 text-xs font-bold uppercase tracking-wider text-promo-foreground">
            Delivery
          </span>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">Suas compras entregues na sua casa</h2>
          <p className="mt-3 text-muted-foreground">
            Faça suas compras com comodidade e receba tudo na sua casa! Nosso delivery atende {cidadesTexto}, levando
            praticidade para o seu dia a dia.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {condicoesEntrega.map((c) => (
              <DeliveryConditionCard key={c.id} {...c} />
            ))}
          </div>
          <p className="mt-6 rounded-xl border-2 border-primary bg-card p-4 text-center font-display text-lg font-bold text-primary-dark">
            Compre a partir de {formatBRL(delivery.valorMinimoFrete)} e receba seu pedido sem pagar taxa de entrega!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {delivery.cidades.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 font-semibold text-primary-dark">
                <MapPin className="h-4 w-4 text-promo" /> {c}
              </span>
            ))}
          </div>
        </section>

        <Bloco icon={HeartHandshake} title="Nosso compromisso">
          <p>
            Nosso objetivo é estar cada vez mais próximo dos nossos clientes, oferecendo uma experiência de compra
            prática, atendimento atencioso e oportunidades para economizar.
          </p>
        </Bloco>
      </div>
    </div>
  );
}
