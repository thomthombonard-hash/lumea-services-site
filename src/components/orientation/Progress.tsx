interface ProgressProps {
  step: number;
  onBack: () => void;
  onRestart: () => void;
}

export default function Progress({
  step,
  onBack,
  onRestart,
}: ProgressProps) {
  return (
    <nav
      aria-label="Navigation du questionnaire"
      className="rounded-[20px] border border-[var(--lumea-border)] bg-white/75 px-4 py-3 shadow-[0_8px_24px_rgba(13,35,68,0.04)] backdrop-blur sm:px-5"
    >
      <div className="flex items-center justify-between gap-4">
        {/*
         * RETOUR
         */}
        <button
          type="button"
          onClick={onBack}
          className="group flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3 py-2 font-semibold text-[var(--lumea-navy)] transition hover:bg-[var(--lumea-cream-2)] focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:px-4"
        >
          <span
            aria-hidden="true"
            className="transition group-hover:-translate-x-1"
          >
            ←
          </span>

          <span>
            Retour
          </span>
        </button>

        {/*
         * ÉTAPE ACTUELLE
         */}
        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <div
            aria-hidden="true"
            className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[var(--lumea-navy)] px-2 text-xs font-bold text-white"
          >
            {String(step).padStart(
              2,
              "0"
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--lumea-navy)]">
              Votre parcours
            </p>

            <p className="text-xs text-[var(--lumea-blue-grey)]">
              Quelques questions suffisent
            </p>
          </div>
        </div>

        {/*
         * VERSION MOBILE DE L'ÉTAPE
         */}
        <div className="flex items-center sm:hidden">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--lumea-blue-grey)]">
            Étape{" "}
            {String(step).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        {/*
         * RECOMMENCER
         */}
        <button
          type="button"
          onClick={onRestart}
          className="min-h-10 shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-[var(--lumea-blue-grey)] transition hover:bg-[var(--lumea-cream-2)] hover:text-[var(--lumea-navy)] focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:px-4"
        >
          <span className="sm:hidden">
            Recommencer
          </span>

          <span className="hidden sm:inline">
            Recommencer depuis le début
          </span>
        </button>
      </div>
    </nav>
  );
}