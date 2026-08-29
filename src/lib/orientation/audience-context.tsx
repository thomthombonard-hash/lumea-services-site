"use client";

import {
  createContext,
  useContext,
} from "react";

import type {
  ReactNode,
} from "react";

export type OrientationAudience =
  | "self"
  | "relative";

interface OrientationAudienceProviderProps {
  audience:
    OrientationAudience;

  children:
    ReactNode;
}

const OrientationAudienceContext =
  createContext<OrientationAudience>(
    "self"
  );

export function OrientationAudienceProvider({
  audience,
  children,
}: OrientationAudienceProviderProps) {
  return (
    <OrientationAudienceContext.Provider
      value={
        audience
      }
    >
      {children}
    </OrientationAudienceContext.Provider>
  );
}

export function useOrientationAudience() {
  return useContext(
    OrientationAudienceContext
  );
}