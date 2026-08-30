"use client";

import {
  useEffect,
  useState,
} from "react";

export interface ResultNavigationSection {
  id: string;
  label: string;
  shortLabel?: string;
}

interface ResultsNavigationProps {
  sections: ResultNavigationSection[];
}

export default function ResultsNavigation({
  sections,
}: ResultsNavigationProps) {
  const [
    activeSection,
    setActiveSection,
  ] = useState(
    sections[0]?.id ?? ""
  );

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  /**
   * Détecte automatiquement la section
   * actuellement visible.
   */
  useEffect(() => {
    const elements =
      sections
        .map(
          (
            section
          ) =>
            document.getElementById(
              section.id
            )
        )
        .filter(
          (
            element
          ): element is HTMLElement =>
            element !== null
        );

    if (
      elements.length === 0
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (
          entries
        ) => {
          const visible =
            entries
              .filter(
                (
                  entry
                ) =>
                  entry.isIntersecting
              )
              .sort(
                (
                  a,
                  b
                ) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );

          if (
            visible[0]
          ) {
            setActiveSection(
              visible[0].target.id
            );
          }
        },
        {
          rootMargin:
            "-18% 0px -65% 0px",

          threshold: [
            0,
            0.1,
            0.25,
            0.5,
          ],
        }
      );

    elements.forEach(
      (
        element
      ) =>
        observer.observe(
          element
        )
    );

    return () => {
      observer.disconnect();
    };
  }, [
    sections,
  ]);

  /**
   * Fermeture avec Échap sur mobile.
   */
  useEffect(() => {
    if (
      !mobileOpen
    ) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setMobileOpen(
          false
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    mobileOpen,
  ]);

  function goToSection(
    id: string
  ) {
    const element =
      document.getElementById(
        id
      );

    if (
      !element
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    element.scrollIntoView({
      behavior:
        prefersReducedMotion
          ? "auto"
          : "smooth",

      block:
        "start",
    });

    setActiveSection(
      id
    );

    setMobileOpen(
      false
    );
  }

  const activeItem =
    sections.find(
      (
        section
      ) =>
        section.id ===
        activeSection
    ) ??
    sections[0];

  return (
    <>
      {/*
       * ========================================================
       * ORDINATEUR
       * ========================================================
       */}
      <aside className="hidden lg:block">
        <nav
          aria-label="Navigation dans vos résultats"
          className="sticky top-28 rounded-[24px] border border-[var(--lumea-border)] bg-white/90 p-4 shadow-[0_12px_35px_rgba(13,35,68,0.05)] backdrop-blur"
        >
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8f6500]">
            Vos résultats
          </p>

          <div className="space-y-1">
            {sections.map(
              (
                section
              ) => {
                const active =
                  activeSection ===
                  section.id;

                return (
                  <button
                    key={
                      section.id
                    }
                    type="button"
                    onClick={() =>
                      goToSection(
                        section.id
                      )
                    }
                    className={[
                      "group flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left text-sm transition",

                      active
                        ? "bg-[var(--lumea-cream-2)] font-bold text-[var(--lumea-navy)]"
                        : "font-semibold text-[var(--lumea-blue-grey)] hover:bg-[var(--lumea-cream-2)]/60 hover:text-[var(--lumea-navy)]",
                    ].join(
                      " "
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "h-2.5 w-2.5 shrink-0 rounded-full transition",

                        active
                          ? "bg-[var(--lumea-gold)]"
                          : "border border-[var(--lumea-border)] bg-white group-hover:border-[var(--lumea-gold)]",
                      ].join(
                        " "
                      )}
                    />

                    <span className="leading-5">
                      {
                        section.label
                      }
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </nav>
      </aside>

      {/*
       * ========================================================
       * MOBILE
       *
       * Une petite "boussole" reste accessible
       * pendant toute la lecture.
       * ========================================================
       */}
      <div className="lg:hidden">
        {!mobileOpen ? (
          <button
            type="button"
            aria-expanded="false"
            onClick={() =>
              setMobileOpen(
                true
              )
            }
            className="fixed bottom-4 left-1/2 z-50 flex min-h-[54px] max-w-[calc(100vw-28px)] -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-[var(--lumea-navy)] px-5 py-3 text-left text-white shadow-[0_16px_40px_rgba(13,35,68,0.28)]"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold)] font-black text-[var(--lumea-navy)]"
            >
              ≡
            </span>

            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-white/60">
                Vous êtes ici
              </span>

              <span className="block truncate text-sm font-bold">
                {
                  activeItem?.shortLabel ??
                  activeItem?.label ??
                  "Vos résultats"
                }
              </span>
            </span>

            <span className="ml-auto shrink-0 text-sm font-semibold text-[var(--lumea-gold)]">
              Sommaire
            </span>
          </button>
        ) : null}

        {mobileOpen ? (
          <div
            className="fixed inset-0 z-[70] bg-[#07182e]/45 backdrop-blur-[2px]"
            role="presentation"
            onClick={() =>
              setMobileOpen(
                false
              )
            }
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Sommaire de vos résultats"
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
              className="absolute inset-x-3 bottom-3 max-h-[78vh] overflow-y-auto rounded-[28px] border border-white/20 bg-white p-5 shadow-[0_24px_70px_rgba(13,35,68,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f6500]">
                    Votre orientation
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[var(--lumea-navy)]">
                    Où voulez-vous aller ?
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="Fermer le sommaire"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-cream-2)] text-xl font-bold text-[var(--lumea-navy)]"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 space-y-2">
                {sections.map(
                  (
                    section,
                    index
                  ) => {
                    const active =
                      activeSection ===
                      section.id;

                    return (
                      <button
                        key={
                          section.id
                        }
                        type="button"
                        onClick={() =>
                          goToSection(
                            section.id
                          )
                        }
                        className={[
                          "flex w-full items-center gap-4 rounded-[18px] border px-4 py-4 text-left transition",

                          active
                            ? "border-[var(--lumea-gold)] bg-[var(--lumea-cream-2)]"
                            : "border-[var(--lumea-border)] bg-white",
                        ].join(
                          " "
                        )}
                      >
                        <span
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black",

                            active
                              ? "bg-[var(--lumea-gold)] text-[var(--lumea-navy)]"
                              : "bg-[var(--lumea-cream-2)] text-[var(--lumea-blue-grey)]",
                          ].join(
                            " "
                          )}
                        >
                          {
                            index +
                            1
                          }
                        </span>

                        <span
                          className={[
                            "font-semibold leading-6",

                            active
                              ? "text-[var(--lumea-navy)]"
                              : "text-[var(--lumea-blue-grey)]",
                          ].join(
                            " "
                          )}
                        >
                          {
                            section.label
                          }
                        </span>

                        {active ? (
                          <span className="ml-auto text-xs font-bold uppercase tracking-[0.08em] text-[#8f6500]">
                            Ici
                          </span>
                        ) : null}
                      </button>
                    );
                  }
                )}
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-[var(--lumea-blue-grey)]">
                Vous pouvez revenir à ce
                sommaire à tout moment pendant
                la lecture.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}