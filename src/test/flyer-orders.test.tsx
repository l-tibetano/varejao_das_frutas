import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OfferCard } from "@/components/site/OfferCard";
import { FlyerViewer } from "@/components/site/FlyerViewer";
import type { Folheto } from "@/data/folhetos";
import { getOfferStatus } from "@/lib/offer-status";

const flyer: Folheto = {
  id: "test", nome: "Ofertas", inicio: "2026-10-20", fim: "2026-10-24",
  capa: "/cover.jpg", paginas: ["/cover.jpg", "/page2.jpg"],
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 9, 24, 23, 59, 59));
});
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("validade dos folhetos", () => {
  it("permanece válido até o último segundo da data de término", () => {
    expect(getOfferStatus(flyer.inicio, flyer.fim).tone).toBe("urgent");
    render(<><OfferCard folheto={flyer} onOpen={() => {}} /><FlyerViewer folheto={flyer} onClose={() => {}} /></>);
    expect(screen.getAllByRole("link", { name: "Pedir agora pelo WhatsApp" })).toHaveLength(2);
  });

  it("não permite pedir no dia seguinte, mas mantém a visualização", () => {
    vi.setSystemTime(new Date(2026, 9, 25, 0, 0, 0));
    expect(getOfferStatus(flyer.inicio, flyer.fim).tone).toBe("expired");
    const open = vi.fn();
    render(<><OfferCard folheto={flyer} onOpen={open} /><FlyerViewer folheto={flyer} onClose={() => {}} /></>);
    expect(screen.queryByRole("link", { name: "Pedir agora pelo WhatsApp" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Abrir folheto Ofertas" }));
    expect(open).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    expect(screen.getByRole("img", { name: "Ofertas — página 2" }).getAttribute("src")).toBe("/page2.jpg");
  });

  it("não classifica como expirado um folheto sem data final", () => {
    const undated = { ...flyer, fim: undefined };
    expect(getOfferStatus(undated.inicio, undated.fim).tone).toBe("active");
    render(<><OfferCard folheto={undated} onOpen={() => {}} /><FlyerViewer folheto={undated} onClose={() => {}} /></>);
    expect(screen.getAllByRole("link", { name: "Pedir agora pelo WhatsApp" })).toHaveLength(2);
  });

  it("abre o WhatsApp informado em nova aba sem ampliar o folheto", () => {
    const open = vi.fn();
    render(<OfferCard folheto={flyer} onOpen={open} />);
    const link = screen.getByRole("link", { name: "Pedir agora pelo WhatsApp" });
    expect(link.getAttribute("href")).toBe("https://wa.me/message/BY5K2DVXUUI2J1");
    expect(link.getAttribute("target")).toBe("_blank");
    fireEvent.click(link);
    expect(open).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Abrir folheto Ofertas" }));
    expect(open).toHaveBeenCalledOnce();
  });

  it("retira o pedido automaticamente quando passa a meia-noite", () => {
    render(<OfferCard folheto={flyer} onOpen={() => {}} />);
    expect(screen.getByRole("link", { name: "Pedir agora pelo WhatsApp" })).toBeTruthy();
    vi.setSystemTime(new Date(2026, 9, 25, 0, 0, 1));
    fireEvent(window, new Event("focus"));
    expect(screen.queryByRole("link", { name: "Pedir agora pelo WhatsApp" })).toBeNull();
  });
});