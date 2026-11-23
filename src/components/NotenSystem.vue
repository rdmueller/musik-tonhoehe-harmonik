<script setup lang="ts">
// A staff with a clef and notes, drawn as SVG. Optionally a tap on the staff chooses a place: it emits platz with the
// place tapped (0 the bottom line, 1 the space above it, …). Its geometry is in NotenSystem.ts.
import { computed } from "vue";
import { hilfslinien } from "./Notenbild.ts";
import {
  BASS_PUNKTE,
  BASSSCHLUESSEL,
  BREITE,
  HOEHE,
  LINIEN,
  platzBei,
  VIOLINSCHLUESSEL,
  x,
  y,
  zeichen,
} from "./NotenSystem.ts";

const props = defineProps<{
  /** The clef. */
  schluessel: "violin" | "bass";
  /** The notes: place and accidental (-1 flat, 0 none, 1 sharp, 2 natural sign). */
  noten: { p: number; vz: number }[];
  /** Whether the notes stand one above the other, as a chord. */
  akkord: boolean;
  /** Places marked in the accent colour, for explanations. */
  markiert: number[];
  /** What the drawing shows, for screen readers. */
  beschreibung: string;
  /** Whether a tap chooses a place. */
  klickbar: boolean;
  /** Names written below the notes, in their order; for explanations, never in a task. */
  namen?: string[];
  /** Whether the lines carry their numbers 1 to 5 at the right. */
  nummern?: boolean;
}>();
const emit = defineEmits<{ platz: [number] }>();

const linien = computed(() => {
  const ledger = new Set<string>();
  props.noten.forEach((note, n) => {
    for (const q of hilfslinien(note.p)) ledger.add(`${q}:${x(n, props.noten.length, props.akkord)}`);
  });
  return [...ledger].map((key) => {
    const [q, xx] = key.split(":").map(Number);
    return { q: q ?? 0, x: xx ?? 0 };
  });
});

function tippen(event: MouseEvent): void {
  if (!props.klickbar) return;
  const svg = event.currentTarget;
  if (!(svg instanceof SVGSVGElement)) return;
  const box = svg.getBoundingClientRect();
  emit("platz", platzBei(((event.clientY - box.top) / box.height) * HOEHE));
}
</script>

<template>
  <svg
    class="noten-system"
    :class="{ 'noten-system-klickbar': klickbar }"
    :viewBox="`0 0 ${BREITE} ${HOEHE}`"
    role="img"
    :aria-label="beschreibung"
    @click="tippen"
  >
    <line
      v-for="p in markiert.filter((q) => q % 2 === 0 && q >= 0 && q <= 8)"
      :key="`m${p}`"
      class="noten-system-markiert"
      x1="4"
      :x2="nummern ? BREITE - 14 : BREITE - 4"
      :y1="y(p)"
      :y2="y(p)"
    />
    <rect
      v-for="p in markiert.filter((q) => q % 2 !== 0)"
      :key="`r${p}`"
      class="noten-system-raum"
      x="4"
      :width="BREITE - 8"
      :y="y(p) - 5"
      height="10"
    />
    <line
      v-for="p in LINIEN"
      :key="p"
      x1="4"
      :x2="nummern ? BREITE - 14 : BREITE - 4"
      :y1="y(p)"
      :y2="y(p)"
      class="noten-system-linie"
    />
    <template v-if="schluessel === 'violin'">
      <path :d="VIOLINSCHLUESSEL" class="noten-system-schluessel" />
    </template>
    <template v-else>
      <circle cx="13" cy="54" r="3.2" class="noten-system-punkt" />
      <path :d="BASSSCHLUESSEL" class="noten-system-schluessel" />
      <circle
        v-for="(punkt, i) in BASS_PUNKTE"
        :key="i"
        :cx="punkt.cx"
        :cy="punkt.cy"
        r="2.2"
        class="noten-system-punkt"
      />
    </template>
    <line
      v-for="(linie, i) in linien"
      :key="`h${i}`"
      :x1="linie.x - 13"
      :x2="linie.x + 13"
      :y1="y(linie.q)"
      :y2="y(linie.q)"
      class="noten-system-linie"
    />
    <g v-for="(note, n) in noten" :key="`n${n}`">
      <text v-if="note.vz !== 0" :x="x(n, noten.length, akkord) - 24" :y="y(note.p) + 6" class="noten-system-zeichen">
        {{ zeichen(note.vz === 2 ? 0 : note.vz) }}
      </text>
      <ellipse
        :cx="x(n, noten.length, akkord)"
        :cy="y(note.p)"
        rx="7"
        ry="5"
        class="noten-system-note"
        :transform="`rotate(-20 ${x(n, noten.length, akkord)} ${y(note.p)})`"
      />
    </g>
    <text
      v-for="(text, n) in namen ?? []"
      :key="`t${n}`"
      :x="x(n, noten.length, akkord)"
      :y="HOEHE - 2"
      class="noten-system-name"
    >
      {{ text }}
    </text>
    <template v-if="nummern">
      <text v-for="(p, i) in LINIEN" :key="`z${p}`" :x="BREITE - 2" :y="y(p) + 3.5" class="noten-system-nummer">
        {{ i + 1 }}
      </text>
    </template>
  </svg>
</template>

<style scoped>
.noten-system {
  display: block;
  width: 100%;
  max-width: 24rem;
  color: var(--page-text);
}

.noten-system-klickbar {
  cursor: pointer;
}

.noten-system-linie {
  stroke: currentColor;
  stroke-width: 1;
}

.noten-system-markiert {
  stroke: var(--page-accent);
  stroke-width: 3;
}

.noten-system-raum {
  fill: var(--page-accent);
  opacity: 0.35;
}

.noten-system-schluessel {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
}

.noten-system-punkt {
  fill: currentColor;
}

.noten-system-zeichen {
  fill: currentColor;
  font-size: 20px;
}

.noten-system-name {
  fill: currentColor;
  font-size: 11px;
  text-anchor: middle;
}

.noten-system-nummer {
  fill: var(--page-accent);
  font-size: 10px;
  font-weight: 700;
  text-anchor: end;
}

.noten-system-note {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
}
</style>
