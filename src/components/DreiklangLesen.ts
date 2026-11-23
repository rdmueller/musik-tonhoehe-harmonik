// The logic of DreiklangLesen.vue: a major or minor triad on a staff; the learner names it in short form with
// buttons for the root (stem tone and accidental) and for Dur or Moll. A task is the clef and the triad; an answer is
// the short form (Fis for F-sharp major, fis for f-sharp minor). Pure functions, which the build tests over fixed seeds.
import { type Akkord, zufallsAkkord } from "./Dreiklang.ts";
import { kurzschrift, platz, platzInWorten, type Schluessel, tonname, zufall } from "./Notenbild.ts";

export interface Props {
  aufgabe: string;
  schluessel: Schluessel;
  /** The lowest and highest place the root may stand on. */
  tiefste: number;
  hoechste: number;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export type Task = Akkord;
export type Answer = string;

export function generate(seed: number, props: Props): Task {
  return zufallsAkkord(zufall(seed), props.schluessel, props.tiefste, props.hoechste, false);
}

export function solution(task: Task): Answer {
  return kurzschrift(task.grund, task.dur);
}

export function check(task: Task, answer: Answer): boolean {
  return answer === solution(task);
}

export function wrong(task: Task): Answer {
  return kurzschrift(task.grund, !task.dur);
}

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const [, terz] = task.toene;
  return [
    kurzschrift(task.grund, !task.dur),
    task.grund.vz === 0 ? undefined : kurzschrift({ ...task.grund, vz: 0 }, task.dur),
    kurzschrift(terz, task.dur),
  ];
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const liste = mistakes(task);
  const index = liste.findIndex((m) => m === answer);
  if (index >= 0) return index;
  // the root without its accidental and with the other Tongeschlecht still forgot the accidental first
  if (task.grund.vz !== 0 && answer === kurzschrift({ ...task.grund, vz: 0 }, !task.dur)) return 1;
  return undefined;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

const SCHLUESSEL = { violin: "Violinschlüssel", bass: "Bassschlüssel" } as const;
const ZEICHEN = { "-1": " mit ♭", "0": "", "1": " mit ♯" } as const;

export const notenbeschreibung = (task: Task) =>
  `${SCHLUESSEL[task.schluessel]}, drei Noten übereinander: ${task.toene
    .map((ton) => `${platzInWorten(platz(ton, task.schluessel))}${ZEICHEN[ton.vz]}`)
    .join("; ")}`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: `${props.aufgabe} (${notenbeschreibung(task)})`,
    solution: `${solution(task)}: ${task.toene.map(tonname).join(", ")}, ${task.dur ? "Dur (große Terz unten)" : "Moll (kleine Terz unten)"}`,
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
  task: "Ein Dur- oder Moll-Dreiklang in Grundstellung, drei Noten übereinander. Das Kind wählt den Grundton (Stammton und Vorzeichen) und Dur oder Moll; daraus entsteht die Kurzschrift: Großbuchstabe für Dur, Kleinbuchstabe für Moll. Dann drückt es „Prüfen“.",
  answer: "Die Kurzschrift des Dreiklangs, z. B. Fis (Fis-Dur) oder fis (fis-Moll).",
  correct: "Richtig, wenn Grundton mit Vorzeichen und Tongeschlecht stimmen.",
  mistakes: [
    "Dur und Moll verwechselt: Groß- und Kleinbuchstabe vertauscht.",
    "Das Vorzeichen des Grundtons vergessen.",
    "Den Dreiklang nach seiner Terz benannt statt nach dem untersten Ton.",
  ],
};
