export type SupportProviderCategory =
  | "mutuelle"
  | "assurance";

export type SupportProviderKind =
  | "mutuelle"
  | "assureur"
  | "banque"
  | "groupe-protection-sociale"
  | "courtier-gestionnaire";

export interface SupportProviderContact {
  label: string;
  phone: string;
  detail?: string;
}

export interface SupportProvider {
  id: string;

  name: string;

  aliases: string[];

  category:
    SupportProviderCategory;

  kind:
    SupportProviderKind;

  contacts:
    SupportProviderContact[];

  website: string;

  sourceUrl?: string;

  note?: string;

  popular?: boolean;

  checkedAt: string;
}

const checkedAt =
  "2026-08-29";

/**
 * ============================================================
 * MUTUELLES / COMPLÉMENTAIRES SANTÉ
 * ============================================================
 */

const mutuelles: SupportProvider[] = [
  {
    id: "harmonie-mutuelle",

    name:
      "Harmonie Mutuelle",

    aliases: [
      "Harmonie",
      "Groupe VYV",
      "VYV",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service client particuliers",

        phone:
          "09 80 98 08 80",
      },
    ],

    website:
      "https://www.harmonie-mutuelle.fr/",

    note:
      "Pour une aide à domicile ou une assistance après hospitalisation, vérifiez aussi le numéro d'assistance indiqué sur votre carte ou votre contrat : les prestations dépendent de la garantie souscrite.",

    popular: true,

    checkedAt,
  },

  {
    id: "aesio",

    name:
      "AÉSIO Mutuelle",

    aliases: [
      "Aesio",
      "Adrea",
      "Apréva",
      "Eovi Mcd",
      "Eovi",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service adhérents",

        phone:
          "3111",

        detail:
          "Depuis la France",
      },
    ],

    website:
      "https://www.aesio.fr/",

    sourceUrl:
      "https://www.aesio.fr/faq/contents/mon-espace-adherent/inscription/comment-creer-mon-espace-adherent",

    note:
      "AÉSIO conseille également d'utiliser le numéro figurant sur votre carte de mutuelle lorsqu'un contact spécifique est prévu par votre contrat.",

    popular: true,

    checkedAt,
  },

  {
    id: "mgen",

    name:
      "MGEN",

    aliases: [
      "Mutuelle Générale de l'Éducation Nationale",
      "Mutuelle Générale de l Education Nationale",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Contact MGEN",

        phone:
          "09 72 72 40 60",
      },
    ],

    website:
      "https://www.mgen.fr/contact/",

    sourceUrl:
      "https://www.mgen.fr/contact/",

    popular: true,

    checkedAt,
  },

  {
    id: "ag2r",

    name:
      "AG2R La Mondiale",

    aliases: [
      "AG2R",
      "La Mondiale",
      "AG2R La Mondiale",
    ],

    category:
      "mutuelle",

    kind:
      "groupe-protection-sociale",

    contacts: [
      {
        label:
          "Santé / prévoyance",

        phone:
          "09 70 80 82 45",
      },
    ],

    website:
      "https://www.ag2rlamondiale.fr/",

    sourceUrl:
      "https://www.ag2rlamondiale.fr/faq/question?id=835",

    popular: true,

    checkedAt,
  },

  {
    id: "apivia",

    name:
      "Apivia Macif Mutuelle",

    aliases: [
      "Apivia",
      "Apivia Mutuelle",
      "Macif Mutuelle",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service client",

        phone:
          "09 70 82 08 88",
      },

      {
        label:
          "Assistance urgences",

        phone:
          "09 70 82 06 92",

        detail:
          "Accident / hospitalisation selon garanties",
      },
    ],

    website:
      "https://www.apivia.fr/",

    note:
      "Les prestations d'assistance dépendent du contrat souscrit.",

    checkedAt,
  },

  {
    id: "malakoff-humanis",

    name:
      "Malakoff Humanis",

    aliases: [
      "Malakoff",
      "Humanis",
      "Malakoff Médéric",
      "Malakoff Mederic",
    ],

    category:
      "mutuelle",

    kind:
      "groupe-protection-sociale",

    contacts: [],

    website:
      "https://www.malakoffhumanis.com/particuliers/",

    sourceUrl:
      "https://www.malakoffhumanis.com/particuliers/",

    note:
      "Malakoff Humanis utilise différents numéros selon le contrat santé et l'assistance souscrite. Le numéro correspondant est indiqué sur votre carte de tiers payant, votre contrat ou votre espace client.",

    popular: true,

    checkedAt,
  },

  {
    id: "mutuelle-generale",

    name:
      "La Mutuelle Générale",

    aliases: [
      "Mutuelle Générale",
      "La Mutuelle Generale",
      "LMG",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service adhérents - certains contrats",

        phone:
          "09 69 39 39 39",
      },
    ],

    website:
      "https://www.lamutuellegenerale.fr/",

    sourceUrl:
      "https://www.lamutuellegenerale.fr/faq",

    note:
      "La Mutuelle Générale précise que certains contrats disposent d'un numéro dédié. Regardez en priorité votre carte de tiers payant.",

    checkedAt,
  },

  {
    id: "mgc",

    name:
      "Mutuelle MGC",

    aliases: [
      "MGC",
      "Mutuelle Générale des Cheminots",
      "Mutuelle Generale des Cheminots",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service adhérents",

        phone:
          "01 40 78 06 91",
      },

      {
        label:
          "Assistance à domicile 24h/24",

        phone:
          "01 41 77 45 77",
      },
    ],

    website:
      "https://www.mutuellemgc.fr/",

    sourceUrl:
      "https://www.mutuellemgc.fr/contact/",

    note:
      "La MGC publie directement un numéro spécifique pour l'assistance à domicile.",

    checkedAt,
  },

  {
    id: "mnt",

    name:
      "MNT",

    aliases: [
      "Mutuelle Nationale Territoriale",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service adhérents",

        phone:
          "09 72 72 02 02",
      },
    ],

    website:
      "https://www.mnt.fr/",

    sourceUrl:
      "https://www.mnt.fr/contact/agents",

    checkedAt,
  },

  {
    id: "mnh",

    name:
      "MNH",

    aliases: [
      "Mutuelle Nationale des Hospitaliers",
      "Mutuelle Nationale des Hospitaliers et des professionnels de la santé et du social",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Standard MNH",

        phone:
          "02 38 90 70 00",
      },
    ],

    website:
      "https://www.mnh.fr/",

    note:
      "Pour une prestation d'assistance liée à votre contrat, vérifiez également les coordonnées figurant sur votre carte ou votre espace adhérent.",

    checkedAt,
  },

  {
    id: "interiale",

    name:
      "INTÉRIALE",

    aliases: [
      "Interiale",
      "Intériale Mutuelle",
      "Interiale Mutuelle",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Conseillers mutualistes",

        phone:
          "0 970 821 821",
      },
    ],

    website:
      "https://www.interiale.fr/",

    sourceUrl:
      "https://masantedagent.interiale.fr/",

    note:
      "INTÉRIALE propose notamment des prestations d'assistance à domicile selon les garanties souscrites.",

    checkedAt,
  },

  {
    id: "uneo",

    name:
      "Unéo",

    aliases: [
      "Uneo",
      "Mutuelle Unéo",
      "Mutuelle Uneo",
      "Groupe Unéo",
      "Groupe Uneo",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service client Unéo",

        phone:
          "0 970 809 709",
      },
    ],

    website:
      "https://www.groupe-uneo.fr/",

    sourceUrl:
      "https://www.groupe-uneo.fr/nous-contacter",

    checkedAt,
  },

  {
    id: "smatis",

    name:
      "SMATIS",

    aliases: [
      "Smatis",
      "Smatis France",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Particuliers",

        phone:
          "0 977 400 400",
      },
    ],

    website:
      "https://www.smatis.fr/",

    sourceUrl:
      "https://www.smatis.fr/contact/",

    checkedAt,
  },

  {
    id: "solimut",

    name:
      "Solimut Mutuelle de France",

    aliases: [
      "Solimut",
      "Solimut Mutuelle",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [],

    website:
      "https://www.solimut-mutuelle.fr/",

    sourceUrl:
      "https://www.solimut-mutuelle.fr/nous-contacter/",

    note:
      "Pour les adhérents, Solimut demande de privilégier le numéro indiqué sur la carte mutualiste ou l'espace adhérent.",

    checkedAt,
  },

  {
    id: "identites-mutuelle",

    name:
      "Identités Mutuelle",

    aliases: [
      "Identites Mutuelle",
      "Identités",
      "Identites",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Service adhérents",

        phone:
          "01 43 18 34 00",
      },
    ],

    website:
      "https://www.identites-mutuelle.com/",

    sourceUrl:
      "https://www.identites-mutuelle.com/informations-pratiques/contact/",

    checkedAt,
  },

  {
    id: "mutuelle-bleue",

    name:
      "Mutuelle Bleue / VIASANTÉ",

    aliases: [
      "Mutuelle Bleue",
      "Viasanté",
      "Viasante",
      "VIASANTÉ Mutuelle",
      "VIASANTE Mutuelle",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Services de gestion",

        phone:
          "01 64 71 40 00",
      },
    ],

    website:
      "https://www.mutuellebleue.fr/",

    sourceUrl:
      "https://www.mutuellebleue.fr/contact/",

    checkedAt,
  },

  {
    id: "matmut-ociane",

    name:
      "Ociane Matmut",

    aliases: [
      "Ociane",
      "Matmut Santé",
      "Matmut Sante",
      "Mutuelle Matmut",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Conseiller Matmut",

        phone:
          "02 35 03 68 68",
      },
    ],

    website:
      "https://www.matmut.fr/mutuelle/mutuelle-sante",

    sourceUrl:
      "https://www.matmut.fr/devis-mutuelle/sante/mutuelle-ociane",

    popular: true,

    checkedAt,
  },

  {
    id: "swisslife-sante",

    name:
      "Swiss Life",

    aliases: [
      "SwissLife",
      "Swisslife",
      "Swiss Life Santé",
      "Swiss Life Sante",
    ],

    category:
      "mutuelle",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Service client",

        phone:
          "09 74 75 76 76",
      },

      {
        label:
          "Garanties assistance",

        phone:
          "09 77 40 18 00",

        detail:
          "Selon contrat",
      },
    ],

    website:
      "https://www.swisslife.fr/",

    note:
      "Le numéro d'assistance applicable à votre garantie figure également sur votre carte ou vos documents contractuels.",

    checkedAt,
  },

  {
    id: "klesia",

    name:
      "KLESIA",

    aliases: [
      "Klesia",
      "KLESIA Santé",
      "Klesia Santé",
      "Klesia Sante",
    ],

    category:
      "mutuelle",

    kind:
      "groupe-protection-sociale",

    contacts: [],

    website:
      "https://www.klesia.fr/",

    sourceUrl:
      "https://www.klesia.fr/demarches-sante-votre-centre-de-gestion-point-de-contact-unique",

    note:
      "Pour les contrats santé KLESIA, le centre de gestion et son numéro dépendent souvent du contrat ou du secteur professionnel. Regardez votre carte de tiers payant.",

    checkedAt,
  },

  {
    id: "mgp",

    name:
      "MGP",

    aliases: [
      "Mutuelle MGP",
      "Mutuelle Générale de la Police",
      "Mutuelle Generale de la Police",
    ],

    category:
      "mutuelle",

    kind:
      "mutuelle",

    contacts: [
      {
        label:
          "Contrats individuels santé / prévoyance",

        phone:
          "09 71 10 11 12",
      },

      {
        label:
          "Contrat collectif santé - ministère de l'Intérieur",

        phone:
          "09 69 36 00 00",
      },
    ],

    website:
      "https://www.mgp.fr/",

    sourceUrl:
      "https://www.mgp.fr/home/reclamation-et-mediation.html",

    checkedAt,
  },

  {
    id: "mercer",

    name:
      "Mercer Ma Santé",

    aliases: [
      "Mercer",
      "Mercer Santé",
      "Mercer Sante",
      "Mercer Ma Sante",
    ],

    category:
      "mutuelle",

    kind:
      "courtier-gestionnaire",

    contacts: [
      {
        label:
          "Standard Mercer Ma Santé",

        phone:
          "09 69 32 31 05",
      },
    ],

    website:
      "https://www.mercer.com/fr-fr/solutions/health-and-benefits/conseil-et-courtage/espace-client-mercer-ma-sante/",

    sourceUrl:
      "https://www.mercer.com/fr-fr/solutions/health-and-benefits/conseil-et-courtage/espace-client-mercer-ma-sante/",

    note:
      "Le numéro exact de votre centre de gestion peut être indiqué au verso de votre carte de tiers payant.",

    checkedAt,
  },
];

/**
 * ============================================================
 * ASSURANCES HABITATION + BANQUES-ASSUREURS
 * ============================================================
 */

const assurances: SupportProvider[] = [
  {
    id: "maif",

    name:
      "MAIF",

    aliases: [
      "MAIF Assurance",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance habitation 24h/24",

        phone:
          "0 800 875 875",
      },

      {
        label:
          "Déclarer un sinistre",

        phone:
          "09 72 72 15 15",
      },
    ],

    website:
      "https://www.maif.fr/aide-demarches/assistance/habitation",

    sourceUrl:
      "https://www.maif.fr/aide-demarches/assistance/habitation",

    popular: true,

    checkedAt,
  },

  {
    id: "maaf",

    name:
      "MAAF",

    aliases: [
      "MAAF Assurances",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "MAAF Assistance 24h/24",

        phone:
          "0 800 16 17 18",
      },

      {
        label:
          "Service client / sinistre",

        phone:
          "3015",
      },
    ],

    website:
      "https://www.maaf.fr/",

    sourceUrl:
      "https://www.maaf.fr/fr/assurance-habitation/assistance-habitation",

    popular: true,

    checkedAt,
  },

  {
    id: "macif",

    name:
      "Macif",

    aliases: [
      "MACIF",
      "Macif Assurance",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance 24h/24",

        phone:
          "0 800 774 774",
      },

      {
        label:
          "Déclarer un sinistre habitation",

        phone:
          "09 69 39 49 49",
      },
    ],

    website:
      "https://www.macif.fr/assurance/particuliers/numero-urgence",

    sourceUrl:
      "https://www.macif.fr/assurance/particuliers/numero-urgence",

    popular: true,

    checkedAt,
  },

  {
    id: "gmf",

    name:
      "GMF",

    aliases: [
      "GMF Assurances",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance habitation 24h/24",

        phone:
          "01 47 11 25 22",
      },

      {
        label:
          "Déclarer un sinistre",

        phone:
          "0 970 809 809",
      },
    ],

    website:
      "https://www.gmf.fr/sinistre/information-sinistre/sinistre-habitation",

    sourceUrl:
      "https://www.gmf.fr/sinistre/information-sinistre/sinistre-habitation",

    popular: true,

    checkedAt,
  },

  {
    id: "matmut-assurance",

    name:
      "Matmut",

    aliases: [
      "Matmut Assurances",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance",

        phone:
          "0 800 30 20 30",
      },

      {
        label:
          "Conseiller / sinistre habitation",

        phone:
          "02 35 03 68 68",
      },
    ],

    website:
      "https://www.matmut.fr/assurance/habitation",

    sourceUrl:
      "https://www.matmut.fr/services-en-ligne/nous-contacter",

    popular: true,

    checkedAt,
  },

  {
    id: "groupama",

    name:
      "Groupama",

    aliases: [
      "Groupama Assurance",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance 24h/24",

        phone:
          "01 45 16 66 66",
      },
    ],

    website:
      "https://www.groupama.fr/contact/",

    sourceUrl:
      "https://www.groupama.fr/contact/",

    popular: true,

    checkedAt,
  },

  {
    id: "axa",

    name:
      "AXA",

    aliases: [
      "AXA France",
      "Axa Assurance",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Urgence habitation 24h/24",

        phone:
          "01 55 92 26 92",

        detail:
          "Fuite d'eau, porte bloquée, cambriolage...",
      },
    ],

    website:
      "https://www.axa.fr/services-assistance.html",

    sourceUrl:
      "https://www.axa.fr/services-assistance.html",

    popular: true,

    checkedAt,
  },

  {
    id: "allianz",

    name:
      "Allianz",

    aliases: [
      "Allianz France",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Sinistre habitation",

        phone:
          "0 978 978 000",
      },
    ],

    website:
      "https://www.allianz.fr/assurance-particulier/assistance/sinistre-habitation.html",

    sourceUrl:
      "https://www.allianz.fr/assurance-particulier/assistance/sinistre-habitation.html",

    popular: true,

    checkedAt,
  },

  {
    id: "mma",

    name:
      "MMA",

    aliases: [
      "MMA Assurances",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance 24h/24",

        phone:
          "01 40 25 59 59",
      },

      {
        label:
          "Déclarer un sinistre habitation",

        phone:
          "09 809 809 11",
      },
    ],

    website:
      "https://www.mma.fr/assurance-habitation/mma-assistance.html",

    sourceUrl:
      "https://www.mma.fr/assurance-habitation/mma-assistance.html",

    checkedAt,
  },

  {
    id: "generali",

    name:
      "Generali",

    aliases: [
      "Generali France",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [
      {
        label:
          "Assistance",

        phone:
          "01 41 85 81 19",
      },
    ],

    website:
      "https://www.generali.fr/points-contact/",

    sourceUrl:
      "https://www.generali.fr/points-contact/",

    checkedAt,
  },

  /**
   * ============================================================
   * BANQUES-ASSUREURS
   * ============================================================
   */

  {
    id: "credit-agricole",

    name:
      "Crédit Agricole",

    aliases: [
      "Credit Agricole",
      "CA",
      "Pacifica",
      "Crédit Agricole Assurances",
      "Credit Agricole Assurances",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Pacifica - habitation et assistance 24h/24",

        phone:
          "0 800 810 812",
      },
    ],

    website:
      "https://www.credit-agricole.fr/particulier/assurances/sinistres.html",

    sourceUrl:
      "https://www.credit-agricole.fr/particulier/assurances/sinistres.html",

    note:
      "Les assurances habitation du Crédit Agricole sont notamment proposées par Pacifica.",

    popular: true,

    checkedAt,
  },

  {
    id: "lcl",

    name:
      "LCL",

    aliases: [
      "Le Crédit Lyonnais",
      "Le Credit Lyonnais",
      "Pacifica",
      "LCL Assurances",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [],

    website:
      "https://www.lcl.fr/",

    note:
      "LCL distribue notamment des assurances Pacifica. Le numéro adapté à votre contrat est indiqué dans votre espace LCL ou sur vos documents d'assurance.",

    checkedAt,
  },

  {
    id: "credit-mutuel",

    name:
      "Crédit Mutuel",

    aliases: [
      "Credit Mutuel",
      "ACM",
      "Assurances du Crédit Mutuel",
      "Assurances du Credit Mutuel",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Déclarer un sinistre habitation",

        phone:
          "03 88 14 00 22",
      },

      {
        label:
          "Dépannage habitation",

        phone:
          "01 40 25 58 73",
      },
    ],

    website:
      "https://www.creditmutuel.fr/fr/particuliers/centre-aide/en-cas-d-urgence.html",

    sourceUrl:
      "https://www.creditmutuel.fr/fr/particuliers/centre-aide/en-cas-d-urgence.html",

    popular: true,

    checkedAt,
  },

  {
    id: "cic",

    name:
      "CIC",

    aliases: [
      "Crédit Industriel et Commercial",
      "Credit Industriel et Commercial",
      "ACM",
      "Assurances du Crédit Mutuel",
      "Assurances du Credit Mutuel",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Déclarer un sinistre habitation",

        phone:
          "03 88 14 00 22",
      },

      {
        label:
          "Dépannage habitation",

        phone:
          "01 40 25 58 73",
      },
    ],

    website:
      "https://www.cic.fr/fr/particuliers/centre-aide/en-cas-d-urgence.html",

    sourceUrl:
      "https://www.cic.fr/fr/particuliers/centre-aide/en-cas-d-urgence.html",

    checkedAt,
  },

  {
    id: "bnp-paribas",

    name:
      "BNP Paribas",

    aliases: [
      "BNP",
      "Cardif",
      "Cardif IARD",
      "BNP Paribas Assurance",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "BNP Paribas Assistance 24h/24",

        phone:
          "0 800 30 33 33",
      },

      {
        label:
          "Déclarer un sinistre habitation",

        phone:
          "02 27 08 92 92",
      },
    ],

    website:
      "https://mabanque.bnpparibas/fr/assurer/declarer-sinistre/assurance-habitation-declarer-sinistre",

    sourceUrl:
      "https://mabanque.bnpparibas/fr/assurer/declarer-sinistre/assurance-habitation-declarer-sinistre",

    note:
      "L'assureur du contrat habitation BNP Paribas est notamment Cardif IARD.",

    popular: true,

    checkedAt,
  },

  {
    id: "sg",

    name:
      "SG - Société Générale",

    aliases: [
      "SG",
      "Société Générale",
      "Societe Generale",
      "Sogessur",
      "Société Générale Assurances",
      "Societe Generale Assurances",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Allô Sinistres habitation",

        phone:
          "09 69 32 73 26",
      },
    ],

    website:
      "https://particuliers.sg.fr/sinistres",

    sourceUrl:
      "https://particuliers.sg.fr/sinistres",

    popular: true,

    checkedAt,
  },

  {
    id: "banque-populaire",

    name:
      "Banque Populaire",

    aliases: [
      "BP",
      "BPCE",
      "BPCE Assurances",
      "Banque Pop",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Sinistre habitation - contrat numérique",

        phone:
          "09 69 39 25 52",
      },

      {
        label:
          "Sinistre - certains anciens contrats alphanumériques",

        phone:
          "09 80 98 69 86",
      },
    ],

    website:
      "https://www.banquepopulaire.fr/assurer/assurance-habitation/",

    sourceUrl:
      "https://www.banquepopulaire.fr/faq-particuliers/assurance/prevoyance/comment-contacter-mon-assureur-bpce-vie/",

    checkedAt,
  },

  {
    id: "caisse-epargne",

    name:
      "Caisse d'Épargne",

    aliases: [
      "Caisse d Epargne",
      "Caisse Epargne",
      "Écureuil",
      "Ecureuil",
      "BPCE",
      "BPCE Assurances",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Assurance habitation / sinistre",

        phone:
          "09 69 36 45 45",
      },
    ],

    website:
      "https://www.caisse-epargne.fr/assurer/assurance-habitation/",

    sourceUrl:
      "https://www.caisse-epargne.fr/faq-particuliers/assurance/gestion/comment-puis-je-vous-contacter/",

    popular: true,

    checkedAt,
  },

  {
    id: "banque-postale",

    name:
      "La Banque Postale",

    aliases: [
      "Banque Postale",
      "LBP",
      "CNP Assurances",
      "CNP Assurances IARD",
    ],

    category:
      "assurance",

    kind:
      "banque",

    contacts: [
      {
        label:
          "Assistance habitation 24h/24",

        phone:
          "09 77 40 85 52",
      },
    ],

    website:
      "https://www.labanquepostale.fr/",

    sourceUrl:
      "https://www.labanquepostale.fr/particulier/faq-centre-aide/assurances/assurance-habitation.question.html/comment-contacter-l-assistance-de-mon-assurance-habitation.html",

    popular: true,

    checkedAt,
  },

  /**
   * Présents dans l'annuaire même lorsque
   * nous préférons ne pas afficher de numéro
   * national faute de contact suffisamment
   * universel et vérifié.
   */

  {
    id: "direct-assurance",

    name:
      "Direct Assurance",

    aliases: [
      "DirectAssurance",
      "Avanssur",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [],

    website:
      "https://www.direct-assurance.fr/",

    note:
      "Utilisez votre espace client ou les coordonnées figurant sur votre contrat afin d'obtenir le contact correspondant précisément à votre garantie habitation.",

    checkedAt,
  },

  {
    id: "abeille-assurances",

    name:
      "Abeille Assurances",

    aliases: [
      "Abeille",
      "Aviva",
      "Aviva France",
    ],

    category:
      "assurance",

    kind:
      "assureur",

    contacts: [],

    website:
      "https://www.abeille-assurances.fr/",

    note:
      "Abeille Assurances utilise différents contacts selon le contrat. Le numéro applicable figure sur vos conditions particulières ou votre espace client.",

    checkedAt,
  },
];

export const supportProviders:
  SupportProvider[] = [
    ...mutuelles,
    ...assurances,
  ];

/**
 * Normalisation utilisée par la recherche.
 *
 * Elle permet notamment de retrouver :
 *
 * "Crédit Agricole" avec "credit"
 * "AÉSIO" avec "aesio"
 * "Société Générale" avec "societe"
 */
export function normalizeProviderText(
  value: string
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLocaleLowerCase(
      "fr"
    )
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[’'`]/g, " ")
    .replace(
      /[^a-z0-9]+/g,
      " "
    )
    .trim()
    .replace(/\s+/g, " ");
}

export function providerMatchesSearch(
  provider: SupportProvider,
  search: string
): boolean {
  const normalizedSearch =
    normalizeProviderText(
      search
    );

  if (!normalizedSearch) {
    return true;
  }

  const searchableValues = [
    provider.name,
    ...provider.aliases,
  ];

  return searchableValues.some(
    (value) =>
      normalizeProviderText(
        value
      ).includes(
        normalizedSearch
      )
  );
}

export function getSupportProviders(
  category:
    SupportProviderCategory
): SupportProvider[] {
  return supportProviders
    .filter(
      (provider) =>
        provider.category ===
        category
    )
    .sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );
}