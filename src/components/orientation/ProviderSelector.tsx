"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  getSupportProviders,
  providerMatchesSearch,
  type SupportProvider,
  type SupportProviderCategory,
} from "@/data/support-providers";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

interface ProviderSelectorProps {
  category:
    SupportProviderCategory;

  onSelect: (
    provider: SupportProvider
  ) => void;

  onUnknown: (
    enteredName: string
  ) => void;
}

export default function ProviderSelector({
  category,
  onSelect,
  onUnknown,
}: ProviderSelectorProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    showAll,
    setShowAll,
  ] = useState(false);

  const providers =
    getSupportProviders(
      category
    );

  const visibleProviders =
    useMemo(
      () => {
        const trimmed =
          search.trim();

        if (trimmed) {
          return providers.filter(
            (
              provider
            ) =>
              providerMatchesSearch(
                provider,
                trimmed
              )
          );
        }

        if (showAll) {
          return providers;
        }

        return providers.filter(
          (
            provider
          ) =>
            provider.popular
        );
      },
      [
        providers,
        search,
        showAll,
      ]
    );

  const label =
    category ===
    "mutuelle"
      ? "mutuelle"
      : "assurance";

  return (
    <section className="rounded-[24px] border border-[var(--lumea-border)] bg-white p-5 sm:p-7">
      <h3 className="text-[1.45rem] font-bold leading-tight text-[var(--lumea-navy)]">
        {forRelative
          ? `Quelle est la ${label} de votre proche ?`
          : `Quelle est votre ${label} ?`}
      </h3>

      <p className="mt-3 max-w-xl text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
        {forRelative
          ? category ===
            "assurance"
            ? "Tapez simplement le nom que vous connaissez. Il peut aussi s’agir du nom de la banque de votre proche."
            : "Tapez simplement le nom de la mutuelle de votre proche."
          : "Tapez simplement le nom que vous connaissez. Il peut aussi s’agir du nom de votre banque."}
      </p>

      <label
        htmlFor={`provider-${category}`}
        className="mt-6 block font-bold text-[var(--lumea-navy)]"
      >
        Nom de l&apos;organisme
      </label>

      <input
        id={`provider-${category}`}
        type="search"
        value={
          search
        }
        autoComplete="off"
        placeholder={
          category ===
          "mutuelle"
            ? "Ex. MGEN, Harmonie, AÉSIO..."
            : "Ex. MAIF, Crédit Agricole, MAAF..."
        }
        onChange={(
          event
        ) => {
          setSearch(
            event.target.value
          );
        }}
        className="mt-2 h-[60px] w-full rounded-[16px] border border-[var(--lumea-border)] bg-[#fbfaf7] px-4 text-[17px] text-[var(--lumea-navy)] outline-none transition focus:border-[var(--lumea-gold)] focus:bg-white focus:ring-4 focus:ring-[var(--lumea-gold-soft)]"
      />

      {search.trim() ? (
        <p className="mt-3 text-sm leading-6 text-[var(--lumea-blue-grey)]">
          Recherche également
          dans les autres noms
          connus de l&apos;organisme.
        </p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-[18px] border border-[var(--lumea-border)]">
        {visibleProviders.length >
        0 ? (
          visibleProviders.map(
            (
              provider,
              index
            ) => (
              <button
                key={
                  provider.id
                }
                type="button"
                onClick={() =>
                  onSelect(
                    provider
                  )
                }
                className={`flex min-h-[66px] w-full items-center justify-between gap-5 bg-white px-5 py-4 text-left transition hover:bg-[#f8f4eb] ${
                  index !==
                  visibleProviders.length -
                    1
                    ? "border-b border-[var(--lumea-border)]"
                    : ""
                }`}
              >
                <span>
                  <span className="block text-[17px] font-bold leading-6 text-[var(--lumea-navy)]">
                    {
                      provider.name
                    }
                  </span>

                  {provider.kind ===
                  "banque" ? (
                    <span className="mt-1 block text-sm text-[var(--lumea-blue-grey)]">
                      Banque proposant
                      une assurance
                    </span>
                  ) : null}
                </span>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl font-bold text-[var(--lumea-gold)]"
                >
                  →
                </span>
              </button>
            )
          )
        ) : (
          <div className="bg-white p-5">
            <p className="font-semibold text-[var(--lumea-navy)]">
              Nous ne trouvons pas
              ce nom dans notre liste.
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--lumea-blue-grey)]">
              Ce n&apos;est pas grave :
              vous pourrez quand même
              continuer.
            </p>
          </div>
        )}
      </div>

      {!search.trim() ? (
        <button
          type="button"
          onClick={() =>
            setShowAll(
              (
                current
              ) =>
                !current
            )
          }
          className="mt-4 min-h-11 font-semibold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] underline-offset-4"
        >
          {showAll
            ? "Afficher seulement les plus courants"
            : `Afficher toute la liste (${providers.length})`}
        </button>
      ) : null}

      <div className="mt-6 border-t border-[var(--lumea-border)] pt-5">
        <button
          type="button"
          onClick={() =>
            onUnknown(
              search.trim()
            )
          }
          className="min-h-12 w-full rounded-[16px] border border-[var(--lumea-border)] bg-[#fbfaf7] px-5 py-3 text-left font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)] hover:bg-white"
        >
          {forRelative
            ? "Je ne trouve pas son organisme"
            : "Je ne trouve pas mon organisme"}
        </button>
      </div>
    </section>
  );
}