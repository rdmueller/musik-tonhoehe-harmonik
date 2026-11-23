// The geometry of a staff drawn as SVG: where a place of the staff lies, where a note stands, the paths of the
// clefs. Pure functions, used by NotenSystem.vue.

/** The width and height of the drawing. */
export const BREITE = 240;
export const HOEHE = 132;

/** The y of the bottom line; one place (line to space) is half a line distance higher. */
export const LINIE_0 = 90;
export const HALBER_ABSTAND = 6;

/** The lowest and the highest place a note may stand on: three ledger lines below and above. */
export const TIEFSTER_PLATZ = -6;
export const HOECHSTER_PLATZ = 14;

/** The y of a place: 0 the bottom line, 8 the top line. */
export const y = (p: number) => LINIE_0 - p * HALBER_ABSTAND;

/** The x of the n-th of several notes side by side, or of every note of a chord. */
export const x = (n: number, anzahl: number, akkord: boolean) =>
  akkord || anzahl <= 1 ? 140 : anzahl <= 3 ? 110 + n * 50 : 66 + n * Math.min(40, 140 / (anzahl - 1));

/** The places of the five lines. */
export const LINIEN = [0, 2, 4, 6, 8];

/** The violin clef: a spiral around the 2nd line. */
export const VIOLINSCHLUESSEL =
  "M24,80 C18,80 17,72 23,70 C31,68 33,82 25,86 C15,90 9,80 12,70 C15,60 26,52 28,40 C30,30 26,24 23,28 C19,34 21,56 24,86 C25,96 24,104 18,102 C14,100 15,95 19,95";

/** The bass clef: a curve from the 4th line, its dot on the line; two dots around the 4th line. */
export const BASSSCHLUESSEL = "M11,54 C11,43 33,41 33,56 C33,72 22,84 9,90";
export const BASS_PUNKTE = [
  { cx: 39, cy: 48 },
  { cx: 39, cy: 60 },
];

/** The sign of an accidental. */
export const zeichen = (vz: number) => (vz === 1 ? "♯" : vz === -1 ? "♭" : "♮");

/** The places a tap can choose, from the lowest to the highest. */
export const PLAETZE = Array.from({ length: HOECHSTER_PLATZ - TIEFSTER_PLATZ + 1 }, (_, i) => TIEFSTER_PLATZ + i);

/** The place nearest to a y of the drawing, within the places a note may stand on. */
export const platzBei = (yy: number) =>
  Math.min(HOECHSTER_PLATZ, Math.max(TIEFSTER_PLATZ, Math.round((LINIE_0 - yy) / HALBER_ABSTAND))) + 0;
