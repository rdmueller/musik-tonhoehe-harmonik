<script setup lang="ts">
// A major or minor triad for the task of the number seed; the learner names it in short form with buttons for the
// root and for Dur or Moll. It emits the short form as the answer; the explainer draws "Prüfen", checks and gives the
// feedback. Its logic is in DreiklangLesen.ts.
import { computed, ref } from "vue";
import { kurzschrift, platz, STAMMTOENE, type Stammton, type Vorzeichen } from "./Notenbild.ts";
import { generate, notenbeschreibung } from "./DreiklangLesen.ts";
import NotenSystem from "./NotenSystem.vue";

const props = defineProps<{
  aufgabe: string;
  schluessel: "violin" | "bass";
  tiefste: number;
  hoechste: number;
  mistakes: string[];
  /** The labels of the button groups and buttons. */
  beschriftung: {
    grundton: string;
    vorzeichen: string;
    ohne: string;
    kreuz: string;
    be: string;
    geschlecht: string;
    dur: string;
    moll: string;
  };
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [string | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const stamm = ref<Stammton | undefined>();
const vz = ref<Vorzeichen | undefined>();
const dur = ref<boolean | undefined>();
const noten = computed(() =>
  aktuell.value.toene.map((ton) => ({ p: platz(ton, aktuell.value.schluessel), vz: ton.vz })),
);
const zeichen = computed(() => [
  { vz: 0 as const, text: props.beschriftung.ohne },
  { vz: 1 as const, text: props.beschriftung.kreuz },
  { vz: -1 as const, text: props.beschriftung.be },
]);

function melden(): void {
  emit(
    "answer",
    stamm.value === undefined || vz.value === undefined || dur.value === undefined
      ? undefined
      : kurzschrift({ stamm: stamm.value, vz: vz.value }, dur.value),
  );
}
function waehleStamm(s: Stammton): void {
  stamm.value = s;
  melden();
}
function waehleZeichen(v: Vorzeichen): void {
  vz.value = v;
  melden();
}
function waehleGeschlecht(d: boolean): void {
  dur.value = d;
  melden();
}
</script>

<template>
  <div class="dreiklang-lesen">
    <p>{{ aufgabe }}</p>
    <NotenSystem
      :schluessel="aktuell.schluessel"
      :noten="noten"
      :akkord="true"
      :markiert="[]"
      :beschreibung="notenbeschreibung(aktuell)"
      :klickbar="false"
    />
    <fieldset class="dreiklang-lesen-gruppe">
      <legend>{{ beschriftung.grundton }}</legend>
      <button v-for="s in STAMMTOENE" :key="s" type="button" :aria-pressed="stamm === s" @click="waehleStamm(s)">
        {{ s }}
      </button>
    </fieldset>
    <fieldset class="dreiklang-lesen-gruppe">
      <legend>{{ beschriftung.vorzeichen }}</legend>
      <button v-for="z in zeichen" :key="z.vz" type="button" :aria-pressed="vz === z.vz" @click="waehleZeichen(z.vz)">
        {{ z.text }}
      </button>
    </fieldset>
    <fieldset class="dreiklang-lesen-gruppe">
      <legend>{{ beschriftung.geschlecht }}</legend>
      <button type="button" :aria-pressed="dur === true" @click="waehleGeschlecht(true)">{{ beschriftung.dur }}</button>
      <button type="button" :aria-pressed="dur === false" @click="waehleGeschlecht(false)">
        {{ beschriftung.moll }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.dreiklang-lesen-gruppe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.dreiklang-lesen-gruppe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.dreiklang-lesen-gruppe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.dreiklang-lesen-gruppe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
