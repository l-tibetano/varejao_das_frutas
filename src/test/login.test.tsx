import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterContextProvider } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/site/LoginForm";
import { authConfig } from "@/config/auth";
import { loginSchema, requestLogin } from "@/lib/login";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
function renderForm() {
  return render(<RouterContextProvider router={router}><LoginForm /></RouterContextProvider>);
}
function fillForm() {
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "cliente@example.com" } });
  fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "test-password" } });
}
afterEach(() => vi.unstubAllGlobals());

describe("initial login rules", () => {
  it("rejects missing fields and invalid email before making a request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(loginSchema.safeParse({ email: "invalid", password: "test" }).success).toBe(false);
    await expect(requestLogin({ email: "invalid", password: "test" })).rejects.toThrow();
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /^Entrar$/ }));
    await waitFor(() => expect(screen.getAllByRole("alert")).toHaveLength(2));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("POSTs only validated email and password as JSON to the configured placeholder", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("network details"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(requestLogin({ email: " cliente@example.com ", password: "test-password" })).rejects.toThrow();
    expect(authConfig.loginEndpoint).toBe("https://api.exemplo-invalido.local/auth/login");
    expect(fetchMock).toHaveBeenCalledWith(authConfig.loginEndpoint, expect.objectContaining({
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "cliente@example.com", password: "test-password" }),
      credentials: "omit", cache: "no-store", redirect: "error",
    }));
  });

  it("prevents duplicate submissions while pending and allows retry after a friendly failure", async () => {
    let rejectRequest: ((reason: Error) => void) | undefined;
    const fetchMock = vi.fn().mockImplementation(() => new Promise((_resolve, reject) => { rejectRequest = reject; }));
    vi.stubGlobal("fetch", fetchMock);
    renderForm();
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /^Entrar$/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Entrando…" })).toBeDisabled());
    fireEvent.click(screen.getByRole("button", { name: "Entrando…" }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    if (!rejectRequest) throw new Error("No pending request");
    rejectRequest(new Error("sensitive technical details"));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Não foi possível realizar o login no momento. Tente novamente mais tarde."));
    expect(screen.queryByText("sensitive technical details")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Entrar$/ })).toBeEnabled();
    fetchMock.mockRejectedValue(new Error("offline"));
    fireEvent.click(screen.getByRole("button", { name: /^Entrar$/ }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it("never treats a placeholder response as successful authentication", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
    await expect(requestLogin({ email: "cliente@example.com", password: "test-password" })).rejects.toThrow();
  });

  it("toggles password visibility without changing its value", () => {
    renderForm();
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Senha")).toHaveValue("test-password");
    fireEvent.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });
});