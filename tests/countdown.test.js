import { describe, it, expect } from "vitest";
import { getTimeRemaining, pad2 } from "../src/assets/js/countdown.js";

describe("getTimeRemaining", () => {
  it("décompose correctement une durée future", () => {
    const now = Date.UTC(2026, 0, 1, 0, 0, 0);
    const target = now + ((2 * 24 + 3) * 60 * 60 + 4 * 60 + 5) * 1000; // 2j 3h 4m 5s
    const r = getTimeRemaining(target, now);
    expect(r).toMatchObject({ days: 2, hours: 3, minutes: 4, seconds: 5, isPast: false });
    expect(r.total).toBeGreaterThan(0);
  });

  it("renvoie zéro et isPast lorsque la cible est dépassée", () => {
    const now = Date.UTC(2026, 6, 5, 0, 0, 0);
    const target = Date.UTC(2026, 6, 4, 14, 0, 0);
    const r = getTimeRemaining(target, now);
    expect(r.total).toBe(0);
    expect(r).toMatchObject({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
  });

  it("traite l'instant exact comme passé", () => {
    const t = Date.UTC(2026, 6, 4, 14, 0, 0);
    expect(getTimeRemaining(t, t).isPast).toBe(true);
  });
});

describe("pad2", () => {
  it("ajoute un zéro devant les nombres < 10", () => {
    expect(pad2(7)).toBe("07");
    expect(pad2(0)).toBe("00");
    expect(pad2(42)).toBe("42");
  });
});
