<script setup lang="ts">
// The root of a triad on a staff for the task of the number seed; the learner adds third and fifth: choose which one,
// tap its place (or move it with "höher" and "tiefer") and, in the short-form mode, choose its sign. It emits both
// notes as the answer once both are set; the explainer draws "Prüfen", checks and gives the feedback. Its logic is in
// DreiklangSetzen.ts.
import { computed, ref } from "vue";
import { platz, platzInWorten, type Vorzeichen } from "./Notenbild.ts";
import { aufgabeMit, generate, type Note } from "./DreiklangSetzen.ts";
import NotenSystem from "./NotenSystem.vue";
import { HOECHSTER_PLATZ, TIEFSTER_PLATZ } from "./NotenSystem.ts";

const props = defineProps<{
  aufgabe: string;
  schluessel: "violin" | "bass";
  modus: "stamm" | "kurz";
  tiefste: number;
  hoechste: number;
  mistakes: string[];
  /** The labels: the staff, which note is set, the moving buttons, the sign group and its buttons. */
  beschriftung: {
    system: string;
    setze: string;
    terz: string;
    quinte: string;
    leer: string;
    hoeher: string;
    tiefer: string;
    zeichen: string;
    kein: string;
    kreuz: string;
    be: string;
  };
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [{ terz: Note; quinte: Note } | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const grund = computed(() => ({ p: platz(aktuell.value.grund, aktuell.value.schluessel), vz: aktuell.value.grund.vz }));
const auswahl = ref<"terz" | "quinte">("terz");
const gesetzt = ref<{ terz?: Note; quinte?: Note }>({});

const noten = computed(() => [
  grund.value,
  ...(gesetzt.value.terz ? [gesetzt.value.terz] : []),
  ...(gesetzt.value.quinte ? [gesetzt.value.quinte] : []),
]);
const status = computed(() =>
  [
    `${props.beschriftung.terz}: ${gesetzt.value.terz ? platzInWorten(gesetzt.value.terz.p) : props.beschriftung.leer}`,
    `${props.beschriftung.quinte}: ${gesetzt.value.quinte ? platzInWorten(gesetzt.value.quinte.p) : props.beschriftung.leer}`,
  ].join(" · "),
);
const zeichen = computed(() => [
  { vz: 0 as const, text: props.beschriftung.kein },
  { vz: 1 as const, text: props.beschriftung.kreuz },
  { vz: -1 as const, text: props.beschriftung.be },
]);

function melden(): void {
  const { terz, quinte } = gesetzt.value;
  emit("answer", terz && quinte ? { terz: { ...terz }, quinte: { ...quinte } } : undefined);
}
function setzen(p: number): void {
  const vz = gesetzt.value[auswahl.value]?.vz ?? 0;
  gesetzt.value = { ...gesetzt.value, [auswahl.value]: { p, vz } };
  melden();
}
function schieben(schritt: number): void {
  const jetzt = gesetzt.value[auswahl.value]?.p;
  const start = jetzt === undefined ? grund.value.p + (auswahl.value === "terz" ? 1 : 3) : jetzt + schritt;
  setzen(Math.min(HOECHSTER_PLATZ, Math.max(TIEFSTER_PLATZ, start)));
}
function waehleZeichen(vz: Vorzeichen): void {
  const note = gesetzt.value[auswahl.value];
  if (!note) return;
  gesetzt.value = { ...gesetzt.value, [auswahl.value]: { ...note, vz } };
  melden();
}
</script>

<template>
  <div class="dreiklang-setzen">
    <p>{{ aufgabeMit(aufgabe, aktuell) }}</p>
    <fieldset class="dreiklang-setzen-reihe">
      <legend>{{ beschriftung.setze }}</legend>
      <button type="button" :aria-pressed="auswahl === 'terz'" @click="auswahl = 'terz'">
        {{ beschriftung.terz }}
      </button>
      <button type="button" :aria-pressed="auswahl === 'quinte'" @click="auswahl = 'quinte'">
        {{ beschriftung.quinte }}
      </button>
    </fieldset>
    <NotenSystem
      :schluessel="aktuell.schluessel"
      :noten="noten"
      :akkord="true"
      :markiert="[]"
      :beschreibung="beschriftung.system"
      :klickbar="true"
      @platz="setzen"
    />
    <p class="dreiklang-setzen-status" aria-live="polite">{{ status }}</p>
    <div class="dreiklang-setzen-reihe">
      <button type="button" @click="schieben(1)">{{ beschriftung.hoeher }}</button>
      <button type="button" @click="schieben(-1)">{{ beschriftung.tiefer }}</button>
    </div>
    <fieldset v-if="modus === 'kurz'" class="dreiklang-setzen-reihe">
      <legend>{{ beschriftung.zeichen }}</legend>
      <button
        v-for="z in zeichen"
        :key="z.vz"
        type="button"
        :disabled="gesetzt[auswahl] === undefined"
        :aria-pressed="gesetzt[auswahl]?.vz === z.vz"
        @click="waehleZeichen(z.vz)"
      >
        {{ z.text }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.dreiklang-setzen-status {
  color: var(--page-muted);
}

.dreiklang-setzen-reihe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0;
  padding: 0;
  border: 0;
}

.dreiklang-setzen-reihe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.dreiklang-setzen-reihe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.dreiklang-setzen-reihe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.dreiklang-setzen-reihe button:disabled {
  opacity: 0.5;
}
</style>
