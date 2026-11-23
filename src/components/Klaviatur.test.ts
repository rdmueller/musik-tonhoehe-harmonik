import { expect, test } from "vite-plus/test";
import { bereiche, mitte, tasten } from "./Klaviatur.ts";

test("one octave has 7 white and 5 black keys with German names", () => {
  const liste = tasten(2, 1, false);
  expect(liste.filter((t) => t.weiss).map((t) => t.name)).toEqual(["c¹", "d¹", "e¹", "f¹", "g¹", "a¹", "h¹"]);
  expect(liste.filter((t) => !t.weiss).map((t) => t.name)).toEqual(["cis¹", "dis¹", "fis¹", "gis¹", "ais¹"]);
  expect(
    tasten(1, 1, true)
      .filter((t) => !t.weiss)
      .map((t) => t.name),
  ).toEqual(["des", "es", "ges", "as", "b"]);
});

test("e–f and h–c have no black key between them: one semitone", () => {
  const liste = tasten(1, 2, false).sort((a, b) => a.halbton - b.halbton);
  const e = liste.find((t) => t.name === "e");
  const f = liste.find((t) => t.name === "f");
  expect((f?.halbton ?? 0) - (e?.halbton ?? 0)).toBe(1);
  expect(liste.find((t) => t.name === "c¹")?.halbton).toBe(24);
  expect(mitte(liste, 24)).toBeGreaterThan(mitte(liste, 23) ?? 0);
  expect(mitte(liste, 99)).toBeUndefined();
  expect(bereiche(1, 2).map((b) => b.text)).toEqual(["kleine Oktave", "eingestrichene Oktave"]);
});
