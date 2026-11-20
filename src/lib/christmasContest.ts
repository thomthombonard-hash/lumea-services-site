export const CHRISTMAS_CONTEST = {
  pagePath: "/concours-noel-2026",
  pageUrl: "https://www.lumea-services.fr/concours-noel-2026",
  rulesPdf: "/documents/reglement-concours-noel-2026.pdf",
  startsAt: "2026-12-01T00:00:00+01:00",
  closesAt: "2026-12-24T12:00:00+01:00",
  drawAt: "2026-12-24T14:00:00+01:00",
  // Remplacer null par l'URL exacte de la publication officielle Facebook
  // lorsqu'elle est disponible. Ne pas utiliser une URL supposée.
  facebookUrl: null as string | null,
} as const;

export type ContestPhase = "upcoming" | "open" | "closed";

export function getContestPhase(now: number): ContestPhase {
  if (now < Date.parse(CHRISTMAS_CONTEST.startsAt)) return "upcoming";
  if (now < Date.parse(CHRISTMAS_CONTEST.closesAt)) return "open";
  return "closed";
}

export function getContestFacebookUrl(): string | null {
  if (!CHRISTMAS_CONTEST.facebookUrl) return null;
  try {
    const url = new URL(CHRISTMAS_CONTEST.facebookUrl);
    const host = url.hostname.toLowerCase();
    if (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.watch")
    ) return url.toString();
  } catch {
    // Une configuration incomplète ne doit jamais produire un faux lien.
  }
  return null;
}
