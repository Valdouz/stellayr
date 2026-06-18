// Logique pure du compte à rebours (sans DOM) — testable de façon isolée.

/**
 * Calcule le temps restant entre `nowMs` et `targetMs`.
 * @param {number} targetMs - date cible (timestamp en ms)
 * @param {number} [nowMs=Date.now()] - instant courant (timestamp en ms)
 * @returns {{total:number, days:number, hours:number, minutes:number, seconds:number, isPast:boolean}}
 */
export function getTimeRemaining(targetMs, nowMs = Date.now()) {
  const total = Math.max(0, targetMs - nowMs);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds, isPast: targetMs <= nowMs };
}

/** Ajoute un zéro devant les nombres < 10 (ex. 7 -> "07"). */
export function pad2(value) {
  return String(value).padStart(2, "0");
}
