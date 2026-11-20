import type { Metadata } from "next";
import { ChristmasContestPageContent } from "@/components/ChristmasContest";
import { CHRISTMAS_CONTEST } from "@/lib/christmasContest";

export const metadata: Metadata = {
  title: "Concours de Noël 2026 | Luméa Services à La Flèche",
  description: "Trois lots de ménage et de vitrerie à gagner à La Flèche et 20 km autour. Concours Facebook du 1er au 24 décembre 2026, règlement et conditions.",
  alternates: { canonical: CHRISTMAS_CONTEST.pageUrl },
  openGraph: {
    title: "3 mois de ménage à gagner avec Luméa Services",
    description: "Le concours de Noël 2026 : trois gagnants et 833,50 € de prestations à domicile à La Flèche et 20 km autour. Gratuit, sans obligation d’achat.",
    url: CHRISTMAS_CONTEST.pageUrl,
    siteName: "Luméa Services",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ChristmasContestPage() {
  return <ChristmasContestPageContent />;
}
