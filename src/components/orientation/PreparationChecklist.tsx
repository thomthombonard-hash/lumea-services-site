"use client";

import {
  useState,
} from "react";

import {
  getPreparationChecklist,
} from "@/data/preparation-checklists";

import {
  adaptTextForAudience,
} from "@/lib/orientation/audience-language";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  Recommendation,
} from "@/lib/orientation/types";

import GlossaryText from "./GlossaryText";

interface PreparationChecklistProps {
  recommendation:
    Recommendation;
}

export default function PreparationChecklist({
  recommendation,
}: PreparationChecklistProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const checklist =
    getPreparationChecklist(
      recommendation
    );

  const [
    checkedItems,
    setCheckedItems,
  ] = useState<
    Record<
      string,
      boolean
    >
  >({});

  const checkedCount =
    checklist.items.filter(
      (
        item
      ) =>
        checkedItems[
          item.id
        ]
    ).length;

  const title =
    adaptTextForAudience(
      checklist.title,
      audience
    );

  const introduction =
    adaptTextForAudience(
      checklist.introduction,
      audience
    );

  return (
    <section className="rounded-[22px] border border-[#ead7a2] bg-[#fffaf0] p-5 sm:p-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#8f6500]">
          À préparer
        </p>

        <h3 className="mt-1 text-xl font-bold leading-7 text-[var(--lumea-navy)]">
          <GlossaryText
            text={title}
          />
        </h3>

        <p className="mt-2 text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
          <GlossaryText
            text={introduction}
          />
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {checklist.items.map(
          (
            item
          ) => {
            const isChecked =
              Boolean(
                checkedItems[
                  item.id
                ]
              );

            const label =
              adaptTextForAudience(
                item.label,
                audience
              );

            const note =
              item.note
                ? adaptTextForAudience(
                    item.note,
                    audience
                  )
                : undefined;

            return (
              <div
                key={item.id}
                className="flex w-full gap-4 rounded-[16px] bg-white p-4 text-left transition hover:ring-2 hover:ring-[var(--lumea-gold-soft)]"
              >
                <button
                  type="button"
                  aria-label={
                    isChecked
                      ? `Marquer « ${label} » comme non préparé`
                      : `Marquer « ${label} » comme préparé`
                  }
                  aria-pressed={isChecked}
                  onClick={() =>
                    setCheckedItems(
                      (current) => ({
                        ...current,

                        [item.id]:
                          !isChecked,
                      })
                    )
                  }
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border-2 font-bold transition focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] ${
                    isChecked
                      ? "border-[var(--lumea-navy)] bg-[var(--lumea-navy)] text-white"
                      : "border-[#d5bf83] bg-white text-transparent"
                  }`}
                >
                  ✓
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[16px] font-semibold leading-6 text-[var(--lumea-navy)] ${
                      isChecked
                        ? "opacity-55 line-through"
                        : ""
                    }`}
                  >
                    <GlossaryText
                      text={label}
                    />
                  </p>

                  {note ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
                      <GlossaryText
                        text={note}
                      />
                    </p>
                  ) : null}
                </div>
              </div>
            );
          }
        )}
      </div>

      {checkedCount > 0 ? (
        <p className="mt-4 text-sm font-semibold text-[var(--lumea-navy)]">
          {checkedCount} sur{" "}
          {
            checklist.items.length
          }{" "}
          préparé
          {checkedCount > 1
            ? "s"
            : ""}
        </p>
      ) : null}

      <div className="mt-5 border-t border-[#ead7a2] pt-4">
        <p className="text-[15px] font-bold leading-6 text-[var(--lumea-navy)]">
          {forRelative
            ? "Vous n’avez pas tout sous la main ? Ce n’est pas grave."
            : "Vous n’avez pas tout ? Ce n’est pas grave."}
        </p>

        <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
          {forRelative
            ? "Ces éléments peuvent faciliter l’échange, mais vous pouvez quand même appeler sans disposer de tous les documents de votre proche."
            : "Ces éléments peuvent faciliter l’échange, mais vous pouvez quand même appeler sans les avoir tous à proximité."}
        </p>
      </div>
    </section>
  );
}