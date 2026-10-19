import { describe, expect, it } from "vitest";
import { lojas, type Horario } from "@/data/lojas";

const loja = (nome: string) => {
  const found = lojas.find((l) => l.nome === nome);
  if (!found) throw new Error(`Loja "${nome}" não encontrada`);
  return found;
};

const linha = (l: ReturnType<typeof loja>, i: number): Horario => {
  const h = l.horarios[i];
  if (!h) throw new Error(`Loja "${l.nome}" não tem horário na linha ${i + 1}`);
  return h;
};

describe("horários de funcionamento das lojas", () => {
  it("mostra semana e domingo em linhas separadas para cada unidade", () => {
    for (const l of lojas) {
      expect(l.horarios).toHaveLength(2);
      expect(linha(l, 0).dias).toBe("Segunda a sábado");
      expect(linha(l, 1).dias).toBe("Domingo");
    }
  });

  it("Janaúba abre das 7h às 20h na semana e das 7h às 13h no domingo", () => {
    const matriz = loja("Loja Matriz");
    expect(linha(matriz, 0).das).toBe("7h às 20h");
    expect(linha(matriz, 1).das).toBe("7h às 13h");
  });

  it("Nova Porteirinha abre das 7h às 19h na semana e das 7h às 13h no domingo", () => {
    const filial = loja("Loja Filial");
    expect(linha(filial, 0).das).toBe("7h às 19h");
    expect(linha(filial, 1).das).toBe("7h às 13h");
  });
});
