---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: musiklehre, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

Lernende der 8. Klasse üben Töne im Violin- und Bassschlüssel, Intervalle und Dur- und Moll-Dreiklänge: Sie lesen
und schreiben Noten, bestimmen Intervalle grob und fein und schreiben Dreiklänge in Kurzschrift. Ein Probetest am Ende
zeigt, welches Thema für die Lernkontrolle schon sitzt.

## Key decisions

- Archetyp `explainer`: Die Lernenden brauchen kurze Erklärseiten (Regeln zum Abzählen, Kurzschrift, Orchester) und
  danach viele Aufgaben mit neuen Tönen bei jedem Durchgang. Die Selbsteinschätzung je Kapitel und für die ganze App
  dient als Probetest. Noten im System zeigen und Noten setzen leisten Vue-Komponenten. `quiz` scheidet aus: keine
  neu gezogenen Aufgaben, keine Erklärseiten, kein Notensetzen. `interactive` scheidet aus: eine einzige Seite ohne
  Erklärungen und ohne Selbsteinschätzung; ein Trainer wäre möglich, die Wiederholung der Regeln aber nicht.
- Strang `musik/tonhoehe-harmonik`, Themen 1–4; Notation und Orchesteraufbau in einer zweiten App (Antwort „C“).
- Reihenfolge im Kapitel `toene`: `notensystem`, `oktavlagen`, `noten-benennen`, … – `oktavlagen` vor `noten-benennen` (beide Schritt 5 der Karte), weil das Benennen die Oktavlagen braucht (Befund des Lernenden-Checks).
- Kein `scope`: keine `open-task`, und die App folgt keinem Material des Erstellers (structure.md, „scope“).
- Name `musiklehre` statt `musik-lernkontrolle`: Der Name beschreibt den Inhalt, nicht den Anlass. Klasse, Schulform
  und Land stehen im Katalogeintrag (`grades`) und auf der Lernlandkarte, nicht im Namen.

## Notes

### Lernlandkarte Musik (https://lernapps.net/apps/map/musik.json, gelesen 2026-11-23)

Der Inhalt kommt vom Ersteller (Themenliste der Lernkontrolle). Abgedeckte Kompetenzen der Karte:

| Thema der Lernkontrolle | Kompetenzen (Strang, Richtstufe, Schritt) |
|---|---|
| 1. Töne in Violin- und Bassschlüssel, Vorzeichen, Oktavlagen | `notensystem` (tonhoehe-harmonik, 5-6, 4), `noten-benennen` (5-6, 5), `oktave` (5-6, 5), `bassschluessel` (5-6, 6), `vorzeichen-lesen` (5-6, 6) |
| 2. Intervalle Grobbestimmung | `intervall-benennen` (tonhoehe-harmonik, 5-6, 5) |
| 3. Intervalle Feinbestimmung (gr./kl. Sekunde, gr./kl. Terz) | `intervall-qualitaet` (tonhoehe-harmonik, 5-6, 6), Voraussetzung `halbtonschritte` (5-6, 5) |
| 4. Dreiklänge bestimmen und schreiben, Kurzschrift | `dreiklang` (tonhoehe-harmonik, 5-6, 6), `dreiklangsarten` (5-6, 9) |
| 5. Notation | noch offen, was gemeint ist; Kandidaten: `notenwerte-erkennen`, `pausen-kennen`, `punktierung`, `notenwerte-im-takt` (rhythmus-takt, 5-6) |
| 6. Orchesteraufbau | `instrumentenfamilien` (klang, 5-6, 3), `ensembles-besetzungen` (klang, 5-6, 4); die Sitzordnung im Orchester steht nicht auf der Karte |

- Alle Kompetenzen liegen auf der Karte in der Richtstufe 5-6, die Lernkontrolle ist in Klasse 8. Die App ist damit
  eine Festigung und Wiederholung, keine Einführung.
- Keine der Kompetenzen hat auf der Karte eine übende App (`practisedBy` leer), auch nicht durch „Musik erleben“.
- Hessen-Gymnasium-Lehrplan für Musik gibt es auf der Karte nicht (`curricula` leer).

### Wie die Lernenden üben (Skill `lernapps-exercise-patterns`; kein Musik-Verweis, nächster: Mathematik)

- Töne benennen (erkennen): Note im Violin- oder Bassschlüssel gezeigt, Name mit Oktavlage eingeben oder wählen
  (z. B. „fis¹“). Jede Aufgabe zieht einen neuen Ton. Typische Fehler: Schlüssel verwechselt (Bass wie Violin
  gelesen, Terz daneben), Vorzeichen übersehen, Oktavlage falsch.
- Töne schreiben: Name gegeben, Note ins System setzen (Komponente).
- Intervall grob: zwei Noten gezeigt, Stammtöne abzählen, Intervallname wählen. Typischer Fehler: nur die Zwischenräume
  gezählt (Terz als Sekunde), Starttton nicht mitgezählt.
- Intervall fein (Sekunde, Terz): Halbtonschritte auf der Klaviatur abzählen, groß oder klein wählen. Typischer Fehler:
  Vorzeichen nicht beachtet; e–f und h–c als Ganzton gezählt.
- Dreiklänge: Dreiklang gezeigt, Grundton und Tongeschlecht bestimmen und in Kurzschrift angeben (C = Dur, c = Moll);
  umgekehrt Kurzschrift gegeben, Dreiklang ins System setzen. Typischer Fehler: große und kleine Terz vertauscht.
- Notation und Orchester: Zuordnen, Auswahl und Reihenfolge (Notenwerte, Instrumente zu Familien, Sitzplätze).
- Probetest: Selbsteinschätzung der App über alle Kapitel, ohne „Prüfen“ nach jeder Aufgabe, Auswertung am Ende.

### Strang und Kompetenzen nach Kapiteln

Strang: `musik/tonhoehe-harmonik` („Tonhöhe, Tonleitern und Harmonik“). Kompetenzen und „Ich kann …“-Sätze wörtlich
von der Karte; Reihenfolge nach `requires`.

**Kapitel 1 – Töne lesen und schreiben**
- Wiederholung am Kapitelanfang („Das brauchst du hier“): `klaviatur-tasten` – Ich kann die Tasten der Klaviatur
  benennen und das C finden.
- `notensystem` – Ich kann das Notensystem mit seinen fünf Linien und den Violinschlüssel beschreiben.
- `noten-benennen` – Ich kann Noten auf Linien, in Zwischenräumen und auf Hilfslinien erkennen und mit ihrem Namen
  benennen.
- `oktave` – Ich kann Oktaven auf der Klaviatur finden und Töne mit gleichem Namen in verschiedenen Oktaven benennen.
  (In der App: Oktavlagen große bis zweigestrichene Oktave.)
- `bassschluessel` – Ich kann den Bassschlüssel lesen und die Noten darin benennen.
- `halbtonschritte` – Ich kann Halbtonschritte auf der Klaviatur abzählen. (Steht hier, weil `vorzeichen-lesen` es
  voraussetzt.)
- `vorzeichen-lesen` – Ich kann Kreuz, b und Auflösungszeichen lesen und erhöhte oder erniedrigte Töne spielen.
  (In der App: benennen und schreiben statt spielen.)

**Kapitel 2 – Intervalle bestimmen**
- Wiederholung am Kapitelanfang: `intervall-hoeren` – Ich kann hören und beschreiben, ob eine Melodie einen Ton
  wiederholt, in Schritten geht oder springt. (Ohne Ton: als Schritt und Sprung im Notenbild.)
- `intervall-benennen` – Ich kann den Abstand zwischen zwei Tönen abzählen und mit dem Namen des Intervalls benennen.
  (Grobbestimmung, Prime bis Oktave.)
- `intervall-qualitaet` – Ich kann Intervalle bis zur Oktave genau bestimmen: rein, groß oder klein. (Feinbestimmung,
  in dieser Version nur große und kleine Sekunde, große und kleine Terz.)

**Kapitel 3 – Dreiklänge**
- Wiederholung am Kapitelanfang: `moll-aufbau` – Ich kann erklären, worin sich der Aufbau von Moll von Dur
  unterscheidet.
- `dreiklang` – Ich kann einen Dreiklang aus Grundton, Terz und Quinte aufbauen.
- `dreiklangsarten` – Ich kann Dur- und Moll-Dreiklänge hören, aufbauen und unterscheiden. (In der App: bestimmen und
  schreiben, mit Kurzschrift; Hören fällt weg.)

**Probetest:** Selbsteinschätzung der App über alle drei Kapitel.

Lehrplan: nicht nötig, die App hat einen Strang (Skill `lernapps-content-research`, Abschnitt 3).

### Didaktik je Kompetenz (herleiten statt ablesen; welchen Fehler die Rückmeldung abfängt)

- `notensystem`: Linien und Zwischenräume von unten zählen, der Violinschlüssel legt g¹ auf die 2. Linie fest; daraus
  die anderen Töne abzählen. Fehler: Linien von oben gezählt.
- `noten-benennen`: Von g¹ (Violin) aus stufenweise abzählen, Hilfslinien ober- und unterhalb. Fehler: Ton auf der
  Linie mit dem Zwischenraum darüber verwechselt.
- `oktave`: Klaviatur mit beschrifteten Oktavbereichen; c¹ ist das C in der Mitte, auf der ersten Hilfslinie unter dem
  Violin- und über dem Bassschlüssel. Fehler: c¹ und c² verwechselt, Großbuchstabe für kleine Oktave.
- `bassschluessel`: Der Bassschlüssel legt das kleine f auf die 4. Linie (zwischen den zwei Punkten); von dort
  abzählen. Fehler: Bassnoten wie im Violinschlüssel gelesen (eine Terz zu hoch benannt, z. B. Linie G als h).
- `halbtonschritte`: Tasten auf der Klaviatur abzählen, schwarze Tasten mitzählen; e–f und h–c ohne schwarze Taste
  dazwischen. Fehler: e–f und h–c als Ganzton gezählt.
- `vorzeichen-lesen`: Kreuz erhöht um einen Halbton (-is), b erniedrigt (-es; Ausnahmen es, as, b); Versetzungszeichen
  gilt bis zum Taktstrich, Auflösungszeichen hebt auf. Fehler: Vorzeichen übersehen; „hes“ statt b, „ees“ statt es.
- `intervall-benennen`: Stammtöne abzählen, Start- und Zielton mitgezählt (Linie zu nächster Linie = Terz). Fehler:
  Startton nicht mitgezählt (Terz als Sekunde benannt).
- `intervall-qualitaet`: Halbtöne auf der Klaviatur abzählen: kl. 2 = 1, gr. 2 = 2, kl. 3 = 3, gr. 3 = 4. Fehler:
  Vorzeichen nicht beachtet; e–f/h–c als Ganzton gezählt.
- `dreiklang`: Auf dem Grundton zwei Terzen schichten (Linie–Linie–Linie oder Zwischenraum–Zwischenraum–Zwischenraum).
  Fehler: Sekunde oder Quarte statt Terz geschichtet.
- `dreiklangsarten`: Dur = große Terz unten + kleine Terz oben, Moll = kleine unten + große oben; Kurzschrift C = Dur,
  c = Moll. Fehler: Terzen vertauscht; Groß- und Kleinbuchstabe vertauscht; Vorzeichen des Grundtons vergessen
  (Fis als F).

### Umfang

- Drin, Tonumfang: Violinschlüssel vom kleinen a (2. Hilfslinie unten) bis a² (1. Hilfslinie oben); Bassschlüssel vom
  großen C (2. Hilfslinie unten) bis e¹ (2. Hilfslinie oben). Damit alle Oktavlagen von der großen bis zur
  zweigestrichenen Oktave (guess).
- Drin, Vorzeichen: Kreuz, b und Auflösungszeichen, je eines vor einer Note; keine Doppelkreuze, keine Doppel-b,
  keine Vorzeichnung am Zeilenanfang (guess).
- Drin, Intervalle: grob Prime bis Oktave, aufwärts, beide Töne im selben Schlüssel; fein nur kl./gr. Sekunde und
  kl./gr. Terz, auch mit Vorzeichen (z. B. e–fis, cis–e).
- Drin, Dreiklänge: Dur und Moll in Grundstellung auf den sieben Stammtönen C, D, E, F, G, A, H und auf B, Es, Fis –
  alle ohne Doppelvorzeichen; im Violin- und Bassschlüssel (guess).
- Draußen, mit Grund: Notation und Orchesteraufbau (zweite App, Antwort „C“); Hören und Abspielen (der Archetyp hat
  kein Audio für Musik); Quarte bis Septime fein, verminderte und übermäßige Dreiklänge, Umkehrungen (nicht in der
  Lernkontrolle, Antwort zu „Terms“); Tonarten und Quintenzirkel.
- Sprachen: nur Deutsch.

### Quellen (geöffnet 2026-11-23, Lizenz CC BY-SA 4.0; nur Fakten übernommen, keine Sätze)

- Lernlandkarte Musik, https://lernapps.net/apps/map/musik.json – Strang und Kompetenzen, verified.
- „Notenschlüssel“, https://de.wikipedia.org/wiki/Notenschl%C3%BCssel – Violinschlüssel g¹ auf 2. Linie,
  Bassschlüssel f auf 4. Linie, c¹ auf der Hilfslinie zwischen beiden; verified.
- „Oktave“, https://de.wikipedia.org/wiki/Oktave – Oktavbereiche (große C, kleine c, eingestrichene c¹/c′,
  zweigestrichene c²); verified.
- „Intervall (Musik)“, https://de.wikipedia.org/wiki/Intervall_(Musik) – Namen Prime bis Oktave, Halbtöne kl. 2 = 1,
  gr. 2 = 2, kl. 3 = 3, gr. 3 = 4; verified. Das Wort „Grobbestimmung“ steht dort nicht (Schulbegriff, unchecked).
- „Halbton“, https://de.wikipedia.org/wiki/Halbton – e–f und h–c sind Halbtöne; verified.
- „Vorzeichen (Musik)“, https://de.wikipedia.org/wiki/Vorzeichen_(Musik) – Kreuz, b, Namen auf -is/-es, Ausnahmen;
  Versetzungszeichen gilt bis zum Taktstrich; verified.
- „Dreiklang“, https://de.wikipedia.org/wiki/Dreiklang – Dur gr. + kl. Terz, Moll kl. + gr. Terz; verified.
- „Tonart“, https://de.wikipedia.org/wiki/Tonart – Großbuchstabe Dur, Kleinbuchstabe Moll (A-Dur, a-Moll) als
  übliche Schreibweise; verified.
- Abweichung: „Akkordsymbol“ (https://de.wikipedia.org/wiki/Akkordsymbol) schreibt Moll-Akkorde als „Cm“; die
  Kleinbuchstaben-Kurzschrift (c) nennt es nur als ältere Alternative (unchecked, nicht wörtlich gelesen). Die App
  folgt der Antwort des Erstellers: C = Dur, c = Moll.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: leg los

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: what learners do in the app, what they learn.
  - „Es geht um eine Lernkontrolle. Themen Lernkontrolle: 1. Töne im Violin- und Bassschlüssel mit Vorzeichen und
    Oktavlagen 2. Intervalle Grobbestimmung 3. Intervalle Feinbestimmung: gr./KL. Sekunde; gr./KL. Terz
    4. Dreiklänge bestimmen und schreiben mit Kurzschrift 5. Notation 6. Orchesteraufbau“
  - „frei üben und Probestest, also beides“
- Learners: subject, school year, prior knowledge.
  - „Gymnasium, 8. Klasse, hessen, Musik“
  - „Vorwissen ist alles aus der Klasse 7. Was das ist, weiss ich nicht“
- Model and focus: an app of the catalog (https://lernapps.net/apps/llms.txt) as model; what matters most (exercises,
  visualisations, game feel).
  - „all diese Sachen sind mir wichtig.“ (Übungsaufgaben, Bilder wie Klaviatur und Notensystem, Probetest wie die echte Lernkontrolle). Kein Vorbild genannt: keins (guess).
- Hurdles: misconceptions and mistakes of the learners; the creator's examples and experiments.
  - „passt so“ zu den fünf vorgeschlagenen Fehlern – Bass- wie Violinschlüssel gelesen, Vorzeichen übersehen oder Oktavlage falsch, Startton beim Intervall nicht mitgezählt, e–f und h–c als Ganzton gezählt, Groß- und Kleinbuchstaben in der Kurzschrift vertauscht.
- Content: who writes it (creator, you, from sources); own material (worksheets, tests).
  - Vorschlag: „Ich schreibe die Erklärungen und Aufgaben aus verlässlichen Quellen, und du prüfst sie.“ – Antwort: „pass so“. Kein eigenes Material.
- Amount: how much content in the first version; what comes later.
  - Frage: „(a) alle sechs Themen ohne Karte, (b) nur 1–4 mit Karte, (c) zwei Apps: zuerst 1–4, später Notation und Orchester“ – Antwort: „C“. Erste Version: Themen 1–4; Notation und Orchesteraufbau kommen in eine zweite App.
  - Frage: „Was gehört bei euch zu Notation?“ – Antwort: „weiss ich nicht“ (betrifft erst die zweite App).
- Languages: German only, or German and English. Never English only.
  - Vorschlag: „nur Deutsch“ – Antwort: „pass so“.
- Look and feel: calm like a worksheet, or like a game (colours, praise, effects); dark mode.
  - fixed by the archetype (explainer: ruhig wie ein Arbeitsblatt, Dark Mode folgt dem Gerät)
- Terms: the creator's words for the main things in the app, used everywhere.
  - Vorschlag: „Tonnamen deutsch (h statt b; fis, es, b); Oktavlagen große (C), kleine (c), eingestrichene (c¹), zweigestrichene (c²) Oktave; Intervalle ausgeschrieben („große Terz“), in Aufgaben auch „gr. 3“, „kl. 2“; Kurzschrift: Großbuchstabe Dur (C), Kleinbuchstabe Moll (c), nur Dur und Moll, keine verminderten und übermäßigen Dreiklänge.“ – Antwort: „passt so“.
- Finding the app: what teachers and parents would search for.
  - Vorschlag: „Intervalle bestimmen“, „Bassschlüssel üben“, „Dreiklänge Dur Moll“, „Noten lesen Klasse 8“, „Musiktheorie Lernkontrolle“ – Antwort: „passt so“.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: ja

### Content method

#### Aufbau: Strang, Kapitel, Seiten

`strand: musik/tonhoehe-harmonik`. Eine Kompetenz je Seite, Reihenfolge nach `requires`. Abschnitte mit festen ids:
`einstieg` (erste kleine Aufgabe vor der Erklärung), `regel` (Erklärung mit Figur), `beispiel` (vorgerechnet),
`uebung` (Übungen, leicht → schwer).

| Kapitel | Seite (id) | Kompetenz | Voraussetzungen, die die App nicht übt |
|---|---|---|---|
| `toene` | `das-brauchst-du` (Wiederholung) | recap `klaviatur-tasten` | – |
| `toene` | `notensystem` | `notensystem` | `tonhoehe-hoch-tief` (Alltagswissen, kein Link) |
| `toene` | `noten-benennen` | `noten-benennen` | `klaviatur-tasten` → Wiederholungsseite |
| `toene` | `oktavlagen` | `oktave` | `klaviatur-tasten` → Wiederholungsseite |
| `toene` | `bassschluessel` | `bassschluessel` | – |
| `toene` | `halbtonschritte` | `halbtonschritte` | `klaviatur-tasten` → Wiederholungsseite |
| `toene` | `vorzeichen` | `vorzeichen-lesen` | – |
| `intervalle` | `das-brauchst-du` (Wiederholung) | recap `intervall-hoeren` | – |
| `intervalle` | `grobbestimmung` | `intervall-benennen` | `intervall-hoeren` → Wiederholungsseite |
| `intervalle` | `feinbestimmung` | `intervall-qualitaet` | – |
| `dreiklaenge` | `das-brauchst-du` (Wiederholung) | recap `moll-aufbau` | – |
| `dreiklaenge` | `dreiklang-aufbauen` | `dreiklang` | – |
| `dreiklaenge` | `dur-moll-kurzschrift` | `dreiklangsarten` | `moll-aufbau` → Wiederholungsseite |

Selbsteinschätzung in jedem Kapitel (2–3 Übungen je Inhaltsseite, bevorzugt Komponenten und `generated`); die der App
über alle drei Kapitel ist der Probetest, etwa 15–20 Aufgaben. Keine Geschichte: die Seiten tragen sich über ihre
Aufgaben (guess; Klasse 8, Wiederholung vor einer Lernkontrolle). Anrede „du“.

#### Komponenten (warum kein Block reicht: ein `generated` kann keine Note in ein System zeichnen und keine gesetzte Note prüfen)

Gemeinsame Logik `Notenbild.ts`: Ton (Stammton, Vorzeichen, Oktave) ↔ Linie/Zwischenraum je Schlüssel, Halbtonzahl,
Intervall grob und fein, Dreiklang aus Grundton und Tongeschlecht, deutscher Tonname mit Oktavzeichen (C, c, c¹, c²).

- `NotenLesen` (Übungskomponente): zeigt ein Notensystem mit Schlüssel und eine Note, zwei Noten oder einen Dreiklang;
  die Lernenden antworten über Knöpfe (Stammton, Vorzeichen, Oktavlage; Intervallname; groß/klein; Kurzschrift).
  Prop `art`: `ton` | `intervall-grob` | `intervall-fein` | `dreiklang`, `schluessel`: `violin` | `bass` | `beide`,
  Tonbereich. Prüft den Namen (bei `ton` mit Oktavlage, wenn der Block es verlangt). Kann nicht: Töne abspielen.
  Lernhandlung: Die Lernenden zählen vom Schlüsselton (g¹ bzw. f) aus und benennen; die Rückmeldung nennt den
  erkannten Fehler (Schlüssel verwechselt = Terz daneben, Vorzeichen übersehen, Oktavlage falsch, Startton nicht
  mitgezählt, Halbtöne falsch gezählt, Groß-/Kleinbuchstabe vertauscht).
- `NotenSetzen` (Übungskomponente): ein leeres System mit Schlüssel; Aufgabe „Schreibe fis¹“ oder „Schreibe den
  Dreiklang d“; die Lernenden tippen auf Linie oder Zwischenraum (oder wählen mit Pfeiltasten) und setzen Kreuz, b oder
  Auflösungszeichen. Prop `art`: `ton` | `dreiklang`. Prüft die Tonhöhe (enharmonisch Gleiches wie ges statt fis zählt
  als falsch, mit eigener Meldung). Lernhandlung: von der Aufgabe zur Notenposition, umgekehrte Richtung zu `NotenLesen`.
- `Klaviatur` (Anzeige, kein Prüfen, mit `nojs`-Text): zwei Oktaven Tasten mit Namen, wahlweise markierte Tasten,
  Oktavbereiche (große, kleine, eingestrichene, zweigestrichene Oktave) und gezählte Halbtonschritte als Bögen.
  Lernhandlung: Die Lernenden sehen, warum e–f und h–c Halbtöne sind (keine schwarze Taste dazwischen), und zählen
  Halbtöne für die Feinbestimmung selbst ab.

Figuren sonst als SVG in `src/images/` (selbst gezeichnet, CC BY 4.0): Notensystem mit nummerierten Linien,
Violin- und Bassschlüssel mit markiertem Schlüsselton, Terzenschichtung eines Dreiklangs. Konventionen: Linien von
unten gezählt, Schlüsselton farbig plus Beschriftung, Tonnamen deutsch mit hochgestellter Oktavzahl.

#### Datendatei

- `src/data/toene.yaml`: ein Datensatz je Ton von C bis a² (Stammtöne und einfache Vorzeichen), Felder `name`
  (z. B. „fis¹“), `stamm`, `vorzeichen`, `oktave`, `halbton` (Nummer ab C). `generated`-Aufgaben ziehen daraus.
- `src/data/intervalle.yaml`: Name, Stufenzahl, Halbtöne (nur kl./gr. 2 und 3 für die Feinbestimmung).

#### Muster je Kompetenz (Skill `lernapps-exercise-patterns`)

| Kompetenz | Muster (Verb) | Übungen auf der Seite |
|---|---|---|
| `notensystem` | benennen/zuordnen | `matching` Linie ↔ Ton; `NotenLesen` (Violin, nur im System); `single-choice` „Welche Linie legt der Violinschlüssel fest?“; `true-false` zu Linie/Zwischenraum |
| `noten-benennen` | erkennen | `NotenLesen` (Violin mit Hilfslinien); `NotenSetzen` (Violin); `ordering` Töne nach Höhe; `single-choice` Linie/Zwischenraum-Fehler |
| `oktave` | benennen | `NotenLesen` mit Oktavlage; `matching` Tonname ↔ Oktavbereich; `generated` aus `toene` „Wie heißt der Ton eine Oktave höher als {{t.name}}?“ (`choice`) |
| `bassschluessel` | erkennen | `NotenLesen` (Bass); `NotenSetzen` (Bass); `single-choice` mit dem Terz-Fehler als Option; `number` „Auf welcher Linie steht das kleine f?“ |
| `halbtonschritte` | abzählen (berechnen) | `generated` aus `toene` „Wie viele Halbtöne von {{a.name}} bis {{b.name}}?“ (`number`, Fehler: e–f/h–c als Ganzton); `Klaviatur` als Figur; `multiple-choice` „Welche Paare sind Halbtöne?“; `true-false` |
| `vorzeichen-lesen` | benennen | `NotenLesen` mit Vorzeichen; `NotenSetzen` mit Vorzeichen; `matching` Stammton + Zeichen ↔ Name (fis, es, b); `single-choice` zum Taktstrich |
| `intervall-benennen` | abzählen, benennen | `NotenLesen` `intervall-grob`; `generated` aus `toene` „Welches Intervall liegt zwischen {{a.stamm}} und {{b.stamm}}?“ (`choice`, Fehler: Startton nicht gezählt); `ordering` Intervalle nach Größe; `matching` |
| `intervall-qualitaet` | abzählen, entscheiden | `NotenLesen` `intervall-fein`; `generated` Halbtöne zählen → groß/klein (`choice`); `single-choice` e–f; `number` Halbtöne der großen Terz |
| `dreiklang` | aufbauen | `NotenSetzen` `dreiklang` (Grundton gegeben, Terz und Quinte setzen); `single-choice` „Welche Töne bilden einen Dreiklang auf d?“; `true-false` Linie–Linie–Linie; `ordering` |
| `dreiklangsarten` | bestimmen, schreiben | `NotenLesen` `dreiklang` (Antwort in Kurzschrift); `NotenSetzen` `dreiklang` aus Kurzschrift; `matching` Kurzschrift ↔ Tongeschlecht; `single-choice` Terzen vertauscht |

Rückmeldung: jede falsche Option sagt, warum sie nicht passt; jede Komponente und jedes `generated` hat 2–3 Fehler
mit Meldung (die fünf bestätigten Fehler) und einen Hinweis, wo man nachschauen kann.

#### Engagement je Seite (Einstieg · Wechsel · Belohnung · Geschichte)

- `notensystem`: Einstieg „Welche Note steht höher?“ (zwei Noten) · ansehen (Figur), zuordnen, benennen · „Du liest
  jetzt jeden Ton im System“ · keine.
- `noten-benennen`: Einstieg eine Note auf der ersten Hilfslinie unten raten · lesen, setzen, ordnen · „Du kannst Noten
  lesen und selbst schreiben“ · keine.
- `oktavlagen`: Einstieg „Sind diese zwei c derselbe Ton?“ · Klaviatur ansehen, Oktavlage benennen, zuordnen · „Du
  sagst genau, welches c gemeint ist“ · keine.
- `bassschluessel`: Einstieg dieselbe Note in Violin- und Bassschlüssel nebeneinander, „Heißen beide gleich?“ · lesen,
  setzen, Fehler finden · „Du liest beide Schlüssel“ · keine.
- `halbtonschritte`: Einstieg „Wie viele Tasten liegen zwischen e und f?“ · Klaviatur ansehen, abzählen, Paare wählen ·
  „Du zählst Halbtöne ohne Klavier“ · keine.
- `vorzeichen`: Einstieg „Welche Taste meint fis?“ · lesen, setzen, Namen zuordnen · Kapitelende mit Rückblick: „Du
  liest und schreibst jeden Ton von C bis a²“ · keine.
- `grobbestimmung`: Einstieg „Linie zu nächster Linie – Sekunde oder Terz?“ · abzählen, benennen, ordnen · „Du nennst
  jedes Intervall bis zur Oktave“ · keine.
- `feinbestimmung`: Einstieg e–f und f–g auf der Klaviatur vergleichen · Halbtöne zählen, groß/klein entscheiden ·
  Kapitelende mit Rückblick: „Grob und fein: du bestimmst Sekunden und Terzen genau“ · keine.
- `dreiklang-aufbauen`: Einstieg „Welche Töne passen auf c übereinander?“ · Terzen schichten, setzen, wählen · „Du baust
  auf jedem Ton einen Dreiklang“ · keine.
- `dur-moll-kurzschrift`: Einstieg zwei Dreiklänge auf c, die sich in einem Ton unterscheiden · bestimmen, schreiben,
  zuordnen · Rückblick auf alle drei Kapitel und Hinweis auf den Probetest · keine.
- Wiederholung auf Absicht: Halbtöne zählen kommt auf `halbtonschritte`, `feinbestimmung` und `dur-moll-kurzschrift`
  jeweils in neuer Form (Tasten, Intervall, Terzen im Dreiklang).

#### Was die App nicht kann

Keine Töne abspielen, kein Hören; keine Zeitbegrenzung im Probetest; keine Handschrift: Noten werden angetippt, nicht
gezeichnet.

#### Neues Kapitel (zweite Version oder zweite App)

Kompetenzen des Strangs von der Karte nehmen, je Seite die Abschnitte `einstieg`, `regel`, `beispiel`, `uebung`;
`NotenLesen`/`NotenSetzen` mit neuem `art` erweitern (z. B. Quarte bis Oktave fein), Töne aus `toene.yaml`; 1–3
Übungen je Seite in `selfAssessment` aufnehmen.

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite toene/noten-benennen: Logik Notenbild.ts, Komponenten NotenLesen und NotenSetzen (art ton, Violinschlüssel) mit Tests, Datendatei toene.yaml; die Seite zeigt Einstieg, Regel mit Figur, Beispiel und vier Übungen
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: ja
- [x] Kapitel toene, Wiederholungsseite das-brauchst-du (recap klaviatur-tasten) und Komponente Klaviatur (Anzeige, nojs) mit Test
- [x] Seite toene/notensystem: Violinschlüssel und Linien, Figur Notensystem, NotenLesen im System, matching, single-choice, true-false
- [x] Seite toene/oktavlagen: Klaviatur mit Oktavbereichen, NotenLesen mit Oktavlage, matching, generated aus toene
- [x] Seite toene/bassschluessel: NotenLesen und NotenSetzen im Bassschlüssel, Meldung Terz-Fehler, single-choice, number
- [x] Seite toene/halbtonschritte: Klaviatur mit Halbtonbögen, generated Halbtöne zählen, multiple-choice, true-false
- [x] Seite toene/vorzeichen: NotenLesen und NotenSetzen mit Kreuz, b, Auflösungszeichen, matching Namen, single-choice Taktstrich; Selbsteinschätzung Kapitel toene
- [x] Kapitel intervalle: Wiederholungsseite das-brauchst-du (recap intervall-hoeren), Seite grobbestimmung mit NotenLesen intervall-grob, generated, ordering, matching
- [x] Seite intervalle/feinbestimmung: NotenLesen intervall-fein, Datendatei intervalle.yaml, generated groß/klein, single-choice, number; Selbsteinschätzung Kapitel intervalle
- [x] Kapitel dreiklaenge: Wiederholungsseite das-brauchst-du (recap moll-aufbau), Seite dreiklang-aufbauen mit NotenSetzen dreiklang, single-choice, true-false, ordering
- [x] Seite dreiklaenge/dur-moll-kurzschrift: NotenLesen dreiklang mit Kurzschrift, NotenSetzen aus Kurzschrift, matching, single-choice; Selbsteinschätzung Kapitel dreiklaenge, Probetest der App prüfen
<!-- tasks: pages (10 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
