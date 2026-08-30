import type {
  DepartmentCode,
} from "@/lib/orientation/types";

interface CaregiverSupportProps {
  department?: DepartmentCode;
  communeName?: string;
}

const respiteDirectories: Partial<
  Record<
    DepartmentCode,
    string
  >
> = {
  "72":
    "https://www.pour-les-personnes-agees.gouv.fr/annuaire-points-dinformation-et-plateformes-de-repit/sarthe-72",

  "49":
    "https://www.pour-les-personnes-agees.gouv.fr/annuaire-points-dinformation-et-plateformes-de-repit/maine-et-loire-49",

  "53":
    "https://www.pour-les-personnes-agees.gouv.fr/annuaire-points-dinformation-et-plateformes-de-repit/mayenne-53",
};

const generalRespiteUrl =
  "https://www.monparcourshandicap.gouv.fr/aidant/les-solutions-de-repit-pour-les-aidants";

export default function CaregiverSupport({
  department,
  communeName,
}: CaregiverSupportProps) {
  const directoryUrl =
    department
      ? respiteDirectories[
          department
        ]
      : undefined;

  return (
    <section className="mt-9 overflow-hidden rounded-[26px] border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)]/65 shadow-[0_12px_35px_rgba(13,35,68,0.045)]">
      <div className="p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8f6500]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]"
          />

          Pour vous aussi
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-[var(--lumea-navy)] sm:text-[1.7rem]">
          Et vous, qui vous aide ?
        </h2>

        <p className="mt-3 max-w-[760px] text-[17px] leading-7 text-[var(--lumea-blue-grey)]">
          Quand on accompagne un proche,
          on pense souvent d&apos;abord à
          lui. Pourtant, vous pouvez aussi
          avoir besoin d&apos;être écouté,
          conseillé ou simplement relayé
          quelques heures.
        </p>

        <details className="group mt-6 overflow-hidden rounded-[22px] border border-[var(--lumea-border)] bg-white">
          <summary className="cursor-pointer list-none p-5 sm:p-6">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-lg font-bold leading-7 text-[var(--lumea-navy)]">
                  J&apos;ai besoin de
                  souffler ou d&apos;être
                  relayé
                </p>

                <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
                  Voir les solutions qui
                  existent pour les proches
                  aidants.
                </p>
              </div>

              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-xl font-bold text-[var(--lumea-navy)] transition group-open:rotate-45"
              >
                +
              </div>
            </div>
          </summary>

          <div className="border-t border-[var(--lumea-border)] px-5 py-6 sm:px-6">
            <p className="text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
              Il existe différentes
              solutions pour vous permettre
              de continuer à accompagner
              votre proche sans avoir à tout
              porter seul.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SupportItem>
                Être écouté et conseillé
                dans votre rôle d&apos;aidant
              </SupportItem>

              <SupportItem>
                Organiser un relais à
                domicile
              </SupportItem>

              <SupportItem>
                Rechercher un accueil de jour
                ou un hébergement temporaire
              </SupportItem>

              <SupportItem>
                Vérifier les aides et droits
                qui peuvent financer du répit
              </SupportItem>
            </div>

            {communeName ? (
              <p className="mt-6 text-sm leading-6 text-[var(--lumea-blue-grey)]">
                Pour votre secteur autour de{" "}
                <strong className="text-[var(--lumea-navy)]">
                  {communeName}
                </strong>
                , vous pouvez notamment
                rechercher une plateforme
                d&apos;accompagnement et de
                répit.
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {directoryUrl ? (
                <a
                  href={directoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="lumea-button-primary inline-flex min-h-[50px] items-center justify-center rounded-full px-6 py-3 text-center font-bold"
                >
                  Trouver une plateforme de
                  répit
                </a>
              ) : null}

              <a
                href={generalRespiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[var(--lumea-border)] bg-white px-6 py-3 text-center font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
              >
                Comprendre les solutions de
                répit
              </a>
            </div>

            <div className="mt-6 rounded-[18px] bg-[var(--lumea-cream-2)] px-5 py-4">
              <p className="font-semibold leading-7 text-[var(--lumea-navy)]">
                Demander du répit ne signifie
                pas abandonner son proche.
              </p>

              <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
                C&apos;est aussi une manière
                de préserver votre énergie
                pour pouvoir continuer à
                l&apos;accompagner.
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

function SupportItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-[17px] border border-[var(--lumea-border)] bg-white px-4 py-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-sm font-black text-[var(--lumea-navy)]">
        ✓
      </div>

      <p className="text-sm font-semibold leading-6 text-[var(--lumea-navy)]">
        {children}
      </p>
    </div>
  );
}