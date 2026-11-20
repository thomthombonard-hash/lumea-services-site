"use client";

import { useEffect } from "react";
import { CHRISTMAS_SEASON, isChristmasSeason } from "@/lib/christmasSeason";

function FestiveBranch({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 260 120" fill="none" className={`christmas-season-branch${mirrored ? " christmas-season-branch-right" : ""}`}>
      <g stroke="#679E7A" strokeLinecap="round">
        <path d="M0 4C72 34 155 54 253 62" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={i} transform={`translate(${24 + i * 31} ${14 + i * 7}) rotate(10)`}>
            <path d="M0 0L-14-24M0 0L-22 22M9 1L-3-22M9 1L-8 25" strokeWidth="2" />
          </g>
        ))}
      </g>
      <path d="M67 28v42M161 51v28" stroke="#E7C578" strokeWidth="1.5" />
      <circle cx="67" cy="84" r="14" fill="#BD4350" />
      <path d="M62 77l-2 7" stroke="#F8C1B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="161" cy="89" r="10" fill="#E7C578" />
      <circle cx="107" cy="34" r="4" fill="#B63845" /><circle cx="114" cy="41" r="4" fill="#B63845" />
    </svg>
  );
}

export default function ChristmasSeason() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      clearTimeout(timer);
      const now = Date.now();
      const active = isChristmasSeason(now);
      if (active) document.documentElement.setAttribute("data-christmas", "2026");
      else document.documentElement.removeAttribute("data-christmas");
      const boundary = now < Date.parse(CHRISTMAS_SEASON.startsAt)
        ? Date.parse(CHRISTMAS_SEASON.startsAt)
        : active ? Date.parse(CHRISTMAS_SEASON.endsAt) : null;
      if (boundary !== null) timer = setTimeout(update, Math.min(Math.max(boundary - now, 1), 60_000));
    };
    update();
    window.addEventListener("focus", update);
    window.addEventListener("pageshow", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", update);
      window.removeEventListener("pageshow", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="christmas-season-banner">
      <FestiveBranch />
      <div className="christmas-season-greeting">
        <span aria-hidden="true" className="christmas-season-star">✧</span>
        <div>
          <p className="christmas-season-eyebrow">Les fêtes avec Luméa Services</p>
          <p className="christmas-season-wish">Un intérieur qui brille, du temps pour ceux qu’on aime.</p>
        </div>
        <span aria-hidden="true" className="christmas-season-star">✧</span>
      </div>
      <FestiveBranch mirrored />
    </div>
  );
}
