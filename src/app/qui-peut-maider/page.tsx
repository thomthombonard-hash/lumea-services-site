import type { Metadata } from "next";

import OrientationTool from "@/components/orientation/OrientationTool";

export const metadata: Metadata = {
  title: "Qui peut m’aider ? | Luméa Services",
  description:
    "Un outil gratuit pour identifier les interlocuteurs et aides possibles selon votre situation et votre commune en Sarthe, Maine-et-Loire et Mayenne.",
  alternates: {
    canonical: "https://www.lumea-services.fr/qui-peut-maider",
  },
  openGraph: {
    title: "Qui peut m’aider ? | Luméa Services",
    description:
      "Quelques questions simples pour trouver les bons interlocuteurs et savoir par où commencer.",
    url: "https://www.lumea-services.fr/qui-peut-maider",
    type: "website",
  },
};

export default function QuiPeutMAiderPage() {
  return (
    <main className="site-page site-special-page">
      <OrientationTool />
    </main>
  );
}
