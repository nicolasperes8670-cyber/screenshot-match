import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Old Crown Barbearia | Barbearia em Porto Alegre desde 1985" },
      { name: "description", content: "Corte clássico, barba na navalha e toalha quente na Old Crown Barbearia, em Porto Alegre. Tradição desde 1985. Agende pelo WhatsApp." },
      { property: "og:title", content: "Old Crown Barbearia — Tradição desde 1985" },
      { property: "og:description", content: "Seu corte. Seu tempo. Sua tradição. Conheça a Old Crown em Porto Alegre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The preview and downloadable HTML share one self-contained document.
function Index() {
  return (
    <iframe className="standalone-page" src="/old-crown.html" title="Old Crown Barbearia — página completa" />
  );
}
