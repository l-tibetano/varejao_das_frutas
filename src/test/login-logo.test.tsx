import { QueryClient } from "@tanstack/react-query";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import logoVarejao from "@/assets/logo-varejao.png";
import { routeTree } from "@/routeTree.gen";
import { Route as LoginRoute } from "@/routes/login";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
const comRota = ({ children }: { children: React.ReactNode }) => (
  <RouterContextProvider router={router}>{children}</RouterContextProvider>
);

// A página de login mostra a logo local de src/assets, acima do título, e mantém
// os campos e o botão do formulário.
const renderLogin = () => {
  const Login = LoginRoute.options.component as React.FC;
  return render(<Login />, { wrapper: comRota });
};

describe("logo da página de login", () => {
  it("usa a imagem local src/assets/logo-varejao.png", () => {
    const { container } = renderLogin();
    const img = container.querySelector(`img[src="${logoVarejao}"]`);
    expect(img).toBeTruthy();
  });

  it("aparece acima do título e o formulário segue intacto", () => {
    const { container } = renderLogin();
    const img = container.querySelector(`img[src="${logoVarejao}"]`) as HTMLElement;
    const titulo = container.querySelector("h1");
    expect(titulo?.textContent).toBe("Entre na sua conta");
    // A logo precisa vir antes do título na ordem do documento.
    expect(img.compareDocumentPosition(titulo!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Entrar$/ })).toBeInTheDocument();
  });
});
