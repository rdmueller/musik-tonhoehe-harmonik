import { expect, test } from "vite-plus/test";
import { HOECHSTER_PLATZ, HOEHE, platzBei, TIEFSTER_PLATZ, x, y, zeichen } from "./NotenSystem.ts";

test("every place a note may stand on lies inside the drawing", () => {
  for (let p = TIEFSTER_PLATZ; p <= HOECHSTER_PLATZ; p++) {
    expect(y(p)).toBeGreaterThan(0);
    expect(y(p)).toBeLessThan(HOEHE);
    expect(platzBei(y(p))).toBe(p);
    expect(platzBei(y(p) + 2)).toBe(p);
  }
  expect(platzBei(-50)).toBe(HOECHSTER_PLATZ);
  expect(platzBei(500)).toBe(TIEFSTER_PLATZ);
});

test("notes of a chord share their x, notes side by side do not", () => {
  expect(x(0, 3, true)).toBe(x(2, 3, true));
  expect(x(0, 2, false)).toBeLessThan(x(1, 2, false));
  expect(zeichen(1)).toBe("♯");
  expect(zeichen(-1)).toBe("♭");
  expect(zeichen(0)).toBe("♮");
});
