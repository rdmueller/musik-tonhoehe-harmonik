---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Musiklehre: Töne in Violin- und Bassschlüssel, Intervalle (grob und fein) und Dur- und Moll-Dreiklänge mit
Kurzschrift. Wiederholung und Übung vor einer Lernkontrolle in Klasse 8; die Selbsteinschätzung der App ist der
Probetest. Archetyp `explainer`, Strang `musik/tonhoehe-harmonik`, nur Deutsch.

## Curriculum

- Hessen, Gymnasium, Jahrgang 8 (Fach Musik). Ein Lehrplan ist nicht nötig: Die App hat einen Strang der
  Lernlandkarte, die Reihenfolge kommt aus deren `requires`.
- Auf der Karte liegen alle Kompetenzen in der Richtstufe 5-6; für Klasse 8 ist die App Wiederholung und Festigung.
- Kein Material des Erstellers; die Themen kommen aus seiner Themenliste der Lernkontrolle.
- Notation und Orchesteraufbau gehören nicht in diese App (andere Stränge): eine zweite App.

## Competencies

Ids und „Ich kann …“-Sätze wörtlich von der Karte (`https://lernapps.net/apps/map/musik.json`).

**Kapitel `toene` – Töne lesen und schreiben**
- Wiederholung `src/toene/das-brauchst-du.yaml`: recap `musik/tonhoehe-hoch-tief` und `musik/klaviatur-tasten`.
- `notensystem` – Ich kann das Notensystem mit seinen fünf Linien und den Violinschlüssel beschreiben.
  → `src/toene/notensystem.yaml`.
- `oktave` – Ich kann Oktaven auf der Klaviatur finden und Töne mit gleichem Namen in verschiedenen Oktaven benennen.
  → `src/toene/oktavlagen.yaml` (vor `noten-benennen`: Das Benennen braucht die Oktavlagen; beide Schritt 5 der Karte).
- `noten-benennen` – Ich kann Noten auf Linien, in Zwischenräumen und auf Hilfslinien erkennen und mit ihrem Namen
  benennen. → `src/toene/noten-benennen.yaml` (Musterseite).
- `bassschluessel` – Ich kann den Bassschlüssel lesen und die Noten darin benennen. → `src/toene/bassschluessel.yaml`.
- `halbtonschritte` – Ich kann Halbtonschritte auf der Klaviatur abzählen. → `src/toene/halbtonschritte.yaml`.
- `vorzeichen-lesen` – Ich kann Kreuz, b und Auflösungszeichen lesen und erhöhte oder erniedrigte Töne spielen.
  → `src/toene/vorzeichen.yaml` (in der App: benennen und schreiben statt spielen).

**Kapitel `intervalle` – Intervalle bestimmen**
- Wiederholung `src/intervalle/das-brauchst-du.yaml`: recap `musik/intervall-hoeren` (als Schritt und Sprung im
  Notenbild, ohne Ton).
- `intervall-benennen` – Ich kann den Abstand zwischen zwei Tönen abzählen und mit dem Namen des Intervalls benennen.
  → `src/intervalle/grobbestimmung.yaml`.
- `intervall-qualitaet` – Ich kann Intervalle bis zur Oktave genau bestimmen: rein, groß oder klein.
  → `src/intervalle/feinbestimmung.yaml` (in dieser Version nur kl./gr. Sekunde und kl./gr. Terz).

**Kapitel `dreiklaenge` – Dreiklänge**
- Wiederholung `src/dreiklaenge/das-brauchst-du.yaml`: recap `musik/moll-aufbau`, steht vor `dur-moll-kurzschrift`, der
  ersten Seite, die sie braucht.
- `dreiklang` – Ich kann einen Dreiklang aus Grundton, Terz und Quinte aufbauen.
  → `src/dreiklaenge/dreiklang-aufbauen.yaml`.
- `dreiklangsarten` – Ich kann Dur- und Moll-Dreiklänge hören, aufbauen und unterscheiden.
  → `src/dreiklaenge/dur-moll-kurzschrift.yaml` (Hören fällt weg: bestimmen und schreiben, Kurzschrift).

Die Übungs-ids jeder Seite stehen in ihrer YAML-Datei; die Selbsteinschätzung jedes Kapitels in seiner
`chapter.yaml`.

## Content structure

- Jede Inhaltsseite hat die Abschnitte mit festen ids, in dieser Reihenfolge: `einstieg` (eine kleine Aufgabe vor der
  Erklärung, mit Begründung), `regel` (Erklärung mit Figur oder Komponente, bei häufigen Fehlern ein Kasten „Merke“),
  `beispiel` (ein Fall vorgezählt, jeder Schritt mit Grund), `uebung` (mindestens vier Übungen, leicht → schwer).
  Die Titel passen zum Inhalt der Seite.
- Anfang: Ziel der Seite in Lernendenworten („Danach …“). Ende: was man jetzt kann und was als Nächstes kommt;
  Kapitelende mit Rückblick.
- Höchstens 350 Wörter Lesetext je Seite.
- Eine Wiederholungsseite `das-brauchst-du` (recap, ohne Übung) steht vor der ersten Seite, die sie braucht: in
  `toene` und `intervalle` am Kapitelanfang, in `dreiklaenge` vor `dur-moll-kurzschrift`.
- Keine Geschichte: die Seiten tragen sich über ihre Aufgaben.
- Selbsteinschätzung in jeder `chapter.yaml`, 2–3 Übungen je Inhaltsseite, bevorzugt `NotenLesen`, `NotenSetzen` und
  `generated`; die der App über alle Kapitel ist der Probetest.

## Terminology

- Anrede „du“, sachlich, nicht kindlich.
- Tonnamen deutsch: c d e f g a h; h statt b; erhöht mit -is (fis, cis), erniedrigt mit -es (des, ges), Ausnahmen es,
  as, b (für h erniedrigt).
- Oktavlagen: große Oktave (C … H), kleine Oktave (c … h), eingestrichene Oktave (c¹ … h¹), zweigestrichene Oktave
  (c² … h²). Oktavzahl hochgestellt (c¹, nicht c' oder c1).
- Zeichen: Kreuz (♯), b (♭), Auflösungszeichen (♮). „Vorzeichen“ für das Zeichen vor einer Note (Schulwort; die
  Definition nennt einmal „Versetzungszeichen“). „Halbtonschritt“ und „Ganztonschritt“, nicht „Halbton“/„Ganzton“.
- Linien des Notensystems von unten gezählt (1. bis 5. Linie), Zwischenräume ebenso.
- Intervalle ausgeschrieben: Prime, Sekunde, Terz, Quarte, Quinte, Sexte, Septime, Oktave; „große Terz“, in
  Aufgaben auch abgekürzt „gr. 3“, „kl. 2“. „Grobbestimmung“ = Stufen abzählen, „Feinbestimmung“ = Halbtöne abzählen.
- Kurzschrift für Dreiklänge: Großbuchstabe = Dur (C, Fis, B), Kleinbuchstabe = Moll (c, fis, b), unabhängig von der
  Oktavlage (die Seite sagt das ausdrücklich, weil Großbuchstaben sonst die große Oktave meinen). Nur Dur und Moll,
  keine verminderten und übermäßigen Dreiklänge. Nicht „Cm“ (Akkordsymbol) verwenden.
- Glossar (`definition`-Blöcke): Notensystem, Stammton, Violinschlüssel, Oktave, Hilfslinie, Bassschlüssel,
  Halbtonschritt, Ganztonschritt, Vorzeichen, Intervall, Dreiklang, Grundton, Dur-Dreiklang,
  Moll-Dreiklang, Kurzschrift.

## Exercise patterns

Komponenten in `src/components/`. Gemeinsame Logik: `Notenbild.ts` (Ton als Stammton, Vorzeichen, Oktave; Tonname
mit Oktavzeichen; Platz im System je Schlüssel, 0 = 1. Linie, 1 = 1. Zwischenraum …; Halbtöne; Intervalle; Dreiklang;
Kurzschrift), `Dreiklang.ts` (die Grundtöne C, D, E, F, G, A, H, B, Es, Fis und das Ziehen eines Dreiklangs),
`NotenSystem.ts` (Geometrie des Systems). Jede Übungskomponente zieht ihre Aufgabe aus dem `seed`, nennt typische
Fehler über `mistakes` (Texte in den Props, Reihenfolge wie `about.mistakes` im `.ts`) und hat einen Test.

| Muster | Komponente oder Block | Props, die variieren | Typische Fehler (Reihenfolge der `mistakes`) | Beispiel |
|---|---|---|---|---|
| Ton lesen | `NotenLesen` | `schluessel`, `tiefste`/`hoechste` (Plätze), `vorzeichen`, `oktave` | anderer Schlüssel (2 Plätze daneben), Vorzeichen, Oktavlage, Nachbarton | `toene/noten-benennen#noten-lesen` |
| Ton schreiben | `NotenSetzen` | `schluessel`, `tiefste`/`hoechste`, `vorzeichen`; `aufgabe` mit `{ton}` | anderer Schlüssel, Vorzeichen, Oktave, Nachbarplatz, enharmonisch (ges statt fis) | `toene/noten-benennen#noten-setzen` |
| Intervall grob/fein | `IntervallLesen` | `art` (`grob` Prime–Oktave, `fein` kl./gr. Sekunde und Terz), `schluessel`, Plätze des unteren Tons, `vorzeichen` | grob: Startton nicht gezählt, einer zu viel; fein: e–f/h–c, Vorzeichen, Sekunde/Terz verwechselt, groß/klein | `intervalle/feinbestimmung#intervall-fein` |
| Dreiklang bestimmen | `DreiklangLesen` | `schluessel`, Plätze des Grundtons | Dur/Moll vertauscht, Vorzeichen des Grundtons, nach der Terz benannt | `dreiklaenge/dur-moll-kurzschrift#dreiklang-lesen` |
| Dreiklang schreiben | `DreiklangSetzen` | `modus` (`stamm`: Terz und Quinte auf einem Stammton; `kurz`: aus der Kurzschrift mit Zeichen), `schluessel`, Plätze des Grundtons; `aufgabe` mit `{grund}` oder `{kurz}` | Sekunde statt Terz, Quarte/Sexte statt Quinte, Dur/Moll vertauscht, Zeichen der Quinte | `dreiklaenge/dur-moll-kurzschrift#dreiklang-schreiben` |
| Oktave höher | `generated` aus `src/data/oktaven.yaml`, `compare: choice` | der gezogene Ton | derselbe Ton, falsche Oktave | `toene/oktavlagen#oktave-hoeher` |
| Halbtöne zählen | `generated` aus `src/data/stammtoene.yaml`, `number` | zwei Stammtöne | alles als Ganzton, nur weiße Tasten | `toene/halbtonschritte#halbtoene-zaehlen` |
| Stammtöne zählen | `generated` aus `src/data/stammtoene.yaml`, `number` | zwei Stammtöne | Startton nicht gezählt, nur dazwischen | `intervalle/grobbestimmung#stammtoene-zaehlen` |
| klein oder groß | `generated` aus `src/data/intervalle.yaml`, `compare: choice` | eine Sekunde oder Terz | die andere Größe | `intervalle/feinbestimmung#klein-oder-gross` |
| Zuordnen, ordnen, entscheiden | `matching`, `ordering`, `single-choice`, `multiple-choice`, `true-false`, `number` | – | der typische Fehler als Option mit `info` | `toene/vorzeichen#bis-zum-taktstrich` |

- Jede Seite: mindestens vier Übungen, höchstens die Hälfte ratbar; jede Inhaltsseite hat eine Komponente oder ein
  `generated`. Auf Seiten mit beiden Schlüsseln gibt es die Komponente einmal im Violin- und einmal im Bassschlüssel.
- Eingaben der Notenkomponenten: Knöpfe (Lesen) oder Tippen ins System plus „höher“/„tiefer“ (Setzen), weil ein
  Platz bei 360 px nur etwa 8 px hoch ist.
- Jede falsche Option sagt, warum sie nicht passt; jede Komponente und jedes `generated` hat Fehler mit Meldung.
- Selbsteinschätzung: in jeder `chapter.yaml` je Inhaltsseite 2–3 Übungen, nur Komponenten und `generated`; die der
  App (`/einschaetzung/`) ist der Probetest.

## Figures

- `NotenSystem` (Komponente, auch als Figur-Block mit `nojs`): System mit Violin- oder Bassschlüssel (als Pfad
  gezeichnet), Noten nebeneinander oder als Akkord (`akkord`), Hilfslinien, Zeichen; optional `markiert` (Linien oder
  Zwischenräume in der Akzentfarbe), `namen` unter den Noten (leere Texte lassen eine Note unbenannt), `nummern`
  (Linien 1–5 rechts). In Aufgaben nie Namen oder Markierungen, die die Lösung zeigen.
- `Klaviatur` (Komponente, nur Anzeige, mit `nojs`): ein bis zwei Oktaven ab `start` (1 kleine, 2 eingestrichene
  Oktave), weiße Tasten beschriftet, schwarze nur mit `schwarzeNamen` (Kreuz- oder mit `be` b-Namen), `markiert` gelb
  mit dicker Kante, `boegen` je ein Halbtonschritt, `oktavnamen` darunter. Tasten als Halbtonzahl ab großem C (c = 12,
  c¹ = 24).
- Keine Bilddateien; alles wird gezeichnet. Konventionen: Linien von unten gezählt; Markierung immer mit zweitem
  Merkmal (Beschriftung, dicke Kante); Tonnamen deutsch mit hochgestellter Oktavzahl; bei 360 px lesbar.
- `beschreibung` (Bildschirmleser) und `nojs` sagen, was zu sehen ist; der Text davor, worauf man achten soll.

## Sources

Alle am 2026-11-23 geöffnet; Lizenz CC BY-SA 4.0; nur Fakten übernommen, keine Sätze.
- Lernlandkarte Musik, https://lernapps.net/apps/map/musik.json – Strang, Kompetenzen.
- „Notenschlüssel“, https://de.wikipedia.org/wiki/Notenschl%C3%BCssel – g¹ auf der 2. Linie, f auf der 4. Linie, c¹
  auf der Hilfslinie zwischen beiden.
- „Oktave“, https://de.wikipedia.org/wiki/Oktave – Oktavbereiche und Schreibweise.
- „Intervall (Musik)“, https://de.wikipedia.org/wiki/Intervall_(Musik) – Namen, Halbtonzahlen.
- „Halbton“, https://de.wikipedia.org/wiki/Halbton – e–f und h–c.
- „Vorzeichen (Musik)“, https://de.wikipedia.org/wiki/Vorzeichen_(Musik) – Kreuz, b, Namen, Geltung bis zum
  Taktstrich.
- „Dreiklang“, https://de.wikipedia.org/wiki/Dreiklang – Aufbau Dur und Moll.
- „Tonart“, https://de.wikipedia.org/wiki/Tonart – Großbuchstabe Dur, Kleinbuchstabe Moll.
- Unchecked: das Wort „Grobbestimmung“ (Schulbegriff, in keiner Quelle).

## Adding a chapter or round

1. Kompetenzen des Strangs `musik/tonhoehe-harmonik` von der Karte nehmen (id und Satz wörtlich), Reihenfolge nach
   `requires`; ein neuer Strang ist eine neue App.
2. Ordner `src/<kapitel>/` mit `chapter.yaml`; Kapitel in `src/app.yaml` unter `chapters` eintragen.
3. Voraussetzungen, die die App nicht übt: eine Wiederholungsseite `das-brauchst-du` am Kapitelanfang.
4. Je Kompetenz eine Seite mit `einstieg`, `regel`, `beispiel`, `uebung` wie oben, Übungen aus den Mustern. Neue
   Aufgabenarten in den Komponenten (z. B. Quarte bis Oktave fein in `IntervallLesen`, `FEIN` erweitern) mit Logik in
   `Notenbild.ts` und Test; Beispiele der Blöcke (`examples`) aus `generate(1, props)` berechnen.
5. 1 bis 3 Übungen jeder Seite in `selfAssessment` der `chapter.yaml` aufnehmen, wie Skill
   `lernapps-explainer-self-assessment` sagt.
6. `npx --no -- lernapps check`, Seiten mit `npx --no -- lernapps screenshots` ansehen, dann committen.

## Rules learned from mistakes

- Eine Figur, die alle Namen zeigt, macht die Zuordnung danach zum Abschreiben: Erklärfiguren benennen nur Anker (z. B.
  die Linien-Töne), den Rest leiten die Lernenden her. (Lernenden-Check der Musterseite)
- Merke-Kästen stehen vor der Figur, die sie erklären, nicht danach. (ebenda)
- Fehlermeldungen nennen nur, was die Seite schon erklärt hat: Auf Violin-Seiten heißt der Schlüssel-Fehler „zwei
  Schritte daneben“, nicht „Bassschlüssel“. (ebenda)
- Eine markierte Taste der Klaviatur zeigt keinen Namen, wenn nach ihm gefragt ist. (Seite Vorzeichen)
- Tabellen mit mehr als zwei langen Spalten laufen bei 360 px über: zwei Spalten. (Seite Oktavlagen)
