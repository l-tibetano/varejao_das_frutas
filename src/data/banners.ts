import bannerOfertas from "@/assets/banner-ofertas.jpg";
import bannerDelivery from "@/assets/banner-delivery.jpg";

export type Banner = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  botaoTexto: string;
  /** Rota e âncora de destino */
  destino: { to: "/" | "/sobre" | "/contato"; hash?: string };
};

export const banners: Banner[] = [
  {
    id: "ofertas",
    titulo: "Economize nas compras do dia a dia!",
    descricao: "Confira nossos folhetos e aproveite as ofertas especiais do Varejão das Frutas.",
    imagem: bannerOfertas,
    botaoTexto: "Ver ofertas",
    destino: { to: "/", hash: "ofertas" },
  },
  {
    id: "delivery",
    titulo: "Suas compras na porta de casa!",
    descricao: "Receba suas compras em Janaúba e Nova Porteirinha com praticidade e comodidade.",
    imagem: bannerDelivery,
    botaoTexto: "Conheça nosso delivery",
    destino: { to: "/", hash: "delivery" },
  },
];
