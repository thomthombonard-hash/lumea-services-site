import type {
  Organization,
} from "@/lib/orientation/types";

import {
  sartheOrganizations,
} from "./sarthe";

import {
  sartheAutonomieLocalOrganizations,
} from "./sarthe-autonomie-local";

import {
  maineEtLoireOrganizations,
} from "./maine-et-loire";

import {
  mayenneOrganizations,
} from "./mayenne";

import {
  mayenneLocalOrganizations,
} from "./mayenne-local.generated";

import {
  commonOrganizations,
} from "./common";

import {
  clic49Organizations,
} from "./clic-maine-et-loire";

export const organizations: Organization[] = [
  ...sartheOrganizations,

  ...sartheAutonomieLocalOrganizations,

  ...maineEtLoireOrganizations,

  ...mayenneOrganizations,

  ...mayenneLocalOrganizations,

  ...commonOrganizations,

  ...clic49Organizations,
];

export function getOrganizationById(
  id: string
): Organization | undefined {
  return organizations.find(
    (organization) =>
      organization.id === id
  );
}