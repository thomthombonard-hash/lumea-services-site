import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-white text-gray-900">
      
      {/* HERO */}
      <section className="relative pt-28 pb-20 bg-gradient-to-b from-[#FFFBEA] to-white">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2 items-center">

          {/* TEXTE */}
          <div>
            <h1 className="text-4xl font-bold text-[#1E293B]">
              Transport et accompagnement à La Flèche
            </h1>

            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Luméa Services propose un service de <strong>transport et d’accompagnement</strong>
              pour les déplacements du quotidien à <strong>La Flèche</strong> et
              <strong> La Suze-sur-Sarthe</strong>.
            </p>

            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✔ Rendez-vous personnels et administratifs</li>
              <li>✔ Courses et déplacements de proximité</li>
              <li>✔ Accompagnement humain et rassurant</li>
            </ul>

            <Link
              href="/contact#prenom"
              className="inline-block mt-8 rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow hover:scale-[1.03]"
            >
              Demander un devis
            </Link>
          </div>

          {/* IMAGE */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/optimized/transport.webp"
              alt="Service de transport et d’accompagnement à La Flèche"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </section>

    </main>
  );
}
