import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import logoAsset from "@/assets/logo-varejao.png.asset.json";
import { folhetos } from "@/data/folhetos";
import { FlyerViewer } from "@/components/site/FlyerViewer";
import { Route as SobreRoute } from "@/routes/sobre";
import { Route as ContatoRoute } from "@/routes/contato";

// O símbolo vem do arquivo em src/assets e precisa aparecer nas páginas que não
// têm marca própria (Sobre, Contato) e na ampliação dos folhetos.
const temSimbolo = (container: HTMLElement) =>
  Boolean(container.querySelector(`img[src="${logoAsset.url}"]`));

describe("símbolo do Varejão das Frutas", () => {
  it("aparece no topo da página Sobre", () => {
    const Sobre = SobreRoute.options.component as React.FC;
    const { container } = render(<Sobre />);
    expect(temSimbolo(container)).toBe(true);
  });

  it("aparece no topo da página Contato", () => {
    const Contato = ContatoRoute.options.component as React.FC;
    const { container } = render(<Contato />);
    expect(temSimbolo(container)).toBe(true);
  });

  it("aparece na barra da ampliação de folheto", () => {
    const [primeiro] = folhetos;
    if (!primeiro) throw new Error("Nenhum folheto cadastrado");
    const { container } = render(<FlyerViewer folheto={primeiro} onClose={() => {}} />);
    expect(temSimbolo(container)).toBe(true);
  });
});
