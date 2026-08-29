export interface GlossaryEntry {
  id: string;
  term: string;
  fullName: string;
  definition: string;
  aliases?: string[];
}

/**
 * Petit dictionnaire destiné aux personnes qui ne connaissent
 * pas le vocabulaire administratif.
 *
 * Les définitions sont volontairement courtes : le but est
 * d'expliquer le mot, pas de remplacer l'organisme concerné
 * ni de promettre un droit à une aide.
 */
export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "apa",
    term: "APA",
    fullName: "Allocation personnalisée d’autonomie",
    definition:
      "Une aide du département destinée aux personnes de 60 ans ou plus qui rencontrent une perte d’autonomie. Après évaluation, elle peut participer au financement d’un plan d’aide selon la situation.",
  },
  {
    id: "pch",
    term: "PCH",
    fullName: "Prestation de compensation du handicap",
    definition:
      "Une aide liée au handicap qui peut contribuer à financer certains besoins de compensation, selon les conditions et l’évaluation de la situation.",
  },
  {
    id: "clic",
    term: "CLIC",
    fullName: "Centre local d’information et de coordination",
    definition:
      "Un interlocuteur local qui informe et oriente les personnes âgées et leurs proches vers les aides et services adaptés à leur situation.",
  },
  {
    id: "mdph",
    term: "MDPH",
    fullName: "Maison départementale des personnes handicapées",
    definition:
      "Le guichet départemental pour les démarches, droits et demandes d’accompagnement liés au handicap.",
  },
  {
    id: "ccas",
    term: "CCAS",
    fullName: "Centre communal d’action sociale",
    definition:
      "Un service social de la commune qui peut informer, orienter et accompagner les habitants dans certaines démarches sociales et aides locales.",
  },
  {
    id: "cias",
    term: "CIAS",
    fullName: "Centre intercommunal d’action sociale",
    definition:
      "L’équivalent d’un CCAS à l’échelle de plusieurs communes. Il peut informer, orienter et proposer certains services ou accompagnements locaux.",
  },
  {
    id: "carsat",
    term: "Carsat",
    fullName: "Caisse d’assurance retraite et de la santé au travail",
    definition:
      "Un organisme de retraite du régime général. Selon la situation, il peut aussi informer sur certaines actions de prévention ou aides liées au maintien à domicile.",
    aliases: ["CARSAT"],
  },
  {
    id: "cpam",
    term: "CPAM",
    fullName: "Caisse primaire d’assurance maladie",
    definition:
      "L’organisme local de l’Assurance Maladie qui gère notamment les remboursements de soins et différentes démarches liées à la couverture maladie.",
  },
];

function normalizeGlossaryTerm(
  value: string
): string {
  return value
    .trim()
    .toLocaleUpperCase("fr");
}

export function findGlossaryEntry(
  value: string
): GlossaryEntry | undefined {
  const normalized =
    normalizeGlossaryTerm(
      value
    );

  return glossaryEntries.find(
    (entry) => {
      const names = [
        entry.term,
        ...(entry.aliases ?? []),
      ];

      return names.some(
        (name) =>
          normalizeGlossaryTerm(
            name
          ) === normalized
      );
    }
  );
}

export const glossarySearchTerms =
  Array.from(
    new Set(
      glossaryEntries.flatMap(
        (entry) => [
          entry.term,
          ...(entry.aliases ?? []),
        ]
      )
    )
  ).sort(
    (a, b) =>
      b.length - a.length
  );
