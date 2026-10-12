export type OfferStatus = {
  label: string;
  tone: "upcoming" | "active" | "urgent" | "expired";
};

const toDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
};
const DAY = 86_400_000;

export function getOfferStatus(inicio: string, fim: string, hoje = new Date()): OfferStatus {
  const today = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime();
  const start = Math.round((toDay(inicio) - today) / DAY);
  const end = Math.round((toDay(fim) - today) / DAY);

  if (start > 0) return { label: start === 1 ? "Começa amanhã" : `Começa em ${start} dias`, tone: "upcoming" };
  if (end < 0) return { label: "Oferta encerrada", tone: "expired" };
  if (end === 0) return { label: "Último dia", tone: "urgent" };
  if (end === 1) return { label: "Expira amanhã", tone: "urgent" };
  return { label: `Expira em ${end} dias`, tone: "active" };
}

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
