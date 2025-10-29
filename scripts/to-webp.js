// scripts/to-webp.mjs
import fs from "node:fs/promises";
import sharp from "sharp";
import path from "node:path";

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
  "public/vitrepart2.jpg",
];

// 📂 Crée le dossier "public/optimized" s’il n’existe pas
await fs.mkdir("public/optimized", { recursive: true });

// ⚙️ Règles spéciales : certaines images sont réduites davantage
const resizeTargets = ["pouss.jpg", "embauche.jpg"];

// Fonction utilitaire pour obtenir la taille en Ko
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(1) + " Ko";
  } catch {
    return "N/A";
  }
}

console.log("\n🚀 Début de l’optimisation des images...\n");

for (const img of images) {
  const filename = path.basename(img);
  const out = img
    .replace("public/", "public/optimized/")
    .replace(".jpg", ".webp");

  const beforeSize = await getFileSize(img);

  const isSmallResize = resizeTargets.some((target) => img.includes(target));

  // 🔧 Applique redimensionnement ou compression selon le cas
  const sharpInstance = sharp(img);

  if (isSmallResize) {
    await sharpInstance
      .resize(800, 600, { withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(out);
  } else {
    await sharpInstance
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 65 })
      .toFile(out);
  }

  const afterSize = await getFileSize(out);

  console.log(
    `✅ ${filename.padEnd(45)} → avant : ${beforeSize.padStart(8)} | après : ${afterSize.padStart(8)}`
  );
}

console.log("\n✨ Optimisation terminée avec succès !\n");
