export default function PrivacyNotice() {
  return (
    <div className="rounded-[18px] border border-white/12 bg-white/[0.07] p-5">
      <div className="flex gap-4">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <LockIcon />
        </div>

        <div>
          <p className="font-bold text-white">
            Votre situation reste privée
          </p>

          <p className="mt-1.5 text-sm leading-6 text-white/65">
            Vos réponses ne sont ni
            enregistrées ni transmises
            à Luméa. Elles disparaissent
            lorsque vous quittez
            l&apos;outil.
          </p>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}