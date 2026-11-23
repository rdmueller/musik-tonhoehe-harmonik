<script setup lang="ts">
// A note on a staff for the task of the number seed; the learner names it with buttons for stem tone, accidental
// and, if asked, octave. It emits the name as the answer once every asked part is chosen; the explainer draws
// "Prüfen", checks and gives the feedback. Its logic is in NotenLesen.ts.
import { computed, ref } from "vue";
import { grundname, type Oktave, platz, STAMMTOENE, type Stammton, tonname, type Vorzeichen } from "./Notenbild.ts";
import { generate, notenbeschreibung } from "./NotenLesen.ts";
import NotenSystem from "./NotenSystem.vue";

const props = defineProps<{
  aufgabe: string;
  schluessel: "violin" | "bass";
  tiefste: number;
  hoechste: number;
  vorzeichen: boolean;
  oktave: boolean;
  mistakes: string[];
  /** The labels of the button groups and of the octave buttons. */
  beschriftung: {
    stammton: string;
    vorzeichen: string;
    ohne: string;
    kreuz: string;
    be: string;
    oktave: string;
    oktaven: string[];
  };
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [string | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const stamm = ref<Stammton | undefined>();
const vz = ref<Vorzeichen | undefined>(props.vorzeichen ? undefined : 0);
const okt = ref<Oktave | undefined>();

const note = computed(() => [{ p: platz(aktuell.value.ton, aktuell.value.schluessel), vz: aktuell.value.ton.vz }]);
const zeichen = computed(() => [
  { vz: 0 as const, text: props.beschriftung.ohne },
  { vz: 1 as const, text: props.beschriftung.kreuz },
  { vz: -1 as const, text: props.beschriftung.be },
]);

function melden(): void {
  if (stamm.value === undefined || vz.value === undefined || (props.oktave && okt.value === undefined)) {
    emit("answer", undefined);
    return;
  }
  emit(
    "answer",
    props.oktave
      ? tonname({ stamm: stamm.value, vz: vz.value, okt: okt.value ?? 0 })
      : grundname(stamm.value, vz.value),
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
function waehleOktave(o: number): void {
  okt.value = o as Oktave;
  melden();
}
</script>

<template>
  <div class="noten-lesen">
    <p>{{ aufgabe }}</p>
    <NotenSystem
      :schluessel="aktuell.schluessel"
      :noten="note"
      :akkord="false"
      :markiert="[]"
      :beschreibung="notenbeschreibung(aktuell)"
      :klickbar="false"
    />
    <fieldset class="noten-lesen-gruppe">
      <legend>{{ beschriftung.stammton }}</legend>
      <button
        v-for="s in STAMMTOENE"
        :key="s"
        type="button"
        :aria-pressed="stamm === s"
        :class="{ 'noten-lesen-geprueft': checked && stamm === s }"
        @click="waehleStamm(s)"
      >
        {{ s }}
      </button>
    </fieldset>
    <fieldset v-if="vorzeichen" class="noten-lesen-gruppe">
      <legend>{{ beschriftung.vorzeichen }}</legend>
      <button
        v-for="z in zeichen"
        :key="z.vz"
        type="button"
        :aria-pressed="vz === z.vz"
        :class="{ 'noten-lesen-geprueft': checked && vz === z.vz }"
        @click="waehleZeichen(z.vz)"
      >
        {{ z.text }}
      </button>
    </fieldset>
    <fieldset v-if="oktave" class="noten-lesen-gruppe">
      <legend>{{ beschriftung.oktave }}</legend>
      <button
        v-for="(text, o) in beschriftung.oktaven"
        :key="o"
        type="button"
        :aria-pressed="okt === o"
        :class="{ 'noten-lesen-geprueft': checked && okt === o }"
        @click="waehleOktave(o)"
      >
        {{ text }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.noten-lesen-gruppe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.noten-lesen-gruppe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.noten-lesen-gruppe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.noten-lesen-gruppe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.noten-lesen-gruppe button.noten-lesen-geprueft {
  outline: 2px solid var(--page-border);
  outline-offset: 2px;
}
</style>
