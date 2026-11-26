import type { Metadata } from "next";

export const siteOrigin = "https://www.lumea-services.fr";
const siteName = "Luméa Services";
export const businessId = `${siteOrigin}/#lumea-services`;

export function pageMetadata(path: string, title: string, description: string, image?: string): Metadata {
  const url = new URL(path, siteOrigin).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "fr_FR",
      type: "website",
      images: image ? [{ url: new URL(image, siteOrigin).href }] : undefined,
    },
  };
}

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: siteName,
      inLanguage: "fr-FR",
      publisher: { "@id": businessId },
    },
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: siteName,
      url: `${siteOrigin}/`,
      telephone: "+33673258816",
      email: "bonard@lumea-services.fr",
      logo: `${siteOrigin}/brand/lumea-services-logo.jpg`,
      image: `${siteOrigin}/brand/lumea-home-hero.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "4 rue Fontevrault",
        postalCode: "72200",
        addressLocality: "La Flèche",
        addressCountry: "FR",
      },
      areaServed: ["La Flèche", "La Suze-sur-Sarthe"].map((name) => ({ "@type": "City", name })),
    },
  ],
};

export function serviceBreadcrumb(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteOrigin}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteOrigin}/services` },
      { "@type": "ListItem", position: 3, name, item: new URL(path, siteOrigin).href },
    ],
  };
}
