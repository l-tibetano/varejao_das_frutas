import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contato } from "@/data/site";
import { Route } from "@/routes/contato";

// The phone number must stay a single clickable link, with the WhatsApp
// address as its destination and the number itself as the visible text.
describe("Contato — link do telefone", () => {
  it("points the phone link to the WhatsApp address", () => {
    const Contato = Route.options.component as React.FC;
    render(<Contato />);

    const link = screen.getByRole("link", { name: contato.telefone });
    expect(link.getAttribute("href")).toBe("https://wa.me/message/BY5K2DVXUUI2J1");
  });
});
