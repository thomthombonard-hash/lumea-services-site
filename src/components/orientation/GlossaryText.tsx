"use client";

import {
  Fragment,
} from "react";

import {
  findGlossaryEntry,
  glossarySearchTerms,
} from "@/data/glossary";

import GlossaryTerm from "./GlossaryTerm";

interface GlossaryTextProps {
  text: string;
}

function escapeRegExp(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

const glossaryPattern =
  new RegExp(
    `\\b(${glossarySearchTerms
      .map(escapeRegExp)
      .join("|")})\\b`,
    "gi"
  );

export default function GlossaryText({
  text,
}: GlossaryTextProps) {
  const parts =
    text.split(
      glossaryPattern
    );

  return (
    <>
      {parts.map(
        (
          part,
          index
        ) => {
          const entry =
            findGlossaryEntry(
              part
            );

          if (!entry) {
            return (
              <Fragment
                key={index}
              >
                {part}
              </Fragment>
            );
          }

          return (
            <GlossaryTerm
              key={`${entry.id}-${index}`}
              label={part}
              entry={entry}
            />
          );
        }
      )}
    </>
  );
}
