export default function MentionsLegalesPage() {
  return (
    <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Mentions légales
      </h1>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">Éditeur du site</h2>
      <p className="mb-4 text-gray-700">
        Luméa Services<br />
        17 avenue d’Obernkirchen, 72200 La Flèche<br />
        Tél. : 06.34.20.04.70<br />
        Email : contact@lumeaservices.fr<br />
        Directeur de publication : <strong>Thomas BONARD</strong>
      </p>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">Hébergement</h2>
      <p className="mb-4 text-gray-700">
        LWS (Ligne Web Services) – 10 rue Penthièvre, 75008 Paris<br />
        Site web : <a href="https://www.lws.fr" className="text-blue-700 underline">
          www.lws.fr
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">Propriété intellectuelle</h2>
      <p className="text-gray-700">
        Le contenu du site (textes, images, graphismes, logo) est la propriété exclusive
        de Luméa Services. Toute reproduction est interdite sans autorisation préalable.
      </p>
    </section>
  );
}
