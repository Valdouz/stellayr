// ════════════════════════════════════════════════════════════════════════
//  CONTENU DU SITE S'TELLAYR — c'est ici qu'on met à jour le festival.
//  Modifiez les valeurs ci-dessous : le site se met à jour automatiquement.
//  (Aucune connaissance de code nécessaire — gardez juste les "guillemets".)
// ════════════════════════════════════════════════════════════════════════

export const data = {
  // ── Identité ──────────────────────────────────────────────────────────
  name: "S'TELLAYR",
  tagline: "Viens admirer les étoiles de demain.",
  edition: "1re édition",

  // ── Date & lieu ───────────────────────────────────────────────────────
  // dateISO sert au compte à rebours (format : AAAA-MM-JJTHH:MM:SS+02:00).
  dateISO: "2026-07-04T14:00:00+02:00",
  dateLabel: "Samedi 4 juillet 2026",
  timeLabel: "À partir de 14h",
  venue: "Parc de l'Europe",
  venueNote: "face à la mairie",
  city: "Épinay-sous-Sénart",
  price: "Gratuit",
  framework: "Dans le cadre de « L'Été Épinay »",
  mapUrl: "https://www.openstreetmap.org/search?query=Parc%20de%20l%27Europe%20Epinay-sous-Senart",

  // ── Présentation ──────────────────────────────────────────────────────
  intro: {
    title: "Un festival par et pour les jeunes",
    lead: "S'TELLAYR est un festival artistique imaginé pour offrir à Épinay-sous-Sénart un rendez-vous festif, ouvert et bienveillant — une scène pour les talents de demain.",
    paragraphs: [
      "Né du constat qu'il manque d'événements culturels adressés aux jeunes, S'TELLAYR rassemble musique, danse, arts visuels et mode le temps d'une journée placée sous le signe du partage et de la découverte.",
      "Le nom s'inspire du mot « stellaire » : le « S' » pour les Spinolien·ne·s, « AY » pour Épinay. Une promesse simple — un événement lumineux, marquant et accessible à toutes et tous.",
    ],
  },

  // ── Objectifs (puces courtes) ─────────────────────────────────────────
  objectives: [
    "Mettre en avant les jeunes artistes locaux et leur offrir une première scène.",
    "Valoriser les associations spinoliennes et encourager les collaborations.",
    "Renforcer l'intérêt des jeunes pour la culture et la vie locale.",
    "Faire découvrir de nouvelles disciplines artistiques.",
    "Installer un rendez-vous annuel attendu par les habitant·e·s et les artistes.",
  ],

  // ── Programme : temps forts ───────────────────────────────────────────
  highlights: [
    {
      tag: "Concours de danse",
      title: "Dancing Light",
      text: "Le grand concours de danse du festival : des crews et des solistes s'affrontent sur scène pour faire monter l'énergie.",
      icon: "spark",
    },
    {
      tag: "Scène ouverte",
      title: "Star On",
      text: "La scène ouverte où chacun·e peut venir présenter son art : chant, musique live, slam… Les étoiles de demain, c'est ici.",
      icon: "mic",
    },
    {
      tag: "Clôture festive",
      title: "DJ Set",
      text: "Pour finir la journée en beauté, le DJ set transforme le parc en piste de danse jusqu'au coucher du soleil.",
      icon: "disc",
    },
  ],

  // ── Infos pratiques (cartes) ──────────────────────────────────────────
  practical: [
    { label: "Date", value: "Samedi 4 juillet 2026", icon: "calendar" },
    { label: "Horaires", value: "À partir de 14h", icon: "clock" },
    { label: "Lieu", value: "Parc de l'Europe — Épinay-sous-Sénart", icon: "pin" },
    { label: "Tarif", value: "Gratuit, ouvert à tous", icon: "ticket" },
  ],

  // ── Partenaires ───────────────────────────────────────────────────────
  // logo : chemin vers une image (ou null pour afficher joliment le nom).
  // light : true si le logo a besoin d'un fond clair (logo sombre/coloré).
  partners: [
    { name: "Ville d'Épinay-sous-Sénart", note: "L'Été Épinay", logo: null },
    {
      name: "Flash Spectacle",
      note: "École de danse & DJ",
      logo: "assets/img/partners/flash-spectacle.png",
      light: false,
    },
    { name: "Toni'Cité", note: "Partenaire local", logo: null },
    {
      name: "Battle Style 32",
      note: "Danse hip-hop",
      logo: "assets/img/partners/battle-style-32.png",
      light: true,
    },
  ],

  // ── L'association ─────────────────────────────────────────────────────
  association: {
    name: "Association S'tellayr",
    rna: "W912017001",
    declared: "déclarée le 8 janvier 2026",
    city: "Épinay-sous-Sénart (91)",
    mission:
      "L'association S'tellayr a pour objet de valoriser les talents artistiques d'Épinay-sous-Sénart et des villes voisines, de démocratiser la vie artistique et culturelle de la ville, et de créer un événement artistique et fédérateur annuel pour les jeunes.",
  },

  // ── Contact & réseaux ─────────────────────────────────────────────────
  // TODO Akira : renseigne l'e-mail générique de l'asso et le compte Instagram.
  contact: {
    email: "contact@stellayr.fr",
    instagram: "https://instagram.com/stellayr",
    instagramLabel: "@stellayr",
  },

  // ── Technique (pied de page, SEO) ─────────────────────────────────────
  // TODO Akira : mets ton nom de domaine final (sert au partage et au référencement).
  siteUrl: "https://stellayr.fr",
  repoUrl: "https://github.com/Valdouz/stellayr",
  author: "Akira",
};

export default data;
