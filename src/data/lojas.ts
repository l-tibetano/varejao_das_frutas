import fachada from "@/assets/loja-fachada.jpg";
import fachada2 from "@/assets/loja-fachada-2.jpg";
import interior from "@/assets/loja-interior.jpg";
import interior2 from "@/assets/loja-interior-2.jpg";
import hortifruti from "@/assets/loja-hortifruti.jpg";

export type Horario = { dias: string; das: string };

export type Loja = {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  /** Horários de funcionamento exibidos um por linha (dias de semana e domingo). */
  horarios: Horario[];
  /** Texto de busca ou coordenadas "lat,lng" para o Google Maps */
  localizacao: string;
  imagens: { src: string; alt: string }[];
};

export const lojas: Loja[] = [
  {
    id: "matriz",
    nome: "Loja Matriz",
    endereco: "Avenida Brasil, 1272, Esplanada, Janaúba - MG",
    telefone: "(38) 98816-3132",
    horarios: [
      { dias: "Segunda a sábado", das: "7h às 20h" },
      { dias: "Domingo", das: "7h às 13h" },
    ],
    localizacao: "Avenida Brasil, 1272, Esplanada, Janaúba - MG",
    imagens: [
      { src: fachada, alt: "Fachada da unidade Janaúba" },
      { src: interior, alt: "Interior da unidade Janaúba" },
      { src: hortifruti, alt: "Hortifruti da unidade Janaúba" },
    ],
  },
  {
    id: "filial",
    nome: "Loja Filial",
    endereco: "Avenida Santa Mônica, 1751, Planalto, Janaúba - MG",
    telefone: "(38) 98816-3132",
    horarios: [
      { dias: "Segunda a sábado", das: "7h às 19h" },
      { dias: "Domingo", das: "7h às 13h" },
    ],
    localizacao: "Avenida Santa Mônica, 1751, Planalto, Janaúba - MG",
    imagens: [
      { src: fachada2, alt: "Fachada da unidade Nova Porteirinha" },
      { src: interior2, alt: "Interior da unidade Nova Porteirinha" },
      { src: hortifruti, alt: "Hortifruti da unidade Nova Porteirinha" },
    ],
  },
];

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const telLink = (t: string) => `tel:+55${t.replace(/\D/g, "")}`;
