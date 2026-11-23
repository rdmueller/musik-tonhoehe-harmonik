// The logic of DreiklangSetzen.vue: the root of a triad stands on the staff; the learner adds its third and its fifth
// by tapping their places and, in the short-form mode, choosing their signs. Mode "stamm": any triad of stem tones on
// the root ("Baue auf d einen Dreiklang"). Mode "kurz": the triad of a short form, major or minor, with its signs
// ("Schreibe den Dreiklang fis"). A task is the clef, the mode and the triad; an answer is the place and sign of the
// third and of the fifth. Pure functions, which the build tests over fixed seeds.
import { type Akkord, zufallsAkkord } from "./Dreiklang.ts";
import {
  dreiklang,
  kurzschrift,
  platz,
  platzInWorten,
  type Schluessel,
  tonname,
  type Vorzeichen,
  zufall,
} from "./Notenbild.ts";

export type Modus = "stamm" | "kurz";

export interface Props {
  /** The task, with {grund} for the root's name or {kurz} for the short form. */
  aufgabe: string;
  schluessel: Schluessel;
  modus: Modus;
  /** The lowest and highest place the root may stand on. */
  tiefste: number;
  hoechste: number;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export interface Task extends Akkord {
  modus: Modus;
}

export interface Note {
  p: number;
  vz: Vorzeichen;
}

export interface Answer {
  terz: Note;
  quinte: Note;
}

export function generate(seed: number, props: Props): Task {
  const akkord = zufallsAkkord(zufall(seed), props.schluessel, props.tiefste, props.hoechste, props.modus === "stamm");
  return { ...akkord, modus: props.modus };
}

const grundPlatz = (task: Task) => platz(task.grund, task.schluessel);

export function solution(task: Task): Answer {
  const [, terz, quinte] = task.toene;
  return {
    terz: { p: platz(terz, task.schluessel), vz: task.modus === "stamm" ? 0 : terz.vz },
    quinte: { p: platz(quinte, task.schluessel), vz: task.modus === "stamm" ? 0 : quinte.vz },
  };
}

export function check(task: Task, answer: Answer): boolean {
  const p = grundPlatz(task);
  if (answer.terz.p !== p + 2 || answer.quinte.p !== p + 4) return false;
  if (task.modus === "stamm") return true;
  const loesung = solution(task);
  return answer.terz.vz === loesung.terz.vz && answer.quinte.vz === loesung.quinte.vz;
}

export function wrong(task: Task): Answer {
  const loesung = solution(task);
  return { ...loesung, terz: { ...loesung.terz, p: loesung.terz.p - 1 } };
}

/** The third of the other Tongeschlecht: its sign when the root's triad is turned from major to minor or back. */
const andereTerz = (task: Task): Note | undefined => {
  const anders = dreiklang(task.grund, !task.dur);
  return anders ? { p: platz(anders[1], task.schluessel), vz: anders[1].vz } : undefined;
};

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const loesung = solution(task);
  const terz = andereTerz(task);
  return [
    { ...loesung, terz: { ...loesung.terz, p: loesung.terz.p - 1 } },
    { ...loesung, quinte: { ...loesung.quinte, p: loesung.quinte.p - 1 } },
    task.modus === "kurz" && terz ? { ...loesung, terz } : undefined,
    task.modus === "kurz" && loesung.quinte.vz !== 0 ? { ...loesung, quinte: { ...loesung.quinte, vz: 0 } } : undefined,
  ];
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const p = grundPlatz(task);
  if (answer.terz.p === p + 1) return 0;
  if (answer.terz.p === p + 2 && (answer.quinte.p === p + 3 || answer.quinte.p === p + 5)) return 1;
  if (answer.terz.p !== p + 2 || answer.quinte.p !== p + 4) return undefined;
  const loesung = solution(task);
  if (answer.terz.vz !== loesung.terz.vz) return 2;
  if (answer.quinte.vz !== loesung.quinte.vz) return 3;
  return undefined;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

/** The task text with the root's name or the short form. */
export const aufgabeMit = (text: string, task: Task) =>
  text.replace(/\{grund\}/g, tonname(task.grund)).replace(/\{kurz\}/g, kurzschrift(task.grund, task.dur));

const SCHLUESSEL = { violin: "Violinschlüssel", bass: "Bassschlüssel" } as const;
const ZEICHEN = { "-1": ", davor ♭", "0": "", "1": ", davor ♯" } as const;

const note = (n: Note) => `${platzInWorten(n.p)}${ZEICHEN[n.vz]}`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const loesung = solution(task);
  return {
    task: `${aufgabeMit(props.aufgabe, task)} (${SCHLUESSEL[task.schluessel]}, der Grundton steht ${note({ p: grundPlatz(task), vz: task.grund.vz })})`,
    solution: `Terz ${note(loesung.terz)}, Quinte ${note(loesung.quinte)}: ${task.toene
      .map((ton, i) => tonname(task.modus === "stamm" && i > 0 ? { ...ton, vz: 0 } : ton))
      .join(", ")}`,
  };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe.replace(/\{grund\}/g, "{Grundton}").replace(/\{kurz\}/g, "{Kurzschrift}")} ({Schluessel})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return {
    Grundton: tonname(task.grund),
    Kurzschrift: kurzschrift(task.grund, task.dur),
    Schluessel: SCHLUESSEL[task.schluessel],
  };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return `Terz ${note(answer.terz)}, Quinte ${note(answer.quinte)}`;
}

export const about = {
  task: "Im Notensystem steht der Grundton eines Dreiklangs. Das Kind setzt Terz und Quinte darüber: Es wählt „Terz“ oder „Quinte“, tippt auf den Platz und wählt, wenn gefragt, das Zeichen davor (keins, ♯, ♭). Dann drückt es „Prüfen“. Bei der Kurzschrift muss der Dreiklang Dur (Großbuchstabe) oder Moll (Kleinbuchstabe) sein.",
  answer: "Platz und Zeichen der Terz und der Quinte.",
  correct:
    "Richtig, wenn die Terz zwei und die Quinte vier Plätze über dem Grundton steht, bei der Kurzschrift mit den Zeichen des verlangten Dur- oder Moll-Dreiklangs.",
  mistakes: [
    "Eine Sekunde statt der Terz gesetzt: zu nah am Grundton.",
    "Eine Quarte oder Sexte statt der Quinte gesetzt.",
    "Dur und Moll vertauscht: die Terz mit dem falschen Zeichen.",
    "Das Zeichen der Quinte vergessen.",
  ],
};
