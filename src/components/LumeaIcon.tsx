import type { ReactNode } from "react";

const shapes: Record<"phone" | "team" | "quote" | "pin" | "credit", ReactNode> = {
  phone: <path d="M21 16.4v2.9a1.9 1.9 0 0 1-2.1 1.9A18.8 18.8 0 0 1 2.8 5.1 1.9 1.9 0 0 1 4.7 3h2.9a1.9 1.9 0 0 1 1.9 1.6l.5 2.5a1.9 1.9 0 0 1-.5 2l-1.2 1.2a15 15 0 0 0 5.4 5.4l1.2-1.2a1.9 1.9 0 0 1 2-.5l2.5.5a1.9 1.9 0 0 1 1.6 1.9Z" />,
  team: <><circle cx="10" cy="7" r="3" /><path d="M3 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 4.2a3 3 0 0 1 0 5.6M21 20v-2a4 4 0 0 0-3-3.9" /></>,
  quote: <path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10m-7-7v7h7m-7-7 7 7M8 15l2 2 4-4" />,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  credit: <><circle cx="12" cy="12" r="9" /><path d="M15 8a3.7 3.7 0 0 0-2-.6c-2.2 0-3.8 2-3.8 4.6s1.6 4.6 3.8 4.6a3.7 3.7 0 0 0 2-.6M7.5 10.6H13m-5.5 2.8H13" /></>,
};

export default function LumeaIcon({ name, className }: { name: keyof typeof shapes; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {shapes[name]}
    </svg>
  );
}
