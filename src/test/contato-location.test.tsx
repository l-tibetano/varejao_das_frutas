import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { mapsUrl } from "@/data/lojas";
import { contato } from "@/data/site";
import { Route } from "@/routes/contato";

// The section's cards must show "Matriz" / "Filial" with the exact addresses,
// each address being a link to its own Google Maps search.
describe("Contato — seção Localização", () => {
  it("renders the two units with their addresses linked to Google Maps", () => {
    const Contato = Route.options.component as React.FC;
    render(<Contato />);

    const [matriz, filial] = contato.unidades;

    expect(matriz.nome).toBe("Matriz");
    expect(filial.nome).toBe("Filial");
    expect(matriz.endereco).toBe("Avenida Brasil, 1272, Esplanada, Janaúba - MG");
    expect(filial.endereco).toBe("Avenida Santa Mônica, 1751, Planalto, Janaúba - MG");

    for (const unidade of [matriz, filial]) {
      expect(screen.getByText(unidade.nome)).toBeTruthy();
      const link = screen.getByRole("link", { name: unidade.endereco });
      expect(link.getAttribute("href")).toBe(mapsUrl(unidade.endereco));
      expect(link.getAttribute("target")).toBe("_blank");
    }
  });
});
