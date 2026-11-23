// The logic of NotenLesen.vue: a note on a staff, which the learner names with buttons for stem tone, accidental
// and, if asked, octave. A task is the clef, the tone and whether the octave counts; an answer is the German name
// (fis, or fis¹ with the octave). Pure functions, which the build tests over fixed seeds (the exercise contract).
import {
  grundname,
  type Oktave,
  OKTAVNAMEN,
  platz,
  platzInWorten,
  type Schluessel,
  STAMMTOENE,
  type Ton,
  tonAmPlatz,
  tonname,
  zufall,
  zufallsTon,
} from "./Notenbild.ts";

export interface Props {
  /** The task, e.g. "Wie heißt dieser Ton?". */
  aufgabe: string;
  schluessel: Schluessel;
  /** The lowest and highest place a note may stand on: 0 the bottom line, 8 the top line, -2 the 1st ledger line below. */
  tiefste: number;
  hoechste: number;
  /** Whether the notes carry a sharp or a flat. */
  vorzeichen: boolean;
  /** Whether the name must give the octave (c¹) or only the tone (c). */
  oktave: boolean;
  /** The app's message for each typical mistake, in the order of about.mistakes, with {loesung} never used. */
  mistakes: string[];
}

export interface Task {
  schluessel: Schluessel;
  ton: Ton;
  oktave: boolean;
}

/** The German name, with the octave if the task asks for it. */
export type Answer = string;

/** The name of a tone as the task wants it. */
export const name = (ton: Ton, oktave: boolean) => (oktave ? tonname(ton) : grundname(ton.stamm, ton.vz));

/** The task of a seed: a tone within the places of the props. */
export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  return {
    schluessel: props.schluessel,
    ton: zufallsTon(next, props.schluessel, props.tiefste, props.hoechste, props.vorzeichen),
    oktave: props.oktave,
  };
}

/** Whether the answer names the tone shown. */
export function check(task: Task, answer: Answer): boolean {
  return answer === name(task.ton, task.oktave);
}

export function solution(task: Task): Answer {
  return name(task.ton, task.oktave);
}

/** The tone one step higher, without an accidental: the neighbour on the staff. */
const nachbar = (task: Task): Ton => tonAmPlatz(platz(task.ton, task.schluessel) + 1, task.schluessel);

/** The tone at the same place, read in the other clef. */
const andererSchluessel = (task: Task): Ton => ({
  ...tonAmPlatz(platz(task.ton, task.schluessel), task.schluessel === "violin" ? "bass" : "violin"),
  vz: task.ton.vz,
});

export function wrong(task: Task): Answer {
  return name(nachbar(task), task.oktave);
}

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const { ton, oktave } = task;
  const andereOktave = { ...ton, okt: (ton.okt === 3 ? 2 : ton.okt + 1) as Oktave };
  return [
    name(andererSchluessel(task), oktave),
    ton.vz === 0 ? undefined : name({ ...ton, vz: 0 }, oktave),
    oktave ? tonname(andereOktave) : undefined,
    name(nachbar(task), oktave),
  ];
}

/** Every tone the buttons can give, by its name: for reading an answer back. */
function lesen(answer: Answer, oktave: boolean): Ton | undefined {
  for (const okt of [0, 1, 2, 3] as const)
    for (const stamm of STAMMTOENE)
      for (const vz of [-1, 0, 1] as const) {
        const ton = { stamm, vz, okt };
        if (name(ton, oktave) === answer) return ton;
      }
  return undefined;
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const gelesen = lesen(answer, task.oktave);
  if (!gelesen) return undefined;
  const { ton } = task;
  if (gelesen.stamm === ton.stamm && gelesen.vz === ton.vz) return task.oktave ? 2 : undefined;
  if (gelesen.stamm === ton.stamm) return 1;
  if (gelesen.stamm === andererSchluessel(task).stamm) return 0;
  const abstand = Math.abs(STAMMTOENE.indexOf(gelesen.stamm) - STAMMTOENE.indexOf(ton.stamm));
  if (abstand === 1 || abstand === 6) return 3;
  return undefined;
}

/** The app's message for a wrong answer: that of its typical mistake, or none. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

const SCHLUESSEL = { violin: "Violinschlüssel", bass: "Bassschlüssel" } as const;
const ZEICHEN = { "-1": " mit ♭ davor", "0": "", "1": " mit ♯ davor" } as const;

/** The note in words: where it stands and what is in front of it. */
export const notenbeschreibung = (task: Task) =>
  `${SCHLUESSEL[task.schluessel]}, eine Note: ${platzInWorten(platz(task.ton, task.schluessel))}${ZEICHEN[task.ton.vz]}`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: `${props.aufgabe} (${notenbeschreibung(task)})`,
    solution: `${solution(task)}${task.oktave ? ` (${OKTAVNAMEN[task.ton.okt]})` : ""}`,
  };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe} ({Note})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Note: notenbeschreibung(task) };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return answer;
}

export const about = {
  task: "Ein Notensystem mit Schlüssel und einer Note. Das Kind benennt den Ton mit Knöpfen: Stammton, Vorzeichen und, wenn verlangt, die Oktavlage, und drückt „Prüfen“.",
  answer: "Der deutsche Tonname, z. B. fis oder mit Oktavlage fis¹.",
  correct: "Richtig, wenn der Name genau den gezeigten Ton nennt, mit Vorzeichen und, wenn verlangt, mit Oktavlage.",
  mistakes: [
    "Den Ton im anderen Schlüssel gelesen: eine Terz daneben.",
    "Das Vorzeichen übersehen.",
    "Die Oktavlage falsch angegeben.",
    "Linie und Zwischenraum verwechselt: den Nachbarton genannt.",
  ],
};
