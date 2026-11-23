// The logic of NotenSetzen.vue: the learner writes a named tone on an empty staff, by tapping its line or space
// and choosing the sign in front. A task is the clef and the tone; an answer is the place (0 the bottom line,
// 1 the space above it, …) and the accidental. Pure functions, which the build tests over fixed seeds.
import {
  halbton,
  platz,
  platzInWorten,
  type Schluessel,
  type Ton,
  tonAmPlatz,
  tonname,
  ueblich,
  type Vorzeichen,
  zufall,
  zufallsTon,
} from "./Notenbild.ts";
import { HOECHSTER_PLATZ, TIEFSTER_PLATZ } from "./NotenSystem.ts";

export interface Props {
  /** The task with {ton} for the name of the tone, e.g. "Schreibe {ton}.". */
  aufgabe: string;
  schluessel: Schluessel;
  /** The lowest and highest place the tone may stand on. */
  tiefste: number;
  hoechste: number;
  /** Whether the tone carries a sharp or a flat. */
  vorzeichen: boolean;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export interface Task {
  schluessel: Schluessel;
  ton: Ton;
}

export interface Answer {
  p: number;
  vz: Vorzeichen;
}

export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  return {
    schluessel: props.schluessel,
    ton: zufallsTon(next, props.schluessel, props.tiefste, props.hoechste, props.vorzeichen),
  };
}

export function check(task: Task, answer: Answer): boolean {
  return answer.p === platz(task.ton, task.schluessel) && answer.vz === task.ton.vz;
}

export function solution(task: Task): Answer {
  return { p: platz(task.ton, task.schluessel), vz: task.ton.vz };
}

export function wrong(task: Task): Answer {
  return { p: platz(task.ton, task.schluessel) + 1, vz: task.ton.vz };
}

const imSystem = (p: number) => p >= TIEFSTER_PLATZ && p <= HOECHSTER_PLATZ;
const anderer = (schluessel: Schluessel): Schluessel => (schluessel === "violin" ? "bass" : "violin");

/** Whether a place holds the stem tone of the task when read in the other clef. */
const imAnderenSchluessel = (task: Task, p: number) => tonAmPlatz(p, anderer(task.schluessel)).stamm === task.ton.stamm;

/** The tone of an answer. */
const tonDer = (task: Task, answer: Answer): Ton => tonAmPlatz(answer.p, task.schluessel, answer.vz);

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const { p, vz } = solution(task);
  const naechste = [-2, 2, -5, 5, -9, 9].map((d) => p + d).find((q) => imSystem(q) && imAnderenSchluessel(task, q));
  const oktave = [p + 7, p - 7].find(imSystem);
  const enharmonisch = (): Answer | undefined => {
    if (vz === 0) return undefined;
    const q = p + vz;
    const nachbar = tonAmPlatz(q, task.schluessel);
    const anders = -vz as Vorzeichen;
    return ueblich(nachbar.stamm, anders) && halbton({ ...nachbar, vz: anders }) === halbton(task.ton)
      ? { p: q, vz: anders }
      : undefined;
  };
  return [
    naechste === undefined ? undefined : { p: naechste, vz },
    vz === 0 ? undefined : { p, vz: 0 },
    oktave === undefined ? undefined : { p: oktave, vz },
    { p: p + 1, vz },
    enharmonisch(),
  ];
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const p = platz(task.ton, task.schluessel);
  if (answer.p === p) return 1;
  if (Math.abs(answer.p - p) === 1 && halbton(tonDer(task, answer)) === halbton(task.ton)) return 4;
  if (imAnderenSchluessel(task, answer.p)) return 0;
  if (Math.abs(answer.p - p) === 7) return 2;
  if (Math.abs(answer.p - p) === 1) return 3;
  return undefined;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

/** The task text with the name of the tone. */
export const aufgabeMit = (text: string, task: Task) => text.replace(/\{ton\}/g, tonname(task.ton));

const SCHLUESSEL = { violin: "Violinschlüssel", bass: "Bassschlüssel" } as const;
const ZEICHEN = { "-1": ", davor ♭", "0": "", "1": ", davor ♯" } as const;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const loesung = solution(task);
  return {
    task: `${aufgabeMit(props.aufgabe, task)} (leeres Notensystem mit ${SCHLUESSEL[task.schluessel]})`,
    solution: `${platzInWorten(loesung.p)}${ZEICHEN[loesung.vz]}`,
  };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe.replace(/\{ton\}/g, "{Ton}")} ({Schluessel})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Ton: tonname(task.ton), Schluessel: SCHLUESSEL[task.schluessel] };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return `${platzInWorten(answer.p)}${ZEICHEN[answer.vz]}`;
}

export const about = {
  task: "Ein leeres Notensystem mit Schlüssel. Das Kind schreibt den genannten Ton: Es tippt auf die Linie oder den Zwischenraum, wählt das Zeichen davor (keins, ♯, ♭) und drückt „Prüfen“.",
  answer: "Der Platz der Note im System (Linie oder Zwischenraum) und das Zeichen davor.",
  correct: "Richtig, wenn die Note genau auf dem Platz des Tons steht und das richtige Zeichen davor hat.",
  mistakes: [
    "Den Platz aus dem anderen Schlüssel genommen: eine Terz daneben.",
    "Das Vorzeichen vergessen oder das falsche gesetzt.",
    "Eine Oktave zu hoch oder zu tief geschrieben.",
    "Linie und Zwischenraum verwechselt: den Nachbarplatz genommen.",
    "Den gleich klingenden Ton mit anderem Namen geschrieben (ges statt fis).",
  ],
};
