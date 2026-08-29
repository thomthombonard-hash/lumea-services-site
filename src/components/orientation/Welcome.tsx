import PrivacyNotice from "./PrivacyNotice";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({
  onStart,
}: WelcomeProps) {
  return (
    <section className="relative">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        <div className="flex flex-col justify-center py-4 lg:py-8">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--lumea-border)] bg-white/70 px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--lumea-navy)]">
              Bienvenue chez Luméa Services
            </span>
          </div>

          <h1 className="mt-7 max-w-[740px] text-[3rem] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--lumea-navy)] sm:text-[4rem] lg:text-[4.6rem]">
            Qui peut
            <br />
            <span className="text-[var(--lumea-gold)]">
              m’aider ?
            </span>
          </h1>

          <p className="mt-7 max-w-[690px] text-lg leading-8 text-[var(--lumea-blue-grey)] sm:text-[1.28rem]">
            Vous avez besoin d’aide à domicile,
            de ménage, d’accompagnement ou
            simplement d’être orienté ?
          </p>

          <p className="mt-2 max-w-[690px] text-lg leading-8 text-[var(--lumea-blue-grey)]">
            En quelques questions, nous vous aidons
            à identifier les bons interlocuteurs
            selon votre situation et votre secteur.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onStart}
              className="lumea-button-primary flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-lg font-semibold sm:min-w-[250px]"
            >
              Commencer ma recherche
            </button>

            <div className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
              Gratuit · Sans inscription
            </div>
          </div>
        </div>

        <div className="relative min-h-[480px]">
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-8 hidden h-[82%] w-[86%] rounded-[40px] border border-[var(--lumea-border)] lg:block"
          />

          <div className="lumea-dark-panel relative h-full min-h-[480px] overflow-hidden rounded-[38px] p-7 sm:p-9 lg:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="absolute -right-9 -top-9 h-40 w-40 rounded-full border border-white/10"
            />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--lumea-gold)]">
                Notre approche
              </p>

              <h2 className="mt-5 max-w-sm text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                Trouver la bonne aide,
                sans complexité.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/75">
                Pas besoin de connaître les sigles,
                les organismes ou les démarches
                avant de commencer.
              </p>

              <div className="mt-8 space-y-3">
                <StepLine title="Quelques questions simples" />
                <StepLine title="Une orientation selon votre commune" />
                <StepLine title="Des contacts concrets pour agir" />
              </div>

              <div className="mt-8">
                <PrivacyNotice />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepLine({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex min-h-[68px] items-center gap-4 rounded-[18px] border border-white/12 bg-white/[0.06] px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold)] text-sm font-black text-[var(--lumea-navy)]">
        ✓
      </div>

      <p className="font-semibold leading-6 text-white">
        {title}
      </p>
    </div>
  );
}