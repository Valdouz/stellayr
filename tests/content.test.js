import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { data } from "../src/assets/js/data.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "src", "index.html"), "utf8");
const dataSrc = readFileSync(join(root, "src", "assets", "js", "data.js"), "utf8");

describe("data.js — contenu", () => {
  it("expose les champs essentiels", () => {
    expect(data.name).toBe("S'TELLAYR");
    expect(data.venue).toMatch(/Parc de l'Europe/);
    expect(data.city).toMatch(/Épinay-sous-Sénart/);
    expect(data.author).toBe("Akira");
    expect(data.repoUrl).toContain("github.com");
  });

  it("a une date de festival valide (4 juillet 2026)", () => {
    const d = new Date(data.dateISO);
    expect(Number.isNaN(d.getTime())).toBe(false);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(6); // juillet
    expect(d.getUTCDate()).toBe(4);
  });

  it("contient le programme et au moins un partenaire et une info pratique", () => {
    expect(data.highlights.length).toBe(3);
    expect(data.practical.length).toBeGreaterThan(0);
    expect(data.partners.length).toBeGreaterThan(0);
    expect(data.contact.email).toContain("@");
  });
});

describe("index.html — structure", () => {
  it("contient toutes les sections clés", () => {
    for (const id of [
      "festival",
      "programme",
      "infos",
      "venir",
      "partenaires",
      "asso",
      "contact",
    ]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("crédite Akira et pointe vers le dépôt GitHub", () => {
    expect(html).toContain("Akira");
    expect(html).toContain("github.com/Valdouz/stellayr");
  });

  it("inclut le compte à rebours et le module principal", () => {
    expect(html).toContain('id="countdown"');
    expect(html).toContain('data-cd="days"');
    expect(html).toContain("assets/js/main.js");
  });
});

describe("confidentialité", () => {
  it("ne divulgue pas d'e-mails personnels ni d'adresse résidentielle", () => {
    const haystack = `${html}\n${dataSrc}`;
    expect(haystack).not.toMatch(/gmail\.com/i);
    expect(haystack).not.toMatch(/outlook\.(com|fr)/i);
    expect(haystack).not.toMatch(/Villa\s+L[ée]onard/i);
  });
});
