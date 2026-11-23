// The triads the app asks: major and minor in root position on C, D, E, F, G, A, H, B, Es and Fis, none with a double
// accidental. Shared by DreiklangLesen and DreiklangSetzen.
import { dreiklang, platz, type Schluessel, type Ton, tonAmPlatz, waehle } from "./Notenbild.ts";

/** The roots of the app, as stem tone and accidental. */
export const GRUNDTOENE: readonly Pick<Ton, "stamm" | "vz">[] = [
  { stamm: "c", vz: 0 },
  { stamm: "d", vz: 0 },
  { stamm: "e", vz: 0 },
  { stamm: "f", vz: 0 },
  { stamm: "g", vz: 0 },
  { stamm: "a", vz: 0 },
  { stamm: "h", vz: 0 },
  { stamm: "h", vz: -1 },
  { stamm: "e", vz: -1 },
  { stamm: "f", vz: 1 },
];

export interface Akkord {
  schluessel: Schluessel;
  grund: Ton;
  dur: boolean;
  toene: [Ton, Ton, Ton];
}

/** A triad whose root stands between tiefste and hoechste and whose fifth stays on the staff (at most place 12). */
export function zufallsAkkord(
  next: () => number,
  schluessel: Schluessel,
  tiefste: number,
  hoechste: number,
  nurStammtoene: boolean,
): Akkord {
  const plaetze = Array.from({ length: hoechste - tiefste + 1 }, (_, i) => tiefste + i);
  for (let versuch = 0; versuch < 50; versuch++) {
    const p = waehle(next, plaetze);
    const stamm = tonAmPlatz(p, schluessel);
    const moegliche = GRUNDTOENE.filter((g) => g.stamm === stamm.stamm && (!nurStammtoene || g.vz === 0));
    if (moegliche.length === 0) continue;
    const grund: Ton = { ...stamm, vz: waehle(next, moegliche).vz };
    const dur = next() < 0.5;
    const toene = dreiklang(grund, dur);
    if (toene && platz(toene[2], schluessel) <= 12) return { schluessel, grund, dur, toene };
  }
  const grund: Ton = { stamm: "c", vz: 0, okt: schluessel === "violin" ? 2 : 1 };
  const toene = dreiklang(grund, true) ?? [grund, grund, grund];
  return { schluessel, grund, dur: true, toene };
}
