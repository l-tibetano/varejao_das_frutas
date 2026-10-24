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

    expect(contato.unidades.map((u) => u.nome)).toEqual(["Matriz", "Filial"]);
    expect(contato.unidades.map((u) => u.endereco)).toEqual([
      "Avenida Brasil, 1272, Esplanada, Janaúba - MG",
      "Avenida Santa Mônica, 1751, Planalto, Janaúba - MG",
    ]);

    for (const unidade of contato.unidades) {
      expect(screen.getByText(unidade.nome)).toBeTruthy();
      const link = screen.getByRole("link", { name: unidade.endereco });
      expect(link.getAttribute("href")).toBe(mapsUrl(unidade.endereco));
      expect(link.getAttribute("target")).toBe("_blank");
    }
  });
});
