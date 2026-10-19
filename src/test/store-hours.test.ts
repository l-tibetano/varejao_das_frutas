import { describe, expect, it } from "vitest";
import { lojas } from "@/data/lojas";

const loja = (nome: string) => {
  const found = lojas.find((l) => l.nome === nome);
  if (!found) throw new Error(`Loja "${nome}" não encontrada`);
  return found;
};

describe("horários de funcionamento das lojas", () => {
  it("mostra semana e domingo em linhas separadas para cada unidade", () => {
    for (const l of lojas) {
      expect(l.horarios).toHaveLength(2);
      expect(l.horarios[0].dias).toBe("Segunda a sábado");
      expect(l.horarios[1].dias).toBe("Domingo");
    }
  });

  it("Janaúba abre das 7h às 20h na semana e das 7h às 13h no domingo", () => {
    const matriz = loja("Loja Matriz");
    expect(matriz.horarios[0].das).toBe("7h às 20h");
    expect(matriz.horarios[1].das).toBe("7h às 13h");
  });

  it("Nova Porteirinha abre das 7h às 19h na semana e das 7h às 13h no domingo", () => {
    const filial = loja("Loja Filial");
    expect(filial.horarios[0].das).toBe("7h às 19h");
    expect(filial.horarios[1].das).toBe("7h às 13h");
  });
});
