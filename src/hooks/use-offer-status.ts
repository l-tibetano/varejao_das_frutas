import { useEffect, useState } from "react";
import { getOfferStatus, type OfferStatus } from "@/lib/offer-status";

export function useOfferStatus(inicio: string, fim?: string) {
  const [status, setStatus] = useState<OfferStatus | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      setStatus(getOfferStatus(inicio, fim));
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = setTimeout(refresh, midnight.getTime() - now.getTime() + 100);
    };
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [inicio, fim]);

  return status;
}