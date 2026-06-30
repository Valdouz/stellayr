// Génère les images dérivées du site à partir du logo officiel S'TELLAYR :
//   - favicons (étoile blanche sur fond violet, PNG multi-tailles)
//   - image de partage Open Graph (1200x630 : logo blanc sur dégradé spectral)
//   - versions optimisées des logos partenaires (depuis references/)
//
// Usage : npm run assets
// Source du logo : src/assets/img/logo-stellayr.png (commité).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = join(root, "src", "assets", "img");
const refs = join(root, "references");
const ttfDir = join(refs, "fonts-ttf");
const logoPath = join(img, "logo-stellayr.png");

const ensureDir = (p) => mkdirSync(p, { recursive: true });

// Palette spectrale de la marque (doit rester synchro avec styles.css).
const SPECTRUM = [
  "#ff3d8b",
  "#d63cff",
  "#7b2ff7",
  "#3b6dff",
  "#14c9c0",
  "#46c66d",
  "#ff8a2a",
  "#ffc121",
];
const BRAND = "#7b2ff7";

// Inter en TTF (resvg ne lit pas le woff2) pour le texte de l'image de partage.
async function ensureInter() {
  ensureDir(ttfDir);
  const dest = join(ttfDir, "Inter.ttf");
  if (!existsSync(dest)) {
    const url = "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Téléchargement Inter échoué : ${res.status}`);
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  return [dest].filter(existsSync);
}

// --- Favicons : étoile blanche détourée sur carré violet -------------------
async function buildFavicons() {
  if (!existsSync(logoPath)) {
    console.warn("⚠  logo-stellayr.png introuvable — favicons ignorés.");
    return;
  }
  // Découpe de l'étoile (haut du lockup) puis détourage.
  const meta = await sharp(logoPath).metadata();
  const cropH = Math.round(meta.height * 0.72);
  const cropped = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .png()
    .toBuffer();
  const star = await sharp(cropped).trim({ threshold: 10 }).png().toBuffer();

  // Étoile blanche transparente (pour la navbar / accents).
  await sharp(star)
    .resize({ width: 240 })
    .png({ compressionLevel: 9 })
    .toFile(join(img, "logo-star-white.png"));
  console.log("✓ logo-star-white.png");

  const sizes = [
    ["favicon-32.png", 32],
    ["favicon-180.png", 180],
    ["icon-192.png", 192],
    ["icon-512.png", 512],
  ];
  for (const [name, size] of sizes) {
    const pad = Math.round(size * 0.16);
    const inner = await sharp(star)
      .resize({
        width: size - pad * 2,
        height: size - pad * 2,
        fit: "contain",
        background: "#00000000",
      })
      .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: BRAND } })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toFile(join(img, name));
    console.log(`✓ ${name} (${size}px)`);
  }
}

// --- Image de partage Open Graph -------------------------------------------
async function buildOgImage(fontFiles) {
  if (!existsSync(logoPath)) {
    console.warn("⚠  logo-stellayr.png introuvable — OG ignorée.");
    return;
  }
  const logo64 = readFileSync(logoPath).toString("base64");
  const lm = await sharp(logoPath).metadata();
  const lh = 360;
  const lw = Math.round((lm.width / lm.height) * lh);
  const lx = Math.round((1200 - lw) / 2);
  const stops = SPECTRUM.map(
    (c, i) => `<stop offset="${i / (SPECTRUM.length - 1)}" stop-color="${c}"/>`
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="630" x2="1200" y2="0" gradientUnits="userSpaceOnUse">${stops}</linearGradient>
      <radialGradient id="v" cx="50%" cy="42%" r="75%">
        <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#0c0a1f" stop-opacity="0.55"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect width="1200" height="630" fill="url(#v)"/>
    <image x="${lx}" y="70" width="${lw}" height="${lh}" xlink:href="data:image/png;base64,${logo64}"/>
    <text x="600" y="560" text-anchor="middle" font-family="Inter" font-weight="600" font-size="30" fill="#fff" letter-spacing="1">SAM. 4 JUILLET 2026  ·  PARC DE L'EUROPE, ÉPINAY-SOUS-SÉNART  ·  GRATUIT</text>
  </svg>`;
  const raw = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Inter" },
  })
    .render()
    .asPng();
  await sharp(raw).png({ compressionLevel: 9 }).toFile(join(img, "og-image.png"));
  console.log("✓ og-image.png (1200x630)");
}

// --- Logos partenaires (optimisation depuis references/) -------------------
async function buildPartnerLogos() {
  const partnersDir = join(img, "partners");
  ensureDir(partnersDir);
  const jobs = [
    ["partner-flash-spectacle-source.png", "flash-spectacle"],
    ["partner-epinay-source.png", "epinay"],
    ["partner-battle-style-32-source.png", "hype-kye-unity"],
  ];
  for (const [src, out] of jobs) {
    const input = join(refs, src);
    if (!existsSync(input)) {
      console.warn(`⚠  ${src} introuvable dans references/ — ignoré.`);
      continue;
    }
    // Détourage des marges transparentes pour que le logo remplisse son panneau.
    const trimmed = await sharp(input).trim({ threshold: 10 }).png().toBuffer();
    await sharp(trimmed)
      .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9, palette: true })
      .toFile(join(partnersDir, `${out}.png`));
    console.log(`✓ partenaire ${out}`);
  }
}

async function main() {
  ensureDir(img);
  const fontFiles = await ensureInter();
  await buildFavicons();
  await buildOgImage(fontFiles);
  await buildPartnerLogos();
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
