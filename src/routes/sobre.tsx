import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Eye, Heart, HeartHandshake, MapPin, Rocket, Store, Target, Users } from "lucide-react";
import { DeliveryConditionCard } from "@/components/site/DeliveryConditionCard";
import { DeliveryHours } from "@/components/site/DeliveryHours";
import { cidadesTexto, condicoesEntrega, delivery, formatBRL } from "@/data/delivery";
import { BrandSymbol } from "@/components/site/BrandSymbol";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const pilares = [
  {
    title: "Propósito",
    icon: Target,
    text: "Transformar a compra de alimentos em uma experiência simples, acessível e de qualidade, levando produtos frescos, bons preços e atendimento de verdade para as famílias de Janaúba e região.",
  },
  {
    title: "Missão",
    icon: Rocket,
    text: "Oferecer frutas, verduras, carnes, mercearia e demais produtos essenciais com qualidade, variedade e preços competitivos, buscando sempre facilitar a vida dos nossos clientes através de um atendimento próximo, rápido e eficiente.",
  },
  {
    title: "Visão",
    icon: Eye,
    text: "Supermercado omnichannel com lojas físicas, porém ser referência no digital com o delivery de alimentos em Janaúba e região! Com um mercado completo na palma da mão. Pediu? Chegou! Vem pro Varejão!",
  },
];

const valores = [
  { name: "Preço justo", description: "trabalhar para oferecer sempre o melhor preço possível." },
  { name: "Qualidade", description: "produtos frescos, selecionados e de confiança." },
  { name: "Cliente em primeiro lugar", description: "ouvir, respeitar e buscar superar as expectativas." },
  { name: "Honestidade", description: "transparência em nossas relações com clientes, colaboradores e fornecedores." },
  { name: "Agilidade", description: "facilitar a compra e entregar soluções rápidas." },
  { name: "Inovação", description: "buscar novas formas de vender, atender e melhorar a experiência do cliente." },
  { name: "Respeito às pessoas", description: "valorizar clientes, colaboradores e parceiros." },
  { name: "Trabalho em equipe", description: "crescer juntos e fazer acontecer." },
  { name: "Compromisso com a cidade", description: "crescer junto com Janaúba e contribuir para o desenvolvimento da nossa comunidade." },
];

function NossaEssencia() {
  return (
    <section aria-labelledby="nossa-essencia" className="py-6 sm:py-8">
      <h2 id="nossa-essencia" className="text-center text-3xl font-extrabold text-primary-dark sm:text-4xl">
        Nossa essência
      </h2>
      <span aria-hidden="true" className="mx-auto mt-2 block h-1 w-14 rounded-full bg-promo" />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {pilares.map(({ title, icon: Icon, text }) => (
          <article key={title} className="rounded-2xl bg-card p-6 shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-2xl font-bold text-primary-dark">{title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
            <Heart aria-hidden="true" className="h-5 w-5" />
          </span>
          <h3 className="text-2xl font-bold text-primary-dark">Valores</h3>
        </div>
        <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {valores.map(({ name, description }) => (
            <li key={name} className="flex items-start gap-3 border-b border-border pb-5">
              <BadgeCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="min-w-0 leading-relaxed text-muted-foreground">
                <strong className="block font-bold text-primary-dark">{name}</strong>
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 rounded-xl bg-primary-soft px-5 py-5 text-center font-display text-xl font-bold text-primary-dark sm:text-2xl">
        Pediu? Chegou! Vem pro Varejão!
      </p>
    </section>
  );
}

function Sobre() {
  return (
    <div className="container-site max-w-4xl py-12 sm:py-16">
      <BrandSymbol className="mx-auto h-20" />
      <h1 className="mt-3 text-center text-4xl font-extrabold text-foreground sm:text-5xl">Sobre o Varejão das Frutas</h1>
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

        <NossaEssencia />

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
          <DeliveryHours className="mt-4" />
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
