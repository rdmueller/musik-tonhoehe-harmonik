<script setup lang="ts">
// A piano keyboard of one to two octaves, drawn as SVG: keys with names, marked keys, octave ranges and arcs that
// count semitones between two keys. Shows only; its geometry is in Klaviatur.ts.
import { computed } from "vue";
import {
  bereiche,
  breite,
  HOEHE,
  mitte,
  OBEN,
  SCHWARZ_BREITE,
  SCHWARZ_HOEHE,
  tasten,
  WEISS_BREITE,
  WEISS_HOEHE,
} from "./Klaviatur.ts";

const props = defineProps<{
  /** The octave of the first c: 0 große, 1 kleine, 2 eingestrichene, 3 zweigestrichene Oktave. */
  start: number;
  /** How many octaves: 1 or 2. */
  oktaven: number;
  /** The marked keys, as semitones above the große C (c is 12, c¹ is 24). */
  markiert: number[];
  /** Arcs from one key to the next, each counting one semitone, as semitones above the große C. */
  boegen: { von: number; bis: number }[];
  /** Whether the black keys are named with flats (des) instead of sharps (cis). */
  be: boolean;
  /** Whether the black keys carry names. */
  schwarzeNamen: boolean;
  /** Whether the octave ranges are named below the keys. */
  oktavnamen: boolean;
  /** What the drawing shows, for screen readers. */
  beschreibung: string;
}>();

const liste = computed(() => tasten(props.start, props.oktaven, props.be));
const weisse = computed(() => liste.value.filter((t) => t.weiss));
const schwarze = computed(() => liste.value.filter((t) => !t.weiss));
const bogen = computed(() =>
  props.boegen.flatMap(({ von, bis }) => {
    const a = mitte(liste.value, von);
    const b = mitte(liste.value, bis);
    return a === undefined || b === undefined ? [] : [{ a, b }];
  }),
);
</script>

<template>
  <svg class="klaviatur" :viewBox="`-1 0 ${breite(oktaven) + 2} ${HOEHE}`" role="img" :aria-label="beschreibung">
    <g v-for="t in weisse" :key="t.halbton">
      <rect
        :x="t.x"
        :y="OBEN"
        :width="WEISS_BREITE"
        :height="WEISS_HOEHE"
        :class="markiert.includes(t.halbton) ? 'klaviatur-markiert' : 'klaviatur-weiss'"
      />
      <text :x="t.x + WEISS_BREITE / 2" :y="OBEN + WEISS_HOEHE - 8" class="klaviatur-name">{{ t.name }}</text>
    </g>
    <g v-for="t in schwarze" :key="t.halbton">
      <rect
        :x="t.x"
        :y="OBEN"
        :width="SCHWARZ_BREITE"
        :height="SCHWARZ_HOEHE"
        :class="markiert.includes(t.halbton) ? 'klaviatur-markiert-schwarz' : 'klaviatur-schwarz'"
      />
      <text
        v-if="schwarzeNamen || markiert.includes(t.halbton)"
        :x="t.x + SCHWARZ_BREITE / 2"
        :y="OBEN + SCHWARZ_HOEHE - 6"
        class="klaviatur-name-schwarz"
        :class="{ 'klaviatur-name-markiert': markiert.includes(t.halbton) }"
      >
        {{ t.name }}
      </text>
    </g>
    <path
      v-for="(b, i) in bogen"
      :key="`b${i}`"
      :d="`M${b.a} ${OBEN - 2} Q${(b.a + b.b) / 2} ${OBEN - 22} ${b.b} ${OBEN - 2}`"
      class="klaviatur-bogen"
    />
    <template v-if="oktavnamen">
      <text
        v-for="(bereich, i) in bereiche(start, oktaven)"
        :key="`o${i}`"
        :x="bereich.x + 2"
        :y="HOEHE - 6"
        class="klaviatur-oktave"
      >
        {{ bereich.text }}
      </text>
    </template>
  </svg>
</template>

<style scoped>
.klaviatur {
  display: block;
  width: 100%;
  max-width: 28rem;
  color: var(--page-text);
}

.klaviatur-weiss {
  fill: #fff;
  stroke: #1a1a1a;
}

.klaviatur-schwarz {
  fill: #1a1a1a;
  stroke: #1a1a1a;
}

/* marked keys: yellow with a thick border, so that the mark does not rest on colour alone */
.klaviatur-markiert,
.klaviatur-markiert-schwarz {
  fill: #fcd34d;
  stroke: #1a1a1a;
  stroke-width: 2.5;
}

.klaviatur-name {
  fill: #1a1a1a;
  font-size: 9px;
  text-anchor: middle;
}

.klaviatur-name-schwarz {
  fill: #fff;
  font-size: 7px;
  text-anchor: middle;
}

.klaviatur-name-markiert {
  fill: #1a1a1a;
  font-weight: 700;
}

.klaviatur-bogen {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 2;
}

.klaviatur-oktave {
  fill: currentColor;
  font-size: 10px;
}
</style>
