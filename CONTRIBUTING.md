# Contribuer à S'TELLAYR

Merci de contribuer 💜 Quelques règles simples pour garder un projet propre.

## Workflow Git

- La branche **`main`** est toujours stable et déployable. **On ne pousse jamais directement dessus.**
- On travaille sur une branche dédiée, puis on ouvre une **Pull Request** :
  - `feat/<sujet>` — nouveauté (ex. `feat/billetterie`)
  - `fix/<sujet>` — correctif (ex. `fix/compte-a-rebours`)
  - `chore/<sujet>` — maintenance / contenu (ex. `chore/maj-programme`)
  - `docs/<sujet>` — documentation
- La PR n'est fusionnée que quand la **CI est verte** (lint + tests).

```bash
git checkout -b chore/maj-programme
# … modifications (souvent juste src/assets/js/data.js) …
npm run lint && npm test
git commit -m "chore(contenu): met a jour le programme"
git push -u origin chore/maj-programme
# puis ouvrir la Pull Request sur GitHub
```

## Messages de commit (format conventionnel)

`type(scope): résumé court à l'impératif` — types : `feat`, `fix`, `docs`, `refactor`, `test`,
`chore`, `perf`. Exemple : `feat(hero): ajoute le compte a rebours`.

Un sujet = un commit. Des commits petits et cohérents.

## Avant de pousser — check-list

- [ ] Aucun secret ni fichier `.env` dans le diff (`git diff --cached`).
- [ ] `npm run lint` et `npm test` **verts** en local.
- [ ] Sur une branche (pas `main`), message de commit conventionnel.
- [ ] Pas de fichier de build / dépendances / brouillon ajouté par erreur.

## Style de code

- Indentation 2 espaces, fins de ligne LF, encodage UTF-8 (voir `.editorconfig`).
- Le formatage est automatique (Prettier) ; le lint via ESLint / Stylelint / html-validate.
