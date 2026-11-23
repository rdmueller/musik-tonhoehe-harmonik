import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./IntervallLesen.ts";
import { feinname } from "./Notenbild.ts";

const grob = {
  aufgabe: "Welches Intervall ist das?",
  schluessel: "violin" as const,
  art: "grob" as const,
  tiefste: -2,
  hoechste: 4,
  vorzeichen: false,
  mistakes: ["Startton", "zu viel", "e–f", "Vorzeichen", "Stufe", "groß/klein"],
};
const fein = { ...grob, art: "fein" as const, vorzeichen: true };

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const props of [grob, fein, { ...fein, vorzeichen: false, schluessel: "bass" as const }]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, props);
      expect(solution(task)).not.toBe("");
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      mistakes(task).forEach((answer, index) => {
        if (answer === undefined) return;
        expect(check(task, answer)).toBe(false);
        expect(fehler(task, answer)).toBe(index);
      });
      if (props.art === "fein") expect(feinname(task.unten, task.oben)).toBeDefined();
      if (!props.vorzeichen) expect([task.unten.vz, task.oben.vz]).toEqual([0, 0]);
    }
  }
});

test("g¹ to h¹ is a Terz; e¹ to g¹ a kleine Terz, because of e–f", () => {
  const g = { stamm: "g" as const, vz: 0 as const, okt: 2 as const };
  const h = { stamm: "h" as const, vz: 0 as const, okt: 2 as const };
  const terz = { schluessel: "violin" as const, art: "grob" as const, unten: g, oben: h };
  expect(solution(terz)).toBe("Terz");
  expect(reason(terz, "Sekunde", grob)).toBe("Startton");
  expect(reason(terz, "Quarte", grob)).toBe("zu viel");
  const e = { stamm: "e" as const, vz: 0 as const, okt: 2 as const };
  const klein = { schluessel: "violin" as const, art: "fein" as const, unten: e, oben: g };
  expect(solution(klein)).toBe("kleine Terz");
  expect(reason(klein, "große Terz", fein)).toBe("e–f");
  expect(reason(klein, "kleine Sekunde", fein)).toBe("Stufe");
  const fis = { stamm: "f" as const, vz: 1 as const, okt: 2 as const };
  const vz = { schluessel: "violin" as const, art: "fein" as const, unten: e, oben: fis };
  expect(solution(vz)).toBe("große Sekunde");
  expect(reason(vz, "kleine Sekunde", fein)).toBe("Vorzeichen");
  expect(describe(klein, fein, "de").solution).toBe("kleine Terz: e¹ bis g¹, 3 Halbtonschritte");
});
