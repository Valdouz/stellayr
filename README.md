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
.github/workflows/        # CI (lint + tests) et déploiement (rsync vers le serveur)
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

## 🌐 Déploiement (serveur « canada » + Cloudflare)

Le site est statique : on publie le contenu de `src/` sur le serveur, servi derrière
**Cloudflare** (DNS + HTTPS).

**Méthode simple — depuis ta machine (recommandée).** Copier `.env.example` en `.env`,
remplir (hôte, utilisateur, dossier web), puis :

```bash
npm run deploy   # lint + tests, puis rsync de src/ vers le serveur (via SSH/Tailscale)
```

**Méthode automatique — GitHub Actions** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) :
déploie à chaque push sur `main`. Secrets à définir dans
`GitHub → Settings → Secrets and variables → Actions` :

| Secret                                        | Rôle                                                             |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `DEPLOY_HOST` / `DEPLOY_USER` / `DEPLOY_PATH` | cible rsync (ex. `100.65.165.9` / `akira` / `/var/www/stellayr`) |
| `DEPLOY_SSH_KEY`                              | clé privée SSH autorisée sur le serveur                          |
| `TS_OAUTH_CLIENT_ID` / `TS_OAUTH_SECRET`      | OAuth Tailscale (le runner rejoint le tailnet)                   |

Tant que ces secrets ne sont pas définis, le job est simplement ignoré (sans erreur).

## 🔤 Polices & licences

Le code est sous licence **MIT** ([LICENSE](LICENSE)). Les polices (Space Grotesk, Inter, Anton) sont
sous **SIL Open Font License 1.1**, auto-hébergées dans `src/assets/fonts/` (pas de CDN tiers,
respect du RGPD). Les contenus et logos du festival restent la propriété de leurs détenteurs.

## 🙋 Crédits

Site développé par **Akira**. Contributions bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md).
