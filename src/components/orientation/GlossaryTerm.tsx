"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  GlossaryEntry,
} from "@/data/glossary";

interface GlossaryTermProps {
  label: string;
  entry: GlossaryEntry;
}

export default function GlossaryTerm({
  label,
  entry,
}: GlossaryTermProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const popoverId =
    useId();

  const wrapperRef =
    useRef<HTMLSpanElement | null>(
      null
    );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape"
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() =>
          setIsOpen(
            (current) =>
              !current
          )
        }
        className="mx-0.5 inline-flex min-h-[30px] items-center gap-1 rounded-md px-1 font-semibold text-[var(--lumea-navy)] underline decoration-dotted decoration-[var(--lumea-gold)] decoration-2 underline-offset-4 transition hover:bg-[var(--lumea-gold-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)]"
      >
        <span>{label}</span>

        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-[10px] font-black no-underline"
        >
          ?
        </span>
      </button>

      {isOpen ? (
        <span
          id={popoverId}
          role="note"
          className="absolute left-0 top-full z-40 mt-2 block w-[min(320px,calc(100vw-48px))] rounded-[16px] border border-[var(--lumea-border)] bg-white p-4 text-left shadow-[0_16px_40px_rgba(13,35,68,0.14)]"
        >
          <span className="block text-sm font-black text-[var(--lumea-navy)]">
            {entry.term}
          </span>

          <span className="mt-1 block text-sm font-semibold leading-6 text-[var(--lumea-navy)]">
            {entry.fullName}
          </span>

          <span className="mt-2 block text-sm font-normal leading-6 text-[var(--lumea-blue-grey)]">
            {entry.definition}
          </span>

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            className="mt-3 min-h-10 text-sm font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] underline-offset-4"
          >
            J&apos;ai compris
          </button>
        </span>
      ) : null}
    </span>
  );
}
