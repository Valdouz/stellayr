#!/usr/bin/env bash
# Déploie le site : le serveur (canada) héberge un clone du dépôt et sert src/.
# Ce script déclenche une mise à jour immédiate (git pull) sur le serveur via SSH.
# (Sinon, le serveur se met à jour tout seul via un cron `git pull` — voir README.)
#
# Config : copier .env.example -> .env et remplir. Usage : npm run deploy
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

: "${DEPLOY_HOST:?Définis DEPLOY_HOST dans .env (ex: 100.65.165.9)}"
: "${DEPLOY_USER:?Définis DEPLOY_USER dans .env (ex: akira)}"
: "${DEPLOY_PATH:?Définis DEPLOY_PATH dans .env (chemin du clone sur le serveur, ex: /home/akira/sites/stellayr)}"

echo "→ Vérifications locales (lint + tests)…"
npm run lint
npm test

echo "→ git pull sur ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}…"
# shellcheck disable=SC2029
ssh ${DEPLOY_SSH_OPTS:-} "${DEPLOY_USER}@${DEPLOY_HOST}" \
  "git -C '${DEPLOY_PATH}' pull --ff-only"

echo "✓ Déployé (le serveur sert la dernière version)."
