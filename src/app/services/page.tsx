export default function ServicesPage() {
  return (
    <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        Nos services
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        Luméa Services vous propose un accompagnement sur mesure pour
        l’entretien de votre maison et de vos extérieurs.
      </p>
      <ul className="list-disc pl-8 text-gray-600 space-y-2">
        <li>Ménage et repassage</li>
        <li>Entretien de vitres</li>
        <li>Nettoyage de bureaux et locaux professionnels</li>
        <li>Entretien de jardin</li>
        <li>Petits travaux d’entretien</li>
      </ul>
    </section>
  );
}
