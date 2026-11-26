import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/siteSeo";

export const metadata = pageMetadata(
  "/contact",
  "Devis ménage et vitrerie à La Flèche | Luméa Services",
  "Contactez votre agence Luméa Services à La Flèche pour un devis gratuit de ménage à domicile, de nettoyage de vitres ou de grand nettoyage.",
);

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
