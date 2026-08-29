import type { OfficialSource } from "@/lib/orientation/types";

export const officialSources: OfficialSource[] = [
  {
    id: "source-sarthe-autonomie",
    title: "Sarthe Autonomie",
    organization: "Département de la Sarthe",
    url: "https://www.sarthe.fr/solidarite-autonomie/sarthe-autonomie",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-sarthe-apa",
    title: "Allocation personnalisée d'autonomie (APA)",
    organization: "Département de la Sarthe",
    url: "https://www.sarthe.fr/solidarite-autonomie/personnes-agees/allocation-personnalisee-dautonomie-apa",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-mda-49",
    title: "Maison départementale de l'autonomie",
    organization: "Département de Maine-et-Loire",
    url: "https://www.mda.maine-et-loire.fr/",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-apa-49",
    title: "Allocation personnalisée d'autonomie",
    organization: "Département de Maine-et-Loire",
    url: "https://www.maine-et-loire.fr/aides-et-services/autonomie/allocation-personnalisee-dautonomie",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-mda-53",
    title: "Maison départementale de l'autonomie",
    organization: "Département de la Mayenne",
    url: "https://mda.lamayenne.fr/",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-apa-53",
    title: "Droits et démarches des personnes âgées",
    organization: "Maison départementale de l'autonomie de la Mayenne",
    url: "https://mda.lamayenne.fr/personnes-agees/mes-droits-et-demarches/",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-pch-53",
    title: "Vivre chez soi - Prestation de compensation du handicap",
    organization: "Maison départementale de l'autonomie de la Mayenne",
    url: "https://mda.lamayenne.fr/personnes-en-situation-de-handicap/vivre-chez-soi/",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-carsat-ardh",
    title: "Aide après une hospitalisation",
    organization: "Carsat Pays de la Loire",
    url: "https://www.carsat-pl.fr/home/retraites/votre-sante/aide-apres-une-hospitalisation.html",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-caisse-retraite",
    title: "Les aides des caisses de retraite",
    organization:
      "Portail national d'information pour les personnes âgées",
    url: "https://www.pour-les-personnes-agees.gouv.fr/beneficier-daides/les-aides-domicile/les-aides-des-caisses-de-retraite",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-aide-domicile-age",
    title: "J'ai besoin d'être aidé à domicile : comment faire ?",
    organization:
      "Portail national d'information pour les personnes âgées",
    url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-d-aide-a-domicile/j-ai-besoin-d-etre-aide-a-domicile-comment-faire",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-services-aide-domicile",
    title: "Les services d'aide à domicile",
    organization:
      "Portail national d'information pour les personnes âgées",
    url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-d-aide-a-domicile/les-services-d-aide-a-domicile",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-portage-repas",
    title: "Le portage de repas à domicile",
    organization:
      "Portail national d'information pour les personnes âgées",
    url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-d-aide-a-domicile/le-portage-de-repas-a-domicile",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-apa-national",
    title: "L'APA à domicile",
    organization:
      "Portail national d'information pour les personnes âgées",
    url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/aides-financieres/l-apa-a-domicile",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-pch-national",
    title: "La prestation de compensation du handicap (PCH)",
    organization: "Mon Parcours Handicap",
    url: "https://www.monparcourshandicap.gouv.fr/aides/la-prestation-de-compensation-du-handicap-pch",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-sap-general",
    title: "Comment recourir aux services à la personne",
    organization:
      "Direction générale des entreprises - Services à la personne",
    url: "https://www.servicesalapersonne.gouv.fr/je-suis-un-particulier/particuliers-comment-recourir-aux-services-la-personne",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-sap-credit-impot",
    title:
      "Crédit d'impôt lié à l'emploi d'un salarié à domicile",
    organization:
      "Ministère de l'Économie et des Finances",
    url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/beneficier-daides-et-de-reductions-dimpots/tout-savoir-sur-le-credit-dimpot-lie-lemploi-dun-salarie-domicile",
    checkedAt: "2026-08-29",
  },

  {
    id: "source-ccas",
    title: "Action sociale et santé",
    organization:
      "Direction générale des collectivités locales",
    url: "https://www.collectivites-locales.gouv.fr/animer-les-territoires/services-la-population/les-services-publics-locaux/action-sociale-et-sante",
    checkedAt: "2026-08-29",
  },
];

export function getOfficialSource(
  id: string
): OfficialSource | undefined {
  return officialSources.find(
    (source) => source.id === id
  );
}