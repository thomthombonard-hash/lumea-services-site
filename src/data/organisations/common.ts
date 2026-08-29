import type { Organization } from "@/lib/orientation/types";

export const commonOrganizations: Organization[] = [
  {
    id: "carsat-pays-de-la-loire",
    name: "Carsat Pays de la Loire",
    type: "carsat",
    departments: ["72", "49", "53"],

    website:
      "https://www.carsat-pl.fr/",

    description:
      "Caisse régionale de l'Assurance retraite pour les personnes relevant du régime général en Pays de la Loire.",
  },

  {
    id: "caisse-retraite",
    name: "Votre caisse de retraite",
    type: "caisse-retraite",
    departments: ["72", "49", "53"],

    website:
      "https://www.info-retraite.fr/",

    description:
      "Selon votre régime de retraite, votre caisse peut proposer des aides à domicile ou un accompagnement dans certaines situations.",
  },

  {
    id: "mutuelle",
    name: "Votre mutuelle",
    type: "mutuelle",
    departments: ["72", "49", "53"],

    description:
      "Selon votre contrat, votre mutuelle peut prévoir des prestations d'assistance ou d'aide à domicile.",
  },

  {
    id: "assurance-habitation",
    name: "Votre assurance habitation",
    type: "assurance",
    departments: ["72", "49", "53"],

    description:
      "Selon votre contrat et l'événement rencontré, certaines garanties d'assistance peuvent être prévues.",
  },

  {
    id: "mairie-ccas",
    name: "Votre mairie, CCAS ou CIAS",
    type: "ccas",
    departments: ["72", "49", "53"],

    website:
      "https://lannuaire.service-public.fr/",

    description:
      "La mairie, le CCAS ou le CIAS peut informer et orienter vers les services et aides disponibles localement.",
  },

  {
    id: "services-domicile",
    name: "Un service d'aide ou de services à domicile",
    type: "autre",
    departments: ["72", "49", "53"],

    website:
      "https://www.pour-les-personnes-agees.gouv.fr/annuaire-service-aide-accompagnement-domicile",

    description:
      "Les services à domicile peuvent proposer différentes prestations comme l'entretien du logement, les courses, la préparation des repas ou certains accompagnements.",
  },
];