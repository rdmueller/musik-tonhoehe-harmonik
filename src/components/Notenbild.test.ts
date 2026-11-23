import { expect, test } from "vite-plus/test";
import {
  dreiklang,
  feinname,
  grundname,
  halbton,
  hilfslinien,
  kurzschrift,
  platz,
  platzInWorten,
  stufenzahl,
  tonAmPlatz,
  tonname,
} from "./Notenbild.ts";

test("German names with octave marks", () => {
  expect(tonname({ stamm: "c", vz: 0, okt: 0 })).toBe("C");
  expect(tonname({ stamm: "c", vz: 0, okt: 1 })).toBe("c");
  expect(tonname({ stamm: "f", vz: 1, okt: 2 })).toBe("fis¹");
  expect(tonname({ stamm: "h", vz: -1, okt: 3 })).toBe("b²");
  expect(tonname({ stamm: "e", vz: -1, okt: 0 })).toBe("Es");
  expect(grundname("a", -1)).toBe("as");
  expect(grundname("d", -1)).toBe("des");
});

test("the clefs fix g¹ on the 2nd line and the kleine f on the 4th line; c¹ lies between both staves", () => {
  expect(platz({ stamm: "g", okt: 2 }, "violin")).toBe(2);
  expect(platz({ stamm: "f", okt: 1 }, "bass")).toBe(6);
  expect(platz({ stamm: "c", okt: 2 }, "violin")).toBe(-2);
  expect(platz({ stamm: "c", okt: 2 }, "bass")).toBe(10);
  expect(tonname(tonAmPlatz(0, "violin"))).toBe("e¹");
  expect(tonname(tonAmPlatz(8, "violin"))).toBe("f²");
  expect(tonname(tonAmPlatz(0, "bass"))).toBe("G");
  expect(tonname(tonAmPlatz(8, "bass"))).toBe("a");
});

test("ledger lines and places in words", () => {
  expect(hilfslinien(-2)).toEqual([-2]);
  expect(hilfslinien(-3)).toEqual([-2]);
  expect(hilfslinien(-4)).toEqual([-2, -4]);
  expect(hilfslinien(10)).toEqual([10]);
  expect(hilfslinien(4)).toEqual([]);
  expect(platzInWorten(4)).toBe("3. Linie");
  expect(platzInWorten(3)).toBe("Zwischenraum über der 2. Linie");
  expect(platzInWorten(-1)).toBe("unter der 1. Linie");
  expect(platzInWorten(-2)).toBe("1. Hilfslinie unten");
  expect(platzInWorten(-3)).toBe("unter der 1. Hilfslinie unten");
  expect(platzInWorten(9)).toBe("über der 5. Linie");
  expect(platzInWorten(12)).toBe("2. Hilfslinie oben");
});

test("semitones, intervals, triads", () => {
  expect(halbton({ stamm: "f", vz: 0, okt: 2 }) - halbton({ stamm: "e", vz: 0, okt: 2 })).toBe(1);
  expect(stufenzahl({ stamm: "g", vz: 0, okt: 2 }, { stamm: "h", vz: 0, okt: 2 })).toBe(3);
  expect(feinname({ stamm: "e", vz: 0, okt: 2 }, { stamm: "f", vz: 0, okt: 2 })).toBe("kleine Sekunde");
  expect(feinname({ stamm: "e", vz: 0, okt: 2 }, { stamm: "f", vz: 1, okt: 2 })).toBe("große Sekunde");
  expect(feinname({ stamm: "d", vz: 0, okt: 2 }, { stamm: "f", vz: 0, okt: 2 })).toBe("kleine Terz");
  expect(feinname({ stamm: "c", vz: 0, okt: 2 }, { stamm: "e", vz: 0, okt: 2 })).toBe("große Terz");
  expect(dreiklang({ stamm: "d", vz: 0, okt: 2 }, true)?.map(tonname)).toEqual(["d¹", "fis¹", "a¹"]);
  expect(dreiklang({ stamm: "h", vz: 0, okt: 1 }, false)?.map(tonname)).toEqual(["h", "d¹", "fis¹"]);
  expect(dreiklang({ stamm: "e", vz: -1, okt: 1 }, false)?.map(tonname)).toEqual(["es", "ges", "b"]);
  expect(kurzschrift({ stamm: "f", vz: 1 }, true)).toBe("Fis");
  expect(kurzschrift({ stamm: "f", vz: 1 }, false)).toBe("fis");
  expect(kurzschrift({ stamm: "h", vz: -1 }, true)).toBe("B");
});
