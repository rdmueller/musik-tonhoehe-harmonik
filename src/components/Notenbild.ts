// The music logic shared by the note components: a tone as stem tone, accidental and octave; its German name with
// the octave mark (C, c, c¹, c²); its place on the staff of a clef; its number of semitones; intervals and triads.
// Pure functions, no view.

/** The stem tones in order, as German names. */
export const STAMMTOENE = ["c", "d", "e", "f", "g", "a", "h"] as const;
export type Stammton = (typeof STAMMTOENE)[number];

/** -1 flat, 0 none, 1 sharp. */
export type Vorzeichen = -1 | 0 | 1;

/** The octaves of the app: 0 große, 1 kleine, 2 eingestrichene, 3 zweigestrichene Oktave. */
export type Oktave = 0 | 1 | 2 | 3;

export interface Ton {
  stamm: Stammton;
  vz: Vorzeichen;
  okt: Oktave;
}

export type Schluessel = "violin" | "bass";

/** The semitones of each stem tone above c. */
const HALBTOENE = [0, 2, 4, 5, 7, 9, 11];

/** The step of a stem tone within its octave, 0 for c. */
export const stufeImOktav = (stamm: Stammton) => STAMMTOENE.indexOf(stamm);

/** The diatonic number of a tone: 0 is the große C, one more per stem tone. */
export const stufe = (ton: Pick<Ton, "stamm" | "okt">) => ton.okt * 7 + stufeImOktav(ton.stamm);

/** The tone of a diatonic number, with an accidental. */
export function tonAusStufe(n: number, vz: Vorzeichen = 0): Ton {
  const okt = Math.floor(n / 7);
  const stamm = STAMMTOENE[((n % 7) + 7) % 7] ?? "c";
  return { stamm, vz, okt: okt as Oktave };
}

/** The number of semitones above the große C. */
export const halbton = (ton: Ton) => ton.okt * 12 + (HALBTOENE[stufeImOktav(ton.stamm)] ?? 0) + ton.vz;

/** The German name of a stem tone with its accidental, in lower case: fis, es, b. */
export function grundname(stamm: Stammton, vz: Vorzeichen): string {
  if (vz === 1) return `${stamm}is`;
  if (vz === -1) {
    if (stamm === "h") return "b";
    if (stamm === "e" || stamm === "a") return `${stamm}s`;
    return `${stamm}es`;
  }
  return stamm;
}

const gross = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

/** The German name with the octave: Fis, fis, fis¹, fis². */
export function tonname(ton: Ton): string {
  const name = grundname(ton.stamm, ton.vz);
  if (ton.okt === 0) return gross(name);
  if (ton.okt === 1) return name;
  return `${name}${ton.okt === 2 ? "¹" : "²"}`;
}

/** The names of the octaves, as the app writes them. */
export const OKTAVNAMEN = ["große Oktave", "kleine Oktave", "eingestrichene Oktave", "zweigestrichene Oktave"] as const;

/** The diatonic number of the bottom line of a clef: e¹ for the violin clef, the große G for the bass clef. */
export const UNTERSTE_LINIE: Record<Schluessel, number> = { violin: 16, bass: 4 };

/** The place of a tone on the staff: 0 the bottom line, 1 the space above it, 2 the 2nd line, … 8 the 5th line. */
export const platz = (ton: Pick<Ton, "stamm" | "okt">, schluessel: Schluessel) =>
  stufe(ton) - UNTERSTE_LINIE[schluessel];

/** The tone at a place of the staff. */
export const tonAmPlatz = (p: number, schluessel: Schluessel, vz: Vorzeichen = 0) =>
  tonAusStufe(p + UNTERSTE_LINIE[schluessel], vz);

/** The ledger lines a note at place p needs, as places. */
export function hilfslinien(p: number): number[] {
  const linien: number[] = [];
  for (let q = -2; q >= p; q -= 2) linien.push(q);
  for (let q = 10; q <= p; q += 2) linien.push(q);
  return linien;
}

/** The place in words, for screen readers: "3. Linie", "Zwischenraum über der 2. Linie", "1. Hilfslinie unten". */
export function platzInWorten(p: number): string {
  if (p >= 0 && p <= 8) return p % 2 === 0 ? `${p / 2 + 1}. Linie` : `Zwischenraum über der ${(p - 1) / 2 + 1}. Linie`;
  if (p < 0) {
    if (p % 2 === 0) return `${-p / 2}. Hilfslinie unten`;
    return p === -1 ? "unter der 1. Linie" : `unter der ${(-p - 1) / 2}. Hilfslinie unten`;
  }
  if (p % 2 === 0) return `${(p - 8) / 2}. Hilfslinie oben`;
  return p === 9 ? "über der 5. Linie" : `über der ${(p - 9) / 2}. Hilfslinie oben`;
}

/** Whether a stem tone takes this accidental in the app: no eis, his, ces, fes (rare, and confusing here). */
export const ueblich = (stamm: Stammton, vz: Vorzeichen) =>
  !(vz === 1 && (stamm === "e" || stamm === "h")) && !(vz === -1 && (stamm === "c" || stamm === "f"));

/** A small seeded random generator (mulberry32). */
export function zufall(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One element of a list, drawn. */
export const waehle = <T>(next: () => number, liste: readonly T[]): T => {
  const element = liste[Math.floor(next() * liste.length)];
  if (element === undefined) throw new Error("empty list");
  return element;
};

/** A tone at a place between tiefste and hoechste, with an accidental where vorzeichen allows. */
export function zufallsTon(
  next: () => number,
  schluessel: Schluessel,
  tiefste: number,
  hoechste: number,
  vorzeichen: boolean,
): Ton {
  const p = tiefste + Math.floor(next() * (hoechste - tiefste + 1));
  const ton = tonAmPlatz(p, schluessel);
  if (!vorzeichen) return ton;
  const moegliche = ([1, -1] as const).filter((vz) => ueblich(ton.stamm, vz));
  return { ...ton, vz: waehle(next, moegliche) };
}

/** The interval names by number of steps, 1 Prime to 8 Oktave. */
export const INTERVALLE = ["Prime", "Sekunde", "Terz", "Quarte", "Quinte", "Sexte", "Septime", "Oktave"] as const;

/** The number of steps from unten to oben, both counted: 1 for a Prime, 3 for a Terz. */
export const stufenzahl = (unten: Ton, oben: Ton) => stufe(oben) - stufe(unten) + 1;

/** The semitones from unten to oben. */
export const halbtonAbstand = (unten: Ton, oben: Ton) => halbton(oben) - halbton(unten);

/** The fine name of a second or a third, or undefined for another interval or size. */
export function feinname(unten: Ton, oben: Ton): string | undefined {
  const stufen = stufenzahl(unten, oben);
  const ht = halbtonAbstand(unten, oben);
  if (stufen === 2 && ht === 1) return "kleine Sekunde";
  if (stufen === 2 && ht === 2) return "große Sekunde";
  if (stufen === 3 && ht === 3) return "kleine Terz";
  if (stufen === 3 && ht === 4) return "große Terz";
  return undefined;
}

/** The tone a number of steps above, whose accidental makes the interval exactly ht semitones wide, if one fits. */
export function tonDarueber(unten: Ton, stufen: number, ht: number): Ton | undefined {
  const stamm = tonAusStufe(stufe(unten) + stufen - 1);
  const vz = ht - halbtonAbstand(unten, stamm);
  if (vz < -1 || vz > 1) return undefined;
  return { ...stamm, vz: vz as Vorzeichen };
}

/** The triad on a root, major or minor: root, third, fifth; undefined if a tone needs a double accidental. */
export function dreiklang(grund: Ton, dur: boolean): [Ton, Ton, Ton] | undefined {
  const terz = tonDarueber(grund, 3, dur ? 4 : 3);
  const quinte = tonDarueber(grund, 5, 7);
  if (!terz || !quinte) return undefined;
  return [grund, terz, quinte];
}

/** The short form of a triad: upper case for major (Fis), lower case for minor (fis). */
export const kurzschrift = (grund: Pick<Ton, "stamm" | "vz">, dur: boolean) => {
  const name = grundname(grund.stamm, grund.vz);
  return dur ? gross(name) : name;
};
