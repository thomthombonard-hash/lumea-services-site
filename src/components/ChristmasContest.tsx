"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CHRISTMAS_CONTEST,
  getContestFacebookUrl,
  getContestPhase,
  type ContestPhase,
} from "@/lib/christmasContest";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500";
const primary = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#F8D57E] px-6 py-3 text-base font-bold text-[#173F35] shadow-sm transition hover:bg-[#FFE5A4] ${focus}`;
const secondary = `inline-flex min-h-12 items-center justify-center rounded-full border border-[#A9C5B5] bg-white px-6 py-3 text-base font-semibold text-[#194B3D] transition hover:bg-emerald-50 ${focus}`;

function useContestPhase() {
  // Valeur neutre au rendu statique : aucune divergence d'hydratation et aucune
  // invitation à participer avant le contrôle des dates dans le navigateur.
  const [phase, setPhase] = useState<ContestPhase | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      const now = Date.now();
      const current = getContestPhase(now);
      setPhase(current);
      const nextBoundary = current === "upcoming"
        ? Date.parse(CHRISTMAS_CONTEST.startsAt)
        : current === "open" ? Date.parse(CHRISTMAS_CONTEST.closesAt) : null;
      if (nextBoundary !== null) {
        timer = setTimeout(update, Math.min(Math.max(nextBoundary - now, 100), 60_000));
      }
    };
    update();
    window.addEventListener("focus", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", update);
    };
  }, []);

  return phase;
}

function Gift({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 22h32v21H8zM5 14h38v9H5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 14v29M24 14c-14 0-16-13-8-11 5 1 8 11 8 11Zm0 0c14 0 16-13 8-11-5 1-8 11-8 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Décor du concours, masqué aux technologies d’assistance.
function ChristmasDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="contest-snow" />
      <div className="contest-garland">
        {Array.from({ length: 13 }, (_, index) => <span key={index} />)}
      </div>
      <svg viewBox="0 0 360 210" fill="none" className="absolute -right-12 -top-6 w-64 text-[#77A483] opacity-70 sm:w-96">
        <g stroke="currentColor" strokeLinecap="round">
          <path d="M355 5C280 45 210 69 80 78M345 0C300 70 280 120 269 182" strokeWidth="4" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <g key={i} transform={`translate(${110+i*28} ${76-i*6}) rotate(-12)`}><path d="M0 0l-31-25M0 0l-34 23M9-2l-20-30M9-2l-22 29" strokeWidth="2.5" /></g>)}
          {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${277+i*12} ${141-i*26}) rotate(-65)`}><path d="M0 0l-25-22M0 0l-25 21" strokeWidth="2.5" /></g>)}
        </g>
        <path d="M197 63v60M100 80v35" stroke="#F8D57E" strokeWidth="1.5" />
        <rect x="187" y="119" width="20" height="8" rx="2" fill="#F8D57E" />
        <circle cx="197" cy="149" r="26" fill="#B4313E" /><path d="M181 134c-6 9-5 20-2 25" stroke="#F0AAA6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="128" r="15" fill="#F8D57E" /><path d="M93 120l-2 8" stroke="#FFF0C4" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 240 260" fill="none" className="absolute -bottom-16 -left-14 w-64 rotate-180 text-[#77A483] opacity-35">
        <path d="M220 10C180 130 120 190 20 240" stroke="currentColor" strokeWidth="4" />
        {[0,1,2,3,4,5].map((i) => <g key={i} transform={`translate(${60+i*26} ${216-i*30}) rotate(-42)`}><path d="M0 0l-38-28M0 0l-38 28M12-8l-29-33M12-8l-27 33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></g>)}
      </svg>
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="contest-stars absolute inset-0 h-full w-full text-[#FFF2C9] opacity-40">
        {[[70,100],[560,65],[720,285],[1110,510],[490,580],[95,520],[650,625],[1080,320]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} fill="currentColor"><path d="M0-7L2-2 7 0 2 2 0 7-2 2-7 0-2-2Z" /></g>)}
        {[[300,30],[730,140],[580,380],[40,330],[900,630],[1160,90],[355,650],[670,490],[790,45],[260,430]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="currentColor" />)}
      </svg>
    </div>
  );
}

export function ChristmasContestTeaser() {
  const phase = useContestPhase();
  // L'encart de l'accueil s'efface à la clôture ; la page et le PDF restent
  // accessibles pour les gagnants jusqu'à la réalisation de leurs lots.
  if (phase === "closed") return null;

  return (
    <aside aria-label="Concours de Noël Luméa Services" className="border-b border-[#bf934b] bg-gradient-to-r from-[#143b30] via-[#1e4a37] to-[#143b30] text-white">
      <Link
        href={CHRISTMAS_CONTEST.pagePath}
        className={`group mx-auto flex min-h-14 max-w-[92rem] items-center gap-3 px-5 py-2.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-10 xl:px-16 ${focus} focus-visible:-outline-offset-4`}
      >
        <Gift className="h-7 w-7 shrink-0 text-[#f8d57e]" />
        <span className="min-w-0 flex-1 text-sm leading-snug sm:text-base">
          <strong className="block text-[#fff0c7] sm:inline">Concours de Noël</strong>
          <span className="hidden sm:inline" aria-hidden="true"> · </span>
          <span className="block sm:inline">3 mois de ménage à gagner</span>
        </span>
        <span className="hidden shrink-0 text-sm text-[#f9e7c1] lg:inline">
          {phase === "open" ? "Jusqu’au 24 décembre à midi" : "Dès le 1er décembre"}
        </span>
        <span className="shrink-0 rounded-full bg-[#f8d57e] px-3 py-2 text-xs font-bold text-[#173f35] group-hover:bg-[#ffe9ac] sm:px-4 sm:text-sm">
          Découvrir <span aria-hidden="true">→</span>
        </span>
      </Link>
    </aside>
  );
}

const prizes = [
  {
    rank: "Premier prix",
    title: "3 mois de ménage",
    amount: "604,50 €",
    duration: "1 h 30 par semaine",
    detail: "13 passages, soit 19 h 30 de ménage courant, entre janvier et mars 2027. Un planning fixe convenu ensemble, avec une intervenante habituelle, hors remplacement pendant ses congés ou un arrêt maladie.",
    included: "Main-d’œuvre et déplacements offerts. Matériel et produits fournis par le gagnant.",
    deadline: "Du 1er janvier au 31 mars 2027",
  },
  {
    rank: "Deuxième prix",
    title: "Des vitres qui brillent",
    amount: "136 €",
    duration: "4 h de vitrerie en un passage",
    detail: "Fenêtres et baies vitrées classiques accessibles, dans la limite de 4 heures. Les vitrages prioritaires sont choisis ensemble. Sans nacelle ni grande verrière en hauteur.",
    included: "Main-d’œuvre, déplacements, matériel et produits inclus.",
    deadline: "À utiliser au plus tard le 30 juin 2027",
  },
  {
    rank: "Troisième prix",
    title: "Un coup de propre après les fêtes",
    amount: "93 €",
    duration: "3 h de ménage en une fois",
    detail: "Sols, poussières, cuisine, salle de bains… Nous définissons ensemble les priorités pour un ménage courant, dans la limite des 3 heures offertes.",
    included: "Main-d’œuvre et déplacements offerts. Matériel et produits fournis par le gagnant.",
    deadline: "Du 1er janvier au 31 mars 2027",
  },
];

function ShareContest() {
  const [message, setMessage] = useState("");
  const [manualCopy, setManualCopy] = useState(false);

  const share = async () => {
    setMessage("");
    setManualCopy(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Le concours de Noël Luméa Services",
          text: "3 mois de ménage, une intervention de vitrerie et un ménage d’après-fêtes à gagner à La Flèche et 20 km autour. Découvrez le concours Luméa Services !",
          url: CHRISTMAS_CONTEST.pageUrl,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      if (!navigator.clipboard) throw new Error("Copie indisponible");
      await navigator.clipboard.writeText(CHRISTMAS_CONTEST.pageUrl);
      setMessage("Lien copié. Vous pouvez l’envoyer à vos proches.");
    } catch {
      setManualCopy(true);
      setMessage("Sélectionnez le lien ci-dessous pour le copier.");
    }
  };

  return (
    <div className="mt-7">
      <button type="button" onClick={share} className={secondary}>Faire passer le mot</button>
      <p aria-live="polite" className="mt-3 text-base leading-6 text-slate-600">{message}</p>
      {manualCopy && (
        <label className="mt-3 block text-base font-medium text-slate-700">
          Lien du concours
          <input readOnly value={CHRISTMAS_CONTEST.pageUrl} onFocus={(event) => event.target.select()} className={`mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base ${focus}`} />
        </label>
      )}
    </div>
  );
}

export function ChristmasContestPageContent() {
  const phase = useContestPhase();
  const facebookUrl = getContestFacebookUrl();
  const status = phase === "closed" ? "Les participations sont closes"
    : phase === "open" ? "Le concours est ouvert" : phase === "upcoming" ? "Ouverture le 1er décembre" : "Du 1er au 24 décembre 2026";

  return (
    <main className="site-special-page contest-page">
      <div className="overflow-hidden rounded-2xl bg-white text-[#173F35]">
      <section aria-labelledby="concours-title" className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_70%_30%,#2B6350_0%,#153E33_55%,#102F28_100%)] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
        <ChristmasDecor />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(135deg,#A7313E_0px,#A7313E_16px,#FFF2D5_16px,#FFF2D5_30px)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#F8D57E]/40 bg-[#F8D57E]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#F8D57E]">Le grand concours de Noël</p>
            <h1 id="concours-title" className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Un peu de magie.<br />Du temps offert.<br /><span className="font-serif italic font-normal text-[#F8D57E]">Joyeux Noël.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-emerald-50">
              Trois lots de ménage et de vitrerie à gagner, tout près de chez vous.
              Cette année, Luméa Services glisse un peu de douceur dans votre quotidien.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-base text-amber-100">
              <span>3 gagnants</span><span>833,50 € de prestations</span><span>Gratuit et sans achat</span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#participation" className={primary}>{phase === "closed" ? "Consulter les informations" : "Comment participer"}</a>
              <a href={CHRISTMAS_CONTEST.rulesPdf} className={`inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 ${focus}`}>
                Lire le règlement PDF
              </a>
            </div>
          </div>
          <div className="contest-prize relative mx-auto w-full max-w-sm lg:rotate-2">
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#F8D57E]/60 bg-[#FFFCF5] p-8 text-[#173F35] shadow-2xl sm:p-10">
              <div aria-hidden="true" className="absolute right-8 top-0 h-24 w-9 bg-[#A7313E] [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]" />
              <div className="inline-flex rounded-2xl bg-[#FBE9E8] p-3 text-[#A7313E]"><Gift className="h-12 w-12" /></div>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em]">Le premier prix</p>
              <p className="mt-3 text-[clamp(3.25rem,12vw,6rem)] font-bold leading-none tracking-[-0.06em] text-[#A7313E]">3 mois</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">de ménage offerts</p>
              <div className="my-7 h-px bg-[#17263B]/20" />
              <p className="text-lg font-semibold">1 h 30 par semaine</p>
              <p className="mt-2 text-base leading-7">13 passages de janvier à mars 2027.<br />Planning fixe, intervenante habituelle.*</p>
            </div>
            <p className="mt-4 px-2 text-sm leading-6 text-emerald-50 lg:-rotate-2">* Remplacement possible en cas de congés ou d’arrêt maladie. Matériel et produits de ménage fournis par le gagnant.</p>
          </div>
        </div>
      </section>

      <div className="border-b border-[#D4E4D9] bg-[#EEF5F0] px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-base sm:flex-row sm:items-center">
          <p className="font-semibold">La Flèche et 20 km à vol d’oiseau autour de l’agence</p>
          <p className="text-slate-600">Clôture le 24 décembre 2026 à 12 h · Heure de Paris</p>
        </div>
      </div>

      <section aria-labelledby="lots-title" className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A7313E]">Des cadeaux utiles, chez vous</p>
        <h2 id="lots-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Trois lots pour souffler un peu.</h2>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {prizes.map((prize, index) => (
            <article key={prize.rank} className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 pt-8 sm:p-7 sm:pt-9 ${index === 0 ? "border-[#E7B3B5] bg-[#FFF5F4]" : index === 1 ? "border-[#BBD3C4] bg-[#F1F7F3]" : "border-[#E8D4A6] bg-[#FFFBF0]"}`}>
              <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-2 ${index === 0 ? "bg-[#A7313E]" : index === 1 ? "bg-[#27644C]" : "bg-[#BD8D36]"}`} />
              <div className="flex items-center justify-between gap-3"><p className={`text-sm font-bold uppercase tracking-[0.12em] ${index === 0 ? "text-[#A7313E]" : index === 1 ? "text-[#27644C]" : "text-[#8E641C]"}`}>{prize.rank}</p><Gift className={`h-8 w-8 shrink-0 ${index === 0 ? "text-[#A7313E]" : index === 1 ? "text-[#27644C]" : "text-[#8E641C]"}`} /></div>
              <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight">{prize.title}</h3>
              <p className="mt-4 text-lg font-semibold">{prize.duration}</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{prize.detail}</p>
              <p className="mt-5 text-base font-medium leading-7">{prize.included}</p>
              <div className="mt-auto pt-7">
                <p className="border-t border-slate-200 pt-5 text-base leading-6 text-slate-600">{prize.deadline}</p>
                <p className="mt-3 text-base font-semibold">Valeur : {prize.amount} TTC</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-base leading-7 text-slate-600">Les déplacements sont inclus dans la zone du concours, sans supplément. Les lots de ménage concernent l’entretien courant ; ils ne comprennent pas les remises en état lourdes.</p>
      </section>

      <section id="participation" aria-labelledby="participation-title" className="scroll-mt-28 border-y border-[#D4E4D9] bg-[#EEF5F0] px-6 py-14 sm:px-10 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p role="status" aria-live="polite" className="text-sm font-bold uppercase tracking-[0.14em] text-[#A7313E]">{status}</p>
            <h2 id="participation-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Tout se passe sur Facebook.</h2>
            {phase === "closed" ? (
              <p className="mt-6 text-lg leading-8 text-slate-600">Le concours s’est terminé le 24 décembre 2026 à midi. Le tirage était prévu le même jour à 14 h. Retrouvez les informations de l’organisateur sur la page Facebook Luméa Services ; le règlement reste consultable ici.</p>
            ) : (
              <>
                <p className="mt-6 text-lg leading-8 text-slate-600">Du 1er décembre au 24 décembre 2026 à midi, retrouvez la publication officielle du concours sur la page Facebook Luméa Services.</p>
                <ol className="mt-7 space-y-5 text-base leading-7">
                  <li className="flex gap-4"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A7313E] font-bold text-white">1</span><span>Mettez un <strong>J’aime à la publication du concours</strong>.</span></li>
                  <li className="flex gap-4"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A7313E] font-bold text-white">2</span><span>Laissez un commentaire sous cette même publication, par exemple <strong>« Je participe »</strong>.</span></li>
                </ol>
                <p className="mt-6 text-base leading-7 text-slate-600">Une participation par personne. Le tirage au sort désignera trois gagnants distincts le 24 décembre à 14 h. Aucune inscription sur ce site n’est nécessaire.</p>
                {phase === "open" && facebookUrl ? (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={`${primary} mt-7`}>
                    Participer sur Facebook<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                ) : phase === "open" ? (
                  <p className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 text-base leading-7">Retrouvez la publication du concours directement sur la page Facebook <strong>Luméa Services</strong>. Les commentaires sur ce site ne constituent pas une participation.</p>
                ) : (
                  <p className="mt-7 text-base font-semibold">Les participations ouvriront le 1er décembre 2026 à 00 h.</p>
                )}
              </>
            )}
          </div>
          <div className="border-t border-slate-300 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="text-2xl font-bold tracking-tight">Quelques points à connaître</h3>
            <ul className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              <li>Ouvert aux particuliers majeurs, clients ou non, dans un rayon de 20 km à vol d’oiseau depuis notre agence, 4 rue de Fontevrault à La Flèche.</li>
              <li>Prestations réalisées au domicile du gagnant, dans cette même zone.</li>
              <li>Jeu gratuit, sans achat ni abonnement payant à souscrire après le lot.</li>
              <li>Dirigeant, salariés, organisateurs et foyers concernés exclus selon le règlement. Assistance ou représentation prévue lorsque la situation juridique du participant le nécessite.</li>
            </ul>
            <a href={CHRISTMAS_CONTEST.rulesPdf} download className={`${secondary} mt-7`}>Télécharger le règlement PDF</a>
          </div>
        </div>
      </section>

      {phase !== "closed" && (
        <section aria-labelledby="partage-title" className="relative isolate mx-auto max-w-3xl px-6 py-14 text-center sm:px-10 lg:py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#E7B3B5] bg-[#FFF0EE] text-[#A7313E]"><Gift className="h-11 w-11" /></div>
          <h2 id="partage-title" className="mt-6 text-3xl font-bold tracking-tight">Vous pensez à quelqu’un&nbsp;?</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Une personne de votre entourage aimerait peut-être ce coup de pouce. Envoyez-lui le concours ou parlez-en autour de vous.</p>
          <ShareContest />
          <p className="mt-4 text-base leading-7 text-slate-500">Partager, identifier des proches ou s’abonner à la page est facultatif et ne donne aucune chance supplémentaire.</p>
        </section>
      )}

      <section aria-labelledby="questions-title" className="mx-auto max-w-4xl px-6 pb-14 pt-6 sm:px-10 lg:pb-20">
        <h2 id="questions-title" className="text-3xl font-bold tracking-tight">Vos questions</h2>
        <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
          {[
            ["Je suis déjà client, puis-je participer ?", "Oui. Le concours est ouvert aux clients actuels comme aux nouveaux participants qui remplissent les conditions. Les heures couvertes par le lot ne sont pas facturées aux clients gagnants."],
            ["Faut-il fournir le matériel et les produits ?", "Pour le ménage, oui : les deux lots couvrent la main-d’œuvre et les déplacements. Pour la vitrerie, le matériel et les produits sont inclus."],
            ["Les 4 heures de vitrerie couvrent-elles toute la maison ?", "Le lot est une intervention de 4 heures, pas une promesse de nettoyage de toutes les vitres, quelle que soit la taille du logement. Nous choisissons ensemble les vitrages classiques accessibles à nettoyer en priorité."],
            ["Comment les gagnants seront-ils contactés ?", "Luméa Services les contactera par message privé et répondra à leur commentaire sur Facebook. Un délai de 7 jours est prévu pour répondre, selon les modalités du règlement."],
          ].map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className={`cursor-pointer text-lg font-semibold ${focus}`}>{question}</summary>
              <p className="mt-4 text-base leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-base leading-7 text-slate-500">Concours organisé par SARL Luméa Services, 992 784 090 RCS Le Mans. Facebook et Meta ne sont ni organisateurs, ni partenaires, ni parrains du jeu. Conditions détaillées, reports et protection des données : consultez le règlement complet.</p>
      </section>
      </div>
    </main>
  );
}
