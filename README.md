# S'TELLAYR — site officiel du festival

Site web du festival **S'TELLAYR**, un festival artistique imaginé par et pour les jeunes
d'Épinay-sous-Sénart (danse, scène ouverte, DJ set), organisé par l'association **S'tellayr**.

> 📅 **Samedi 4 juillet 2026** · Parc de l'Europe, Épinay-sous-Sénart · dans le cadre de « L'Été Épinay »

Site **statique** (HTML / CSS / JavaScript, sans framework ni étape de build). Tout le contenu
éditable vit dans un seul fichier : [`src/assets/js/data.js`](src/assets/js/data.js).

---

## 🚀 Démarrage rapide

```bash
npm install        # installe les outils de dev (lint, tests, optimisation d'images)
npm start          # aperçu local sur http://localhost:5173
```

Le site lui-même n'a **pas besoin de build** : ce sont des fichiers statiques dans `src/`.

## 📁 Structure

```text
src/                      # le site (c'est ce dossier qui est mis en ligne)
  index.html              # page unique
  assets/
    css/styles.css        # design (couleurs, dégradé, mise en page, animations)
    js/
      data.js             # ← CONTENU À ÉDITER (dates, programme, contacts, partenaires…)
      countdown.js        # logique du compte à rebours
      main.js             # rendu du contenu + interactions
    img/                  # logo, favicon, image de partage, logos partenaires
    fonts/                # polices libres auto-hébergées (Space Grotesk, Inter, Anton — licence OFL)
tests/                    # tests automatisés (Vitest)
scripts/build-assets.mjs  # (re)génère favicon + image de partage + optimise les logos
.github/workflows/        # CI (lint + tests) et déploiement FTP vers OVH
```

## ✏️ Mettre à jour le contenu

90 % des mises à jour se font dans **`src/assets/js/data.js`** : date, lieu, programme,
e-mail de contact, réseaux sociaux, partenaires, FAQ, etc. Pas besoin de toucher au HTML.

1. Modifier `src/assets/js/data.js`.
2. Vérifier en local avec `npm start`.
3. Commiter sur une branche, ouvrir une Pull Request (voir [CONTRIBUTING.md](CONTRIBUTING.md)).
4. Une fois la PR fusionnée dans `main`, le site se déploie automatiquement.

## 🧹 Qualité (lint, format, tests)

```bash
npm run format     # formate tout le code (Prettier)
npm run lint       # Prettier + ESLint + Stylelint + html-validate
npm test           # tests (Vitest)
```

Un hook Git (Husky) formate/vérifie automatiquement les fichiers à chaque commit,
et lance les tests avant chaque `git push`.

## 🖼️ Régénérer les images

```bash
npm run assets     # recrée favicon, image Open Graph et optimise les logos partenaires
```

## 🌐 Déploiement (OVH)

Le site se déploie tout seul sur l'hébergement **OVH** à chaque push sur `main`, via
GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

**Configuration unique** — dans GitHub : `Settings → Secrets and variables → Actions`, ajouter :

| Secret           | Exemple                          |
| ---------------- | -------------------------------- |
| `FTP_SERVER`     | `ftp.cluster0XX.hosting.ovh.net` |
| `FTP_USERNAME`   | votre identifiant FTP OVH        |
| `FTP_PASSWORD`   | votre mot de passe FTP OVH       |
| `FTP_PROTOCOL`   | `ftps`                           |
| `FTP_REMOTE_DIR` | `./www/` (racine web OVH)        |

Tant que ces secrets ne sont pas définis, le déploiement est simplement ignoré (sans erreur).

**Déploiement manuel** (sans GitHub) : copier le contenu de `src/` dans le dossier `www/`
de votre espace OVH via FTP (FileZilla, ou un client de votre choix).

## 🔤 Polices & licences

Le code est sous licence **MIT** ([LICENSE](LICENSE)). Les polices (Space Grotesk, Inter, Anton) sont
sous **SIL Open Font License 1.1**, auto-hébergées dans `src/assets/fonts/` (pas de CDN tiers,
respect du RGPD). Les contenus et logos du festival restent la propriété de leurs détenteurs.

## 🙋 Crédits

Site développé par **Akira**. Contributions bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md).
