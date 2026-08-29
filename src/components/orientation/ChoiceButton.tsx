interface ChoiceButtonProps {
  label: string;
  description?: string;
  onClick: () => void;
}

export default function ChoiceButton({
  label,
  description,
  onClick,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[74px] w-full items-center justify-between gap-5 border-b border-[var(--lumea-border)] px-1 py-5 text-left transition last:border-b-0 hover:px-3 focus-visible:bg-white"
    >
      <div className="flex items-start gap-4">
        <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-[var(--lumea-blue)] transition group-hover:border-[var(--lumea-gold)] group-hover:bg-[var(--lumea-gold)]" />

        <span>
          <span className="block text-lg font-bold text-[var(--lumea-navy)]">
            {label}
          </span>

          {description ? (
            <span className="mt-1 block text-sm leading-6 text-[var(--lumea-muted)]">
              {description}
            </span>
          ) : null}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="shrink-0 font-bold text-[var(--lumea-blue)] transition group-hover:translate-x-1 group-hover:text-[var(--lumea-gold)]"
      >
        →
      </span>
    </button>
  );
}