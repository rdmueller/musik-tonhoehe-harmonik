<script setup lang="ts">
// An empty staff for the task of the number seed: the learner writes the named tone by tapping its line or space
// (or with the buttons "höher" and "tiefer") and choosing the sign in front. It emits place and sign as the answer;
// the explainer draws "Prüfen", checks and gives the feedback. Its logic is in NotenSetzen.ts.
import { computed, ref } from "vue";
import { platzInWorten, type Vorzeichen } from "./Notenbild.ts";
import { aufgabeMit, generate } from "./NotenSetzen.ts";
import NotenSystem from "./NotenSystem.vue";
import { HOECHSTER_PLATZ, TIEFSTER_PLATZ } from "./NotenSystem.ts";

const props = defineProps<{
  aufgabe: string;
  schluessel: "violin" | "bass";
  tiefste: number;
  hoechste: number;
  vorzeichen: boolean;
  mistakes: string[];
  /** The labels: the staff for screen readers, the moving buttons, the sign group and its buttons. */
  beschriftung: {
    system: string;
    leer: string;
    hoeher: string;
    tiefer: string;
    zeichen: string;
    kein: string;
    kreuz: string;
    be: string;
    entfernen: string;
  };
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [{ p: number; vz: Vorzeichen } | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const p = ref<number | undefined>();
const vz = ref<Vorzeichen>(0);

const noten = computed(() => (p.value === undefined ? [] : [{ p: p.value, vz: vz.value }]));
const status = computed(() => (p.value === undefined ? props.beschriftung.leer : platzInWorten(p.value)));
const zeichen = computed(() => [
  { vz: 0 as const, text: props.beschriftung.kein },
  { vz: 1 as const, text: props.beschriftung.kreuz },
  { vz: -1 as const, text: props.beschriftung.be },
]);

function melden(): void {
  emit("answer", p.value === undefined ? undefined : { p: p.value, vz: vz.value });
}
function setzen(platz: number): void {
  p.value = platz;
  melden();
}
function schieben(schritt: number): void {
  const start = p.value ?? 4;
  setzen(Math.min(HOECHSTER_PLATZ, Math.max(TIEFSTER_PLATZ, p.value === undefined ? start : start + schritt)));
}
function waehleZeichen(v: Vorzeichen): void {
  vz.value = v;
  melden();
}
function entfernen(): void {
  p.value = undefined;
  vz.value = 0;
  melden();
}
</script>

<template>
  <div class="noten-setzen">
    <p>{{ aufgabeMit(aufgabe, aktuell) }}</p>
    <NotenSystem
      :schluessel="aktuell.schluessel"
      :noten="noten"
      :akkord="false"
      :markiert="[]"
      :beschreibung="beschriftung.system"
      :klickbar="true"
      @platz="setzen"
    />
    <p class="noten-setzen-status" aria-live="polite">{{ status }}</p>
    <div class="noten-setzen-reihe">
      <button type="button" @click="schieben(1)">{{ beschriftung.hoeher }}</button>
      <button type="button" @click="schieben(-1)">{{ beschriftung.tiefer }}</button>
    </div>
    <fieldset v-if="vorzeichen" class="noten-setzen-reihe">
      <legend>{{ beschriftung.zeichen }}</legend>
      <button v-for="z in zeichen" :key="z.vz" type="button" :aria-pressed="vz === z.vz" @click="waehleZeichen(z.vz)">
        {{ z.text }}
      </button>
    </fieldset>
    <div class="noten-setzen-reihe">
      <button type="button" :disabled="p === undefined" @click="entfernen">{{ beschriftung.entfernen }}</button>
    </div>
  </div>
</template>

<style scoped>
.noten-setzen-status {
  color: var(--page-muted);
}

.noten-setzen-reihe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.noten-setzen-reihe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.noten-setzen-reihe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.noten-setzen-reihe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.noten-setzen-reihe button:disabled {
  opacity: 0.5;
}
</style>
