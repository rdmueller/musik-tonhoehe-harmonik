// The geometry of a piano keyboard drawn as SVG: its keys with their German names and their numbers of semitones
// above the große C, the octave ranges below it, and arcs that count semitones. Pure functions, used by Klaviatur.vue.
import { grundname, type Oktave, OKTAVNAMEN, STAMMTOENE, tonname } from "./Notenbild.ts";

export const WEISS_BREITE = 24;
export const WEISS_HOEHE = 100;
export const SCHWARZ_BREITE = 14;
export const SCHWARZ_HOEHE = 62;
/** Space above the keys for arcs, below them for the octave names. */
export const OBEN = 26;
export const UNTEN = 22;

/** The semitones of each white key above its c. */
const WEISS = [0, 2, 4, 5, 7, 9, 11];
/** The white keys after which a black key follows: c, d, f, g, a. */
const MIT_SCHWARZ = [0, 1, 3, 4, 5];

export interface Taste {
  halbton: number;
  weiss: boolean;
  x: number;
  name: string;
}

/** The keys of `oktaven` octaves from the c of octave `start` (0 große, 1 kleine, 2 eingestrichene, 3 zweigestrichene). */
export function tasten(start: number, oktaven: number, be: boolean): Taste[] {
  const liste: Taste[] = [];
  for (let o = 0; o < oktaven; o++) {
    const okt = (start + o) as Oktave;
    STAMMTOENE.forEach((stamm, i) => {
      const x = (o * 7 + i) * WEISS_BREITE;
      liste.push({ halbton: okt * 12 + (WEISS[i] ?? 0), weiss: true, x, name: tonname({ stamm, vz: 0, okt }) });
      if (MIT_SCHWARZ.includes(i)) {
        const oben = be ? STAMMTOENE[i + 1] : stamm;
        const name = tonname({ stamm: oben ?? stamm, vz: be ? -1 : 1, okt });
        liste.push({
          halbton: okt * 12 + (WEISS[i] ?? 0) + 1,
          weiss: false,
          x: x + WEISS_BREITE - SCHWARZ_BREITE / 2,
          name,
        });
      }
    });
  }
  return liste;
}

/** The width of the drawing. */
export const breite = (oktaven: number) => oktaven * 7 * WEISS_BREITE;
export const HOEHE = OBEN + WEISS_HOEHE + UNTEN;

/** The middle of a key, for the arcs. */
export function mitte(liste: Taste[], halbton: number): number | undefined {
  const taste = liste.find((t) => t.halbton === halbton);
  if (!taste) return undefined;
  return taste.x + (taste.weiss ? WEISS_BREITE : SCHWARZ_BREITE) / 2;
}

/** The names of the octaves shown. */
export const bereiche = (start: number, oktaven: number) =>
  Array.from({ length: oktaven }, (_, o) => ({
    x: o * 7 * WEISS_BREITE,
    text: OKTAVNAMEN[start + o] ?? "",
  }));

/** A key name without octave mark, for short labels. */
export const kurzname = grundname;
