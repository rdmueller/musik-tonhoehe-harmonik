import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./NotenSetzen.ts";

const props = {
  aufgabe: "Schreibe {ton}.",
  schluessel: "violin" as const,
  tiefste: -4,
  hoechste: 10,
  vorzeichen: true,
  mistakes: ["Schlüssel", "Vorzeichen", "Oktave", "Nachbar", "Enharmonisch"],
};

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const variante of [props, { ...props, schluessel: "bass" as const, vorzeichen: false }]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      mistakes(task).forEach((answer, index) => {
        if (answer === undefined) return;
        expect(check(task, answer)).toBe(false);
        expect(fehler(task, answer)).toBe(index);
      });
    }
  }
});

test("fis¹ is written in the 1st space with a sharp; ges¹ and the place of the bass clef are named mistakes", () => {
  const task = { schluessel: "violin" as const, ton: { stamm: "f" as const, vz: 1 as const, okt: 2 as const } };
  expect(solution(task)).toEqual({ p: 1, vz: 1 });
  expect(reason(task, { p: 1, vz: 0 }, props)).toBe("Vorzeichen");
  expect(reason(task, { p: 2, vz: -1 }, props)).toBe("Enharmonisch");
  expect(reason(task, { p: 8, vz: 1 }, props)).toBe("Oktave");
  expect(reason(task, { p: -1, vz: 1 }, props)).toBe("Schlüssel");
  expect(reason(task, { p: 0, vz: 1 }, props)).toBe("Nachbar");
  expect(describe(task, props, "de")).toEqual({
    task: "Schreibe fis¹. (leeres Notensystem mit Violinschlüssel)",
    solution: "Zwischenraum über der 1. Linie, davor ♯",
  });
});
