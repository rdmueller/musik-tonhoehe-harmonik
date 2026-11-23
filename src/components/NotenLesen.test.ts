import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./NotenLesen.ts";

const props = {
  aufgabe: "Wie heißt dieser Ton?",
  schluessel: "violin" as const,
  tiefste: -4,
  hoechste: 10,
  vorzeichen: true,
  oktave: true,
  mistakes: ["Schlüssel", "Vorzeichen", "Oktave", "Nachbar"],
};

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const variante of [props, { ...props, schluessel: "bass" as const, vorzeichen: false, oktave: false }]) {
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

test("a note in the violin clef read as in the bass clef is a third off", () => {
  const task = {
    schluessel: "violin" as const,
    ton: { stamm: "g" as const, vz: 0 as const, okt: 2 as const },
    oktave: true,
  };
  expect(solution(task)).toBe("g¹");
  expect(reason(task, "h", props)).toBe("Schlüssel");
  expect(reason(task, "g²", props)).toBe("Oktave");
  expect(reason(task, "gis¹", props)).toBe("Vorzeichen");
  expect(reason(task, "a¹", props)).toBe("Nachbar");
  expect(reason(task, "d¹", props)).toBeUndefined();
  expect(describe(task, props, "de")).toEqual({
    task: "Wie heißt dieser Ton? (Violinschlüssel, eine Note: 2. Linie)",
    solution: "g¹ (eingestrichene Oktave)",
  });
});

test("without the octave the name alone counts", () => {
  const task = {
    schluessel: "bass" as const,
    ton: { stamm: "f" as const, vz: 1 as const, okt: 1 as const },
    oktave: false,
  };
  expect(check(task, "fis")).toBe(true);
  expect(check(task, "f")).toBe(false);
  expect(fehler(task, "f")).toBe(1);
});
