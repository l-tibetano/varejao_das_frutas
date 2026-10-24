import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DeliveryHours } from "@/components/site/DeliveryHours";
import { condicoesEntrega, delivery } from "@/data/delivery";

// O delivery funciona em dois períodos; ambos precisam aparecer na home e na página Sobre.
describe("horário de funcionamento do delivery", () => {
  it("tem exatamente dois períodos, manhã e tarde", () => {
    expect(delivery.horarios.map((h) => h.periodo)).toEqual(["Manhã", "Tarde"]);
    expect(delivery.horarios.map((h) => h.das)).toEqual(["das 8h às 13h", "das 15h às 19h"]);
  });

  it("apresenta os dois períodos com seus horários", () => {
    render(<DeliveryHours />);
    expect(screen.getByText("Manhã: das 8h às 13h.")).toBeTruthy();
    expect(screen.getByText("Tarde: das 15h às 19h.")).toBeTruthy();
  });

  it("mantém as cidades atendidas e as condições de frete já existentes", () => {
    expect(delivery.cidades).toEqual(["Janaúba", "Nova Porteirinha"]);
    expect(delivery.valorMinimoFrete).toBe(50);
    expect(delivery.taxaEntrega).toBe(5);
    expect(condicoesEntrega).toHaveLength(2);
    expect(condicoesEntrega.map((c) => c.principal)).toContain("Entrega grátis!");
  });
});
