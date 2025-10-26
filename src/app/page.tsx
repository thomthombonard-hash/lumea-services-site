export default function HomePage() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Bienvenue chez Luméa Services
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Nous proposons des services à la personne de qualité à La Flèche et dans les environs :
        ménage, repassage, entretien de vitres, jardinage, et bien plus encore.
      </p>
      <div className="mt-8">
        <a
          href="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Demander un devis
        </a>
      </div>
    </section>
  );
}
