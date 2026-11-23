import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./DreiklangSetzen.ts";

const props = {
  aufgabe: "Schreibe den Dreiklang {kurz}.",
  schluessel: "violin" as const,
  modus: "kurz" as const,
  tiefste: -2,
  hoechste: 6,
  mistakes: ["Sekunde", "Quinte", "Dur/Moll", "Zeichen der Quinte"],
};

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const variante of [
    props,
    { ...props, modus: "stamm" as const },
    { ...props, schluessel: "bass" as const, tiefste: -4 },
  ]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      if (variante.modus === "stamm") expect(task.grund.vz).toBe(0);
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

test("H major needs dis and fis; in the stem mode any third and fifth on their places count", () => {
  const h = { stamm: "h" as const, vz: 0 as const, okt: 1 as const };
  const dis = { stamm: "d" as const, vz: 1 as const, okt: 2 as const };
  const fis = { stamm: "f" as const, vz: 1 as const, okt: 2 as const };
  const task = {
    schluessel: "violin" as const,
    modus: "kurz" as const,
    grund: h,
    dur: true,
    toene: [h, dis, fis] as [typeof h, typeof dis, typeof fis],
  };
  expect(solution(task)).toEqual({ terz: { p: -1, vz: 1 }, quinte: { p: 1, vz: 1 } });
  expect(reason(task, { terz: { p: -1, vz: 0 }, quinte: { p: 1, vz: 1 } }, props)).toBe("Dur/Moll");
  expect(reason(task, { terz: { p: -1, vz: 1 }, quinte: { p: 1, vz: 0 } }, props)).toBe("Zeichen der Quinte");
  expect(reason(task, { terz: { p: -2, vz: 0 }, quinte: { p: 1, vz: 1 } }, props)).toBe("Sekunde");
  expect(reason(task, { terz: { p: -1, vz: 1 }, quinte: { p: 0, vz: 0 } }, props)).toBe("Quinte");
  expect(describe(task, props, "de").task).toBe(
    "Schreibe den Dreiklang H. (Violinschlüssel, der Grundton steht unter der 1. Hilfslinie unten)",
  );
  const stamm = { ...task, modus: "stamm" as const };
  expect(check(stamm, { terz: { p: -1, vz: 0 }, quinte: { p: 1, vz: 0 } })).toBe(true);
});
