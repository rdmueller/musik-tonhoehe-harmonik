// The logic of IntervallLesen.vue: two notes one after the other on a staff; the learner names the interval with a
// button. "grob" asks the number of steps (Prime to Oktave), "fein" a second or a third exactly (kleine or große).
// A task is the clef, the kind and the two tones; an answer is the name of the interval. Pure functions, which the
// build tests over fixed seeds.
import {
  feinname,
  halbtonAbstand,
  INTERVALLE,
  platz,
  platzInWorten,
  type Schluessel,
  STAMMTOENE,
  stufe,
  stufenzahl,
  type Ton,
  tonAmPlatz,
  tonDarueber,
  tonname,
  ueblich,
  waehle,
  zufall,
  zufallsTon,
} from "./Notenbild.ts";

export type Art = "grob" | "fein";

/** The answers of a fine task, in the order of the buttons. */
export const FEIN = ["kleine Sekunde", "große Sekunde", "kleine Terz", "große Terz"] as const;

export interface Props {
  aufgabe: string;
  schluessel: Schluessel;
  art: Art;
  /** The lowest and highest place the lower note may stand on. */
  tiefste: number;
  hoechste: number;
  /** Whether the notes may carry a sharp or a flat. */
  vorzeichen: boolean;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export interface Task {
  schluessel: Schluessel;
  art: Art;
  unten: Ton;
  oben: Ton;
}

export type Answer = string;

/** The names a learner chooses from. */
export const antworten = (art: Art): readonly string[] => (art === "grob" ? INTERVALLE : FEIN);

export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  const { schluessel, art } = props;
  if (art === "grob") {
    const stufen = 1 + Math.floor(next() * 8);
    const unten = zufallsTon(next, schluessel, props.tiefste, props.hoechste, props.vorzeichen && next() < 0.5);
    const stamm = tonAmPlatz(platz(unten, schluessel) + stufen - 1, schluessel);
    const moegliche = ([0, 1, -1] as const)
      .filter((vz) => props.vorzeichen || vz === 0)
      .filter((vz) => ueblich(stamm.stamm, vz));
    const oben = { ...stamm, vz: stufen === 1 ? unten.vz : waehle(next, moegliche) };
    return { schluessel, art, unten, oben };
  }
  // fine: a second or a third whose upper tone needs no unusual accidental; drawn until one fits
  for (let versuch = 0; versuch < 50; versuch++) {
    const unten = zufallsTon(next, schluessel, props.tiefste, props.hoechste, props.vorzeichen && next() < 0.5);
    const [stufen, ht] = waehle(next, [
      [2, 1],
      [2, 2],
      [3, 3],
      [3, 4],
    ] as const);
    const oben = tonDarueber(unten, stufen, ht);
    if (!oben || !ueblich(oben.stamm, oben.vz)) continue;
    if (!props.vorzeichen && oben.vz !== 0) continue;
    return { schluessel, art, unten, oben };
  }
  const unten = tonAmPlatz(props.tiefste, schluessel);
  return { schluessel, art, unten, oben: tonAmPlatz(props.tiefste + 2, schluessel) };
}

export function solution(task: Task): Answer {
  if (task.art === "grob") return INTERVALLE[stufenzahl(task.unten, task.oben) - 1] ?? "";
  return feinname(task.unten, task.oben) ?? "";
}

export function check(task: Task, answer: Answer): boolean {
  return answer === solution(task);
}

/** Whether a half-tone step between white keys, e–f or h–c, lies within the interval. */
export function mitHalbtonStammschritt(task: Task): boolean {
  for (let n = stufe(task.unten); n < stufe(task.oben); n++) {
    const stamm = STAMMTOENE[n % 7];
    if (stamm === "e" || stamm === "h") return true;
  }
  return false;
}

const mitVorzeichen = (task: Task) => task.unten.vz !== 0 || task.oben.vz !== 0;

/** The other quality of the same size: kleine for große and the other way round. */
const andereGroesse = (name: string) => FEIN[FEIN.indexOf(name as (typeof FEIN)[number]) ^ 1] ?? "";
/** The same quality of the other size: Terz for Sekunde and the other way round. */
const andereStufe = (name: string) => FEIN[FEIN.indexOf(name as (typeof FEIN)[number]) ^ 2] ?? "";

export function wrong(task: Task): Answer {
  const loesung = solution(task);
  if (task.art === "grob")
    return INTERVALLE[(INTERVALLE.indexOf(loesung as (typeof INTERVALLE)[number]) + 1) % 8] ?? "";
  return andereGroesse(loesung);
}

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const loesung = solution(task);
  if (task.art === "grob") {
    const s = stufenzahl(task.unten, task.oben);
    return [INTERVALLE[s - 2], INTERVALLE[s], undefined, undefined, undefined, undefined];
  }
  const halbtonschritt = mitHalbtonStammschritt(task);
  const vz = mitVorzeichen(task);
  return [
    undefined,
    undefined,
    halbtonschritt && !vz ? andereGroesse(loesung) : undefined,
    vz ? andereGroesse(loesung) : undefined,
    andereStufe(loesung),
    !halbtonschritt && !vz ? andereGroesse(loesung) : undefined,
  ];
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const index = mistakes(task).findIndex((m) => m === answer);
  return index < 0 ? undefined : index;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

const SCHLUESSEL = { violin: "Violinschlüssel", bass: "Bassschlüssel" } as const;
const ZEICHEN = { "-1": " mit ♭", "0": "", "1": " mit ♯" } as const;

/** The two notes in words. */
export const notenbeschreibung = (task: Task) =>
  `${SCHLUESSEL[task.schluessel]}, zwei Noten nacheinander: ${platzInWorten(platz(task.unten, task.schluessel))}${
    ZEICHEN[task.unten.vz]
  }, dann ${platzInWorten(platz(task.oben, task.schluessel))}${ZEICHEN[task.oben.vz]}`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const ht = halbtonAbstand(task.unten, task.oben);
  return {
    task: `${props.aufgabe} (${notenbeschreibung(task)})`,
    solution:
      task.art === "grob"
        ? `${solution(task)}: ${tonname(task.unten)} bis ${tonname(task.oben)}, ${stufenzahl(task.unten, task.oben)} Stammtöne mitgezählt`
        : `${solution(task)}: ${tonname(task.unten)} bis ${tonname(task.oben)}, ${ht} Halbtonschritte`,
  };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe} ({Noten})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Noten: notenbeschreibung(task) };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return answer;
}

export const about = {
  task: "Zwei Noten nacheinander in einem Notensystem. Das Kind bestimmt das Intervall: grob (Prime bis Oktave, Stammtöne abzählen, beide Töne mitgezählt) oder fein (kleine oder große Sekunde oder Terz, Halbtonschritte abzählen), wählt den Namen mit einem Knopf und drückt „Prüfen“.",
  answer: "Der Name des Intervalls, z. B. Terz oder kleine Terz.",
  correct: "Richtig, wenn der Name genau das Intervall vom unteren zum oberen Ton nennt.",
  mistakes: [
    "Grob: den Startton nicht mitgezählt, ein Intervall zu klein.",
    "Grob: einen Ton zu viel gezählt, ein Intervall zu groß.",
    "Fein: den Halbtonschritt e–f oder h–c als Ganztonschritt gezählt.",
    "Fein: ein Vorzeichen nicht beachtet.",
    "Fein: Sekunde und Terz verwechselt.",
    "Fein: groß und klein verwechselt.",
  ],
};
