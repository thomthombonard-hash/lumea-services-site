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
              Un outil gratuit proposé par Luméa Services
            </span>
          </div>

          <h1 className="mt-7 max-w-[760px] text-[2.7rem] font-bold leading-[1] tracking-[-0.05em] text-[var(--lumea-navy)] sm:text-[3.7rem] lg:text-[4.25rem]">
            Vous ne savez pas
            <br />
            <span className="text-[var(--lumea-gold)]">
              vers qui vous tourner ?
            </span>
          </h1>

          <p className="mt-7 max-w-[700px] text-lg leading-8 text-[var(--lumea-blue-grey)] sm:text-[1.22rem]">
            Entre les aides, les organismes, les services sociaux
            et les différentes démarches, il n&apos;est pas toujours
            simple de savoir qui contacter, ni par où commencer.
          </p>

          <p className="mt-4 max-w-[700px] text-lg font-semibold leading-8 text-[var(--lumea-navy)]">
            « Qui peut m&apos;aider ? » vous guide simplement à partir
            de votre situation et de votre besoin.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <MiniStep
              number="1"
              title="Je décris ma situation"
              text="Pas besoin de connaître le nom d’une aide ou d’un organisme."
            />

            <MiniStep
              number="2"
              title="Je découvre qui peut m’aider"
              text="Nous sélectionnons les interlocuteurs et dispositifs utiles."
            />

            <MiniStep
              number="3"
              title="Je sais quoi faire ensuite"
              text="Contacts, démarches et prochaines étapes pour avancer."
            />
          </div>

          <div className="mt-8 rounded-[22px] border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)]/70 px-5 py-4 sm:px-6">
            <p className="text-base font-semibold leading-7 text-[var(--lumea-navy)]">
              Pas besoin de savoir quelle aide demander.
            </p>

            <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)] sm:text-base">
              C&apos;est justement à l&apos;outil de vous aider à trouver
              les bons interlocuteurs et la suite à donner.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onStart}
              className="lumea-button-primary flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-lg font-semibold sm:min-w-[270px]"
            >
              Trouver qui peut m&apos;aider
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
                Pourquoi cet outil ?
              </p>

              <h2 className="mt-5 max-w-sm text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                Partir de votre besoin,
                pas de l&apos;administration.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/75">
                Beaucoup de dispositifs existent, mais encore faut-il
                savoir qu&apos;ils existent et à qui s&apos;adresser.
                Ici, vous n&apos;avez rien à connaître à l&apos;avance.
              </p>

              <div className="mt-8 space-y-3">
                <StepLine title="Vous partez simplement de votre situation" />

                <StepLine title="Nous cherchons les interlocuteurs adaptés" />

                <StepLine title="Vous repartez avec des pistes concrètes" />
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

function MiniStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[20px] border border-[var(--lumea-border)] bg-white/75 p-4 shadow-[0_8px_24px_rgba(13,35,68,0.035)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-sm font-black text-[var(--lumea-navy)]">
        {number}
      </div>

      <p className="mt-4 font-bold leading-6 text-[var(--lumea-navy)]">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-[var(--lumea-blue-grey)]">
        {text}
      </p>
    </div>
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