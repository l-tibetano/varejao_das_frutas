// Informações do delivery — usadas na página inicial e na página Sobre.
export type HorarioDelivery = { periodo: string; das: string };

export const delivery = {
  cidades: ["Janaúba", "Nova Porteirinha"],
  valorMinimoFrete: 50,
  taxaEntrega: 5,
  horarios: [
    { periodo: "Manhã", das: "das 8h às 13h" },
    { periodo: "Tarde", das: "das 15h às 19h" },
  ] as HorarioDelivery[],
};

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const condicoesEntrega = [
  {
    id: "com-taxa",
    destaque: false,
    titulo: `Compras abaixo de ${formatBRL(delivery.valorMinimoFrete)}`,
    principal: `Taxa de entrega de ${formatBRL(delivery.taxaEntrega)}`,
    texto: "Faça suas compras e receba tudo no conforto da sua casa.",
  },
  {
    id: "gratis",
    destaque: true,
    titulo: `Compras a partir de ${formatBRL(delivery.valorMinimoFrete)}`,
    principal: "Entrega grátis!",
    texto: "Economize na entrega e receba suas compras sem pagar taxa.",
  },
] as const;

export const cidadesTexto = delivery.cidades.join(" e ");
