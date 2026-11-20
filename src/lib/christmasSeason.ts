/** Noël 2026 : dates explicites en heure de Paris (UTC+1 en hiver).
 * La fin est exclusive pour inclure toute la minute du 25 décembre à 23 h 59.
 * Cette période est indépendante de celle du concours.
 */
export const CHRISTMAS_SEASON = {
  startsAt: "2026-11-20T00:00:00+01:00",
  endsAt: "2026-12-26T00:00:00+01:00",
} as const;

export function isChristmasSeason(now: number | Date = Date.now()) {
  const time = typeof now === "number" ? now : now.getTime();
  return time >= Date.parse(CHRISTMAS_SEASON.startsAt)
    && time < Date.parse(CHRISTMAS_SEASON.endsAt);
}

// Exécuté avant le premier affichage, y compris sur des pages précompilées en cache.
// Ne dépend ni de la date du build ni d'un nouveau déploiement après Noël.
export const christmasSeasonBootstrap = `(()=>{const t=Date.now();if(t>=${Date.parse(CHRISTMAS_SEASON.startsAt)}&&t<${Date.parse(CHRISTMAS_SEASON.endsAt)})document.documentElement.setAttribute('data-christmas','2026');else document.documentElement.removeAttribute('data-christmas');})();`;
