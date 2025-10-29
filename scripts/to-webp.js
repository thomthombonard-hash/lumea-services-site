// scripts/to-webp.mjs
import fs from "node:fs/promises";
import sharp from "sharp";

// 🖼️ Liste des images à optimiser
const images = [
  "public/pouss.jpg",
  "public/embauche.jpg",
  "public/pexels-tima-miroshnichenko-6196682.jpg",
  "public/vitrepart.jpg",
  "public/vitrepro.jpg",
  "public/gros.jpg",
  "public/ménage.jpg",
  "public/ménage2.jpg",
  "public/partiecom.jpg",
  "public/pexels-fauxels-3183150.jpg",
  "public/pexels-fauxels-3184418.jpg",
  "public/pexels-mikhail-nilov-7681302.jpg",
  "public/vitrepart2.jpg"
];

// 📂 Crée le dossier "public/optimized" s’il n’existe pas
await fs.mkdir("public/optimized", { recursive: true });

// ⚙️ Règles de redimensionnement : images lourdes redimensionnées à 800px
const resizeTargets = ["pouss.jpg", "embauche.jpg"];

for (const img of images) {
  const out = img
    .replace("public/", "public/optimized/")
    .replace(".jpg", ".webp");

  // 🔍 Si le fichier fait partie des images à redimensionner
  if (resizeTargets.some((target) => img.includes(target))) {
    await sharp(img)
      .resize(800, 600, { withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(out);
    console.log("✅ Image redimensionnée et convertie :", out);
  } else {
    // 🔸 Autres images : juste compression
    await sharp(img)
      .webp({ quality: 70 })
      .toFile(out);
    console.log("✅ Image convertie :", out);
  }
}

console.log("✨ Toutes les images ont été optimisées !");
