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
- Wiederholung `src/toene/das-brauchst-du.yaml`: recap `musik/klaviatur-tasten`.
- `notensystem` – Ich kann das Notensystem mit seinen fünf Linien und den Violinschlüssel beschreiben.
  → `src/toene/notensystem.yaml`.
- `noten-benennen` – Ich kann Noten auf Linien, in Zwischenräumen und auf Hilfslinien erkennen und mit ihrem Namen
  benennen. → `src/toene/noten-benennen.yaml` (Musterseite).
- `oktave` – Ich kann Oktaven auf der Klaviatur finden und Töne mit gleichem Namen in verschiedenen Oktaven benennen.
  → `src/toene/oktavlagen.yaml`.
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
- Wiederholung `src/dreiklaenge/das-brauchst-du.yaml`: recap `musik/moll-aufbau`.
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
- Jedes Kapitel beginnt mit einer Wiederholungsseite `das-brauchst-du` (recap, ohne Übung).
- Keine Geschichte: die Seiten tragen sich über ihre Aufgaben.
- Selbsteinschätzung in jeder `chapter.yaml`, 2–3 Übungen je Inhaltsseite, bevorzugt `NotenLesen`, `NotenSetzen` und
  `generated`; die der App über alle Kapitel ist der Probetest.

## Terminology

- Anrede „du“, sachlich, nicht kindlich.
- Tonnamen deutsch: c d e f g a h; h statt b; erhöht mit -is (fis, cis), erniedrigt mit -es (des, ges), Ausnahmen es,
  as, b (für h erniedrigt).
- Oktavlagen: große Oktave (C … H), kleine Oktave (c … h), eingestrichene Oktave (c¹ … h¹), zweigestrichene Oktave
  (c² … h²). Oktavzahl hochgestellt (c¹, nicht c' oder c1).
- Zeichen: Kreuz (♯), b (♭), Auflösungszeichen (♮). „Vorzeichen“ für das Zeichen vor einer Note.
- Linien des Notensystems von unten gezählt (1. bis 5. Linie), Zwischenräume ebenso.
- Intervalle ausgeschrieben: Prime, Sekunde, Terz, Quarte, Quinte, Sexte, Septime, Oktave; „große Terz“, in
  Aufgaben auch abgekürzt „gr. 3“, „kl. 2“. „Grobbestimmung“ = Stufen abzählen, „Feinbestimmung“ = Halbtöne abzählen.
- Kurzschrift für Dreiklänge: Großbuchstabe = Dur (C, Fis, B), Kleinbuchstabe = Moll (c, fis, b). Nur Dur und Moll,
  keine verminderten und übermäßigen Dreiklänge. Nicht „Cm“ (Akkordsymbol) verwenden.
- Glossar: Notensystem, Violinschlüssel, Bassschlüssel, Hilfslinie, Oktave, Halbton, Ganzton, Stammton, Vorzeichen,
  Intervall, Dreiklang, Grundton, Kurzschrift.

## Exercise patterns

Komponenten in `src/components/`, gemeinsame Logik `Notenbild.ts` (Ton ↔ Linie/Zwischenraum je Schlüssel,
Halbtonnummer, Intervall grob und fein, Dreiklang, Tonname mit Oktavzeichen).

- **Ton lesen** (`noten-benennen`, `notensystem`, `oktave`, `bassschluessel`, `vorzeichen-lesen`): `NotenLesen` mit
  `art: ton`; zeigt eine Note, Antwort über Knöpfe Stammton, Vorzeichen, Oktavlage. Variiert: Schlüssel, Tonbereich,
  ob Vorzeichen vorkommen, ob die Oktavlage verlangt ist. Fehler: Schlüssel verwechselt (Terz daneben), Vorzeichen
  übersehen, Oktavlage falsch.
- **Ton schreiben**: `NotenSetzen` mit `art: ton`; Aufgabe „Schreibe fis¹“, Lernende tippen Linie oder Zwischenraum und
  wählen das Zeichen. Fehler wie oben; enharmonisch gleich (ges statt fis) zählt als falsch, mit eigener Meldung.
- **Intervall grob** (`intervall-benennen`): `NotenLesen` mit `art: intervall-grob`; zwei Noten aufwärts, Antwort
  Prime … Oktave. Fehler: Startton nicht mitgezählt.
- **Intervall fein** (`intervall-qualitaet`): `NotenLesen` mit `art: intervall-fein`; Sekunden und Terzen, Antwort
  groß/klein. Fehler: e–f/h–c als Ganzton gezählt, Vorzeichen nicht beachtet.
- **Dreiklang bestimmen** (`dreiklangsarten`): `NotenLesen` mit `art: dreiklang`; Antwort Grundton + Vorzeichen +
  Dur/Moll, ergibt Kurzschrift. Fehler: Terzen vertauscht, Groß/klein vertauscht, Vorzeichen des Grundtons vergessen.
- **Dreiklang schreiben** (`dreiklang`, `dreiklangsarten`): `NotenSetzen` mit `art: dreiklang`; Grundton gegeben
  bzw. Kurzschrift gegeben, Lernende setzen Terz und Quinte.
- **Halbtöne zählen** (`halbtonschritte`): `generated` aus `src/data/toene.yaml`, `compare: number`; Fehler: e–f/h–c
  als Ganzton.
- **Zuordnen, ordnen, entscheiden**: `matching` (Linie ↔ Ton, Name ↔ Zeichen, Kurzschrift ↔ Tongeschlecht),
  `ordering` (Töne nach Höhe, Intervalle nach Größe), `single-choice` mit dem typischen Fehler als Option,
  `true-false`, `number`.
- Jede falsche Option sagt, warum sie nicht passt; jede Komponente und jedes `generated` hat 2–3 Fehler mit Meldung
  und einen Hinweis.

## Figures

- `Klaviatur` (Komponente, nur Anzeige, mit `nojs`): zwei Oktaven, Tasten beschriftet, markierte Tasten gelb mit
  Namen, Oktavbereiche beschriftet, Halbtöne als Bögen.
- `NotenLesen`/`NotenSetzen` zeichnen das Notensystem selbst (SVG): 5 Linien, Schlüssel, Noten mit Hilfslinien, der
  Schlüsselton (g¹ bzw. f) nur in Erklärfiguren markiert, nie in Aufgaben.
- Eigene SVG-Bilder in `src/images/`, selbst gezeichnet, Lizenz CC BY 4.0: Notensystem mit nummerierten Linien,
  Violin- und Bassschlüssel mit markiertem Schlüsselton, Terzenschichtung eines Dreiklangs.
- Konventionen: Linien von unten gezählt; Markierungen in der Akzentfarbe plus Beschriftung (nie nur Farbe); Tonnamen
  deutsch mit hochgestellter Oktavzahl; funktioniert bei 360 px.
- `alt` sagt, was zu sehen ist; die Bildunterschrift, worauf man achten soll; keine Figur zeigt die Lösung.

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
4. Je Kompetenz eine Seite mit `einstieg`, `regel`, `beispiel`, `uebung` wie oben, Übungen aus den Mustern;
   `NotenLesen`/`NotenSetzen` bei Bedarf um eine neue `art` erweitern (Logik in `Notenbild.ts`, Test dazu); Töne aus
   `src/data/toene.yaml`.
5. 1 bis 3 Übungen jeder Seite in `selfAssessment` der `chapter.yaml` aufnehmen, wie Skill
   `lernapps-explainer-self-assessment` sagt.
6. `npx --no -- lernapps check`, Seiten mit `npx --no -- lernapps screenshots` ansehen, dann committen.

## Rules learned from mistakes

None yet.
