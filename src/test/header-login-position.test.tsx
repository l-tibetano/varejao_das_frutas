import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterContextProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/Header";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

function renderHeader() {
  return render(
    <RouterContextProvider router={router}>
      <Header />
    </RouterContextProvider>,
  );
}

function getHeader(container: HTMLElement) {
  const header = container.querySelector("header");
  if (!header) throw new Error("cabeçalho não encontrado");
  return header;
}

describe("posição do botão Entrar no menu superior", () => {
  it("fica no lado direito do cabeçalho, depois dos links de navegação", () => {
    const { container } = renderHeader();
    const header = getHeader(container);
    const login = header.querySelector('a[href="/login"]');
    if (!login) throw new Error("botão Entrar ausente");
    const menu = header.querySelector('button[aria-label="Abrir menu"]');
    if (!menu) throw new Error("controle do menu móvel ausente");
    const nav = header.querySelector('nav[aria-label="Principal"]');
    if (!nav) throw new Error("navegação principal ausente");

    // Mesmo grupo do lado direito que o controle do menu móvel.
    expect(login.parentElement).toBe(menu.parentElement);
    // Vem depois de todos os links de navegação na ordem de leitura.
    expect(nav.compareDocumentPosition(login) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Ícone, texto e destino preservados.
    expect(login.querySelector("svg")).not.toBeNull();
    expect(login.textContent).toBe("Entrar");
    expect(login.getAttribute("target")).toBeNull();
  });

  it("mantém o logotipo como primeiro elemento da linha do cabeçalho", () => {
    const { container } = renderHeader();
    const row = getHeader(container).firstElementChild;
    expect(row?.firstElementChild?.getAttribute("aria-label")).toBe(
      "Varejão das Frutas — página inicial",
    );
  });
});
