<script setup lang="ts">
// Two notes one after the other for the task of the number seed; the learner names the interval with a button. It
// emits the name as the answer; the explainer draws "Prüfen", checks and gives the feedback. Its logic is in
// IntervallLesen.ts.
import { computed, ref } from "vue";
import { platz } from "./Notenbild.ts";
import { antworten, generate, notenbeschreibung } from "./IntervallLesen.ts";
import NotenSystem from "./NotenSystem.vue";

const props = defineProps<{
  aufgabe: string;
  schluessel: "violin" | "bass";
  art: "grob" | "fein";
  tiefste: number;
  hoechste: number;
  vorzeichen: boolean;
  mistakes: string[];
  /** The label of the answer buttons. */
  auswahl: string;
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [string | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const gewaehlt = ref<string | undefined>();
const noten = computed(() => [
  { p: platz(aktuell.value.unten, aktuell.value.schluessel), vz: aktuell.value.unten.vz },
  { p: platz(aktuell.value.oben, aktuell.value.schluessel), vz: aktuell.value.oben.vz },
]);

function waehlen(name: string): void {
  gewaehlt.value = name;
  emit("answer", name);
}
</script>

<template>
  <div class="intervall-lesen">
    <p>{{ aufgabe }}</p>
    <NotenSystem
      :schluessel="aktuell.schluessel"
      :noten="noten"
      :akkord="false"
      :markiert="[]"
      :beschreibung="notenbeschreibung(aktuell)"
      :klickbar="false"
    />
    <fieldset class="intervall-lesen-gruppe">
      <legend>{{ auswahl }}</legend>
      <button
        v-for="name in antworten(art)"
        :key="name"
        type="button"
        :aria-pressed="gewaehlt === name"
        @click="waehlen(name)"
      >
        {{ name }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.intervall-lesen-gruppe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.intervall-lesen-gruppe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.intervall-lesen-gruppe button {
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.intervall-lesen-gruppe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
