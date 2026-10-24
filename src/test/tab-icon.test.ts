import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { Route } from "@/routes/__root";

const head = Route.options.head!({} as never);
const links = head.links as { rel: string; href: string }[];

const link = (rel: string, href: string) => links.find((l) => l.rel === rel && l.href === href);
const publicPath = (file: string) => resolve(process.cwd(), "public", file);

describe("ícone da aba do navegador", () => {
  it("aponta a aba e a tela inicial para os arquivos do logo", () => {
    expect(link("icon", "/favicon.png")).toBeTruthy();
    expect(link("icon", "/favicon.ico")).toBeTruthy();
    expect(link("apple-touch-icon", "/apple-touch-icon.png")).toBeTruthy();
  });

  it("os arquivos de ícone estão presentes e íntegros", () => {
    const png = readFileSync(publicPath("favicon.png"));
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(existsSync(publicPath("favicon.ico"))).toBe(true);
    expect(existsSync(publicPath("apple-touch-icon.png"))).toBe(true);
  });
});
