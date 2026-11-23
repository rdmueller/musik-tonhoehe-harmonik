import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./DreiklangLesen.ts";
import { platz } from "./Notenbild.ts";

const props = {
  aufgabe: "Wie heißt der Dreiklang in Kurzschrift?",
  schluessel: "violin" as const,
  tiefste: -2,
  hoechste: 6,
  mistakes: ["Dur/Moll", "Vorzeichen", "Terz"],
};

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const variante of [props, { ...props, schluessel: "bass" as const, tiefste: -4, hoechste: 6 }]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      expect(platz(task.toene[2], task.schluessel)).toBeLessThanOrEqual(12);
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

test("d¹ fis¹ a¹ is D; the lower case, F and fis are named mistakes", () => {
  const d = { stamm: "d" as const, vz: 0 as const, okt: 2 as const };
  const fis = { stamm: "f" as const, vz: 1 as const, okt: 2 as const };
  const a = { stamm: "a" as const, vz: 0 as const, okt: 2 as const };
  const task = {
    schluessel: "violin" as const,
    grund: d,
    dur: true,
    toene: [d, fis, a] as [typeof d, typeof fis, typeof a],
  };
  expect(solution(task)).toBe("D");
  expect(reason(task, "d", props)).toBe("Dur/Moll");
  expect(reason(task, "Fis", props)).toBe("Terz");
  expect(describe(task, props, "de").solution).toBe("D: d¹, fis¹, a¹, Dur (große Terz unten)");
  const fisMoll = { ...task, grund: fis, dur: false };
  expect(solution(fisMoll)).toBe("fis");
  expect(reason(fisMoll, "f", props)).toBe("Vorzeichen");
  expect(reason(fisMoll, "F", props)).toBe("Vorzeichen");
});
