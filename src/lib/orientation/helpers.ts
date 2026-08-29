import {
  localCommunes,
  type LocalCommune,
} from "@/data/local/communes";

import type {
  DepartmentCode,
} from "./types";

/**
 * Déduit le département depuis un code postal.
 */
export function getDepartmentFromPostalCode(
  postalCode: string
): DepartmentCode | null {
  const cleanedPostalCode =
    postalCode.trim();

  if (
    !/^\d{5}$/.test(cleanedPostalCode)
  ) {
    return null;
  }

  const department =
    cleanedPostalCode.slice(0, 2);

  if (department === "72") {
    return "72";
  }

  if (department === "49") {
    return "49";
  }

  if (department === "53") {
    return "53";
  }

  return null;
}

/**
 * Nom lisible du département.
 */
export function getDepartmentName(
  department: DepartmentCode
): string {
  switch (department) {
    case "72":
      return "Sarthe";

    case "49":
      return "Maine-et-Loire";

    case "53":
      return "Mayenne";
  }
}

/**
 * Indique si le code postal appartient
 * à l'un des départements couverts.
 */
export function isSupportedPostalCode(
  postalCode: string
): boolean {
  return (
    getDepartmentFromPostalCode(
      postalCode
    ) !== null
  );
}

/**
 * Recherche les communes correspondant
 * à un code postal.
 *
 * Important :
 * cette recherche se fait uniquement dans
 * les données embarquées dans le site.
 *
 * Aucun appel réseau n'est effectué.
 */
export function getCommunesFromPostalCode(
  postalCode: string
): LocalCommune[] {
  const cleanedPostalCode =
    postalCode.trim();

  if (
    !/^\d{5}$/.test(cleanedPostalCode)
  ) {
    return [];
  }

  return localCommunes.filter(
    (commune) =>
      commune.postalCodes.includes(
        cleanedPostalCode
      )
  );
}

/**
 * Recherche une commune par son code INSEE.
 */
export function getCommuneByCode(
  communeCode: string
): LocalCommune | undefined {
  return localCommunes.find(
    (commune) =>
      commune.code === communeCode
  );
}