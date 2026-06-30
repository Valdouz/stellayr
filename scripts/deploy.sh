#!/usr/bin/env bash
# Déploie le site (contenu de src/) vers le serveur via rsync over SSH.
# Lit la config depuis .env (copie .env.example -> .env et remplis).
#
# Usage : npm run deploy
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Charge .env si présent
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

: "${DEPLOY_HOST:?Définis DEPLOY_HOST dans .env (ex: 100.65.165.9 ou canada)}"
: "${DEPLOY_USER:?Définis DEPLOY_USER dans .env (ex: akira)}"
: "${DEPLOY_PATH:?Définis DEPLOY_PATH dans .env (ex: /var/www/stellayr)}"

echo "→ Vérifications locales (lint + tests)…"
npm run lint
npm test

echo "→ Déploiement de src/ vers ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}…"
rsync -az --delete \
  --exclude ".DS_Store" --exclude "Thumbs.db" \
  -e "ssh ${DEPLOY_SSH_OPTS:-}" \
  src/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "✓ Déployé."
