import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const html = readFileSync("public/old-crown.html", "utf8");
const document = new JSDOM(html).window.document;

describe("Old Crown service prices", () => {
  it.each([
    ["Corte clássico", 45],
    ["Barba na navalha", 35],
    ["Corte + barba", 70],
    ["Sobrancelha", 15],
    ["Pigmentação", 40],
  ])("charges %s at R$ %i", (service, price) => {
    const item = Array.from(document.querySelectorAll("[data-service]")).find(
      (element) => element.getAttribute("data-service") === service,
    );
    expect(Number(item?.getAttribute("data-price"))).toBe(price);
    expect(item?.querySelector(".price")?.textContent).toBe(`R$ ${price}`);
  });
});

describe("Old Crown opening hours", () => {
  it("opens Monday to Friday from 9h to 19h30", () => {
    expect(document.querySelector('[data-hours="week"] dd')?.textContent).toBe("9h às 19h30");
  });
  it("opens Saturday from 8h to 18h", () => {
    expect(document.querySelector('[data-hours="saturday"] dd')?.textContent).toBe("8h às 18h");
  });
  it("is closed Sunday", () => {
    expect(document.querySelector('[data-hours="sunday"] dd')?.textContent).toBe("Fechado");
  });
});

describe("WhatsApp configuration", () => {
  it("uses the same example number and encoded appointment message on every booking link", () => {
    const dom = new JSDOM(html, { runScripts: "outside-only" });
    dom.window.matchMedia = () => ({ matches: true }) as MediaQueryList;
    const script = dom.window.document.querySelector("script")?.textContent;
    if (!script) throw new Error("Missing page script");
    dom.window.eval(script);
    const links = Array.from(dom.window.document.querySelectorAll("[data-whatsapp]"));
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const url = new URL(link.getAttribute("href") || "");
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/5555999999999");
      expect(url.searchParams.get("text")).toBe("Olá! Gostaria de agendar um horário.");
    }
    dom.window.close();
  });
});