import { data } from "./data.js";
import { getTimeRemaining, pad2 } from "./countdown.js";

// ── Petites icônes en ligne (SVG) ─────────────────────────────────────────
const icons = {
  spark: '<path d="M12 2l2.4 6.4L21 11l-6.6 2.6L12 20l-2.4-6.4L3 11l6.6-2.6z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  ticket:
    '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M15 6v12"/>',
};

const svgIcon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;

// ── Résolution de chemins "a.b.c" dans l'objet data ───────────────────────
function resolve(path) {
  return path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), data);
}

function bindTexts() {
  document.querySelectorAll("[data-text]").forEach((el) => {
    const value = resolve(el.dataset.text);
    if (value != null) el.textContent = value;
  });
}

function bindHrefs() {
  document.querySelectorAll("[data-href]").forEach((el) => {
    const value = resolve(el.dataset.href);
    if (value != null) el.setAttribute("href", value);
  });
}

// ── Rendus de listes ──────────────────────────────────────────────────────
function renderHighlights() {
  const root = document.getElementById("highlights");
  if (!root) return;
  root.innerHTML = data.highlights
    .map(
      (h, i) => `
      <article class="card reveal" style="--i:${i}">
        <span class="card__icon">${svgIcon(h.icon)}</span>
        <p class="card__tag">${h.tag}</p>
        <h3 class="card__title">${h.title}</h3>
        <p class="card__text">${h.text}</p>
      </article>`
    )
    .join("");
}

function renderObjectives() {
  const root = document.getElementById("objectives");
  if (!root) return;
  root.innerHTML = data.objectives
    .map(
      (o) => `<li class="bullet"><span class="bullet__star" aria-hidden="true">★</span>${o}</li>`
    )
    .join("");
}

function renderPractical() {
  const root = document.getElementById("practical");
  if (!root) return;
  root.innerHTML = data.practical
    .map(
      (p, i) => `
      <div class="info reveal" style="--i:${i}">
        <span class="info__icon">${svgIcon(p.icon)}</span>
        <div><p class="info__label">${p.label}</p><p class="info__value">${p.value}</p></div>
      </div>`
    )
    .join("");
}

function renderPartners() {
  const root = document.getElementById("partners");
  if (!root) return;
  root.innerHTML = data.partners
    .map((p) => {
      const inner = p.logo
        ? `<span class="partner__logo${p.light ? " partner__logo--light" : ""}"><img src="${p.logo}" alt="${p.name}" loading="lazy" /></span>`
        : `<span class="partner__name">${p.name}</span>`;
      return `<li class="partner" title="${p.name}">${inner}${
        p.note ? `<span class="partner__note">${p.note}</span>` : ""
      }</li>`;
    })
    .join("");
}

// ── Compte à rebours ───────────────────────────────────────────────────────
function initCountdown() {
  const root = document.getElementById("countdown");
  if (!root) return;
  const target = new Date(data.dateISO).getTime();
  const fields = {
    days: root.querySelector('[data-cd="days"]'),
    hours: root.querySelector('[data-cd="hours"]'),
    minutes: root.querySelector('[data-cd="minutes"]'),
    seconds: root.querySelector('[data-cd="seconds"]'),
  };

  const tick = () => {
    const t = getTimeRemaining(target);
    if (fields.days) fields.days.textContent = String(t.days);
    if (fields.hours) fields.hours.textContent = pad2(t.hours);
    if (fields.minutes) fields.minutes.textContent = pad2(t.minutes);
    if (fields.seconds) fields.seconds.textContent = pad2(t.seconds);
    if (t.isPast) {
      root.classList.add("is-live");
      const live = document.getElementById("countdown-live");
      if (live) live.hidden = false;
    }
  };

  tick();
  setInterval(tick, 1000);
}

// ── Navigation mobile ───────────────────────────────────────────────────────
function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  const header = document.querySelector(".nav");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}

// ── Apparitions au défilement ────────────────────────────────────────────────
function initReveals() {
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

function setContactEmail() {
  const el = document.getElementById("contact-email");
  if (el && data.contact?.email) el.setAttribute("href", `mailto:${data.contact.email}`);
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

// ── Initialisation ───────────────────────────────────────────────────────────
function init() {
  bindTexts();
  bindHrefs();
  renderHighlights();
  renderObjectives();
  renderPractical();
  renderPartners();
  initCountdown();
  initNav();
  initReveals();
  setContactEmail();
  setYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
