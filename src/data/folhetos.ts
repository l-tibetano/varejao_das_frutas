import semana from "@/assets/folheto-semana.jpg";
import hortifruti from "@/assets/folheto-hortifruti.jpg";
import acougue from "@/assets/folheto-acougue.jpg";
import festival from "@/assets/folheto-festival.jpg";

export type Folheto = {
  id: string;
  nome: string;
  capa: string;
  /** Datas no formato AAAA-MM-DD */
  inicio: string;
  fim?: string;
  paginas: string[];
};

// Datas de demonstração relativas a hoje. Em produção, use datas fixas, ex.: "2026-10-12".
function dia(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dd}`;
}

export const folhetos: Folheto[] = [
  { id: "semana", nome: "Ofertas da Semana", capa: semana, inicio: dia(-4), fim: dia(3), paginas: [semana] },
  { id: "hortifruti", nome: "Especial de Hortifruti", capa: hortifruti, inicio: dia(-2), fim: dia(1), paginas: [hortifruti] },
  { id: "acougue", nome: "Ofertas de Açougue", capa: acougue, inicio: dia(-1), fim: dia(5), paginas: [acougue] },
  { id: "festival", nome: "Festival de Economia", capa: festival, inicio: dia(-6), fim: dia(0), paginas: [festival] },
];
