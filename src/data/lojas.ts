import fachada from "@/assets/loja-fachada.jpg";
import fachada2 from "@/assets/loja-fachada-2.jpg";
import interior from "@/assets/loja-interior.jpg";
import interior2 from "@/assets/loja-interior-2.jpg";
import hortifruti from "@/assets/loja-hortifruti.jpg";

export type Loja = {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  horario: string;
  /** Texto de busca ou coordenadas "lat,lng" para o Google Maps */
  localizacao: string;
  imagens: { src: string; alt: string }[];
};

export const lojas: Loja[] = [
  {
    id: "janauba",
    nome: "Unidade Janaúba",
    endereco: "Avenida Brasil, 250, Centro, Janaúba - MG",
    telefone: "(38) 99999-1111",
    horario: "Segunda a sábado, das 7h às 20h",
    localizacao: "Avenida Brasil, 250, Centro, Janaúba - MG",
    imagens: [
      { src: fachada, alt: "Fachada da unidade Janaúba" },
      { src: interior, alt: "Interior da unidade Janaúba" },
      { src: hortifruti, alt: "Hortifruti da unidade Janaúba" },
    ],
  },
  {
    id: "nova-porteirinha",
    nome: "Unidade Nova Porteirinha",
    endereco: "Rua das Flores, 120, Centro, Nova Porteirinha - MG",
    telefone: "(38) 99999-2222",
    horario: "Segunda a sábado, das 7h às 19h",
    localizacao: "Rua das Flores, 120, Centro, Nova Porteirinha - MG",
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
