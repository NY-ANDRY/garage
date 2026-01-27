<script setup lang="ts">
import { IonModal, IonContent } from '@ionic/vue';
import { motion } from "motion-v";
import { Voiture } from "@/types/types";
import { useFirestoreCollection } from "@/composables/userFirestoreCollection";
import { ref } from "vue";
import CarBox from '@/components/box/CarBox.vue';

const emit = defineEmits<{
  (e: "select", voiture: Voiture): void
}>()

const c = ref<Voiture | null>(null);

const { data } = useFirestoreCollection<Voiture>("voitures");

const open = ref(false);
const closeModal = () => {
  open.value = false;
};

const pressEffect = { scale: 0.97 };

const handleSelect = (v: Voiture) => {
  c.value = v;
  emit('select', v);
  closeModal();
}

</script>

<template>

  <div class="flex w-full pb-4" @click="open = true">

    <CarBox v-if="c" :item="c" />

    <div v-else
      class="flex items-center justify-center w-full h-32 min-h-20 border-dashed rounded-xl border-2 border-neutral-100 text-neutral-400 mb-4">
      Selection de voiture
    </div>

  </div>

  <ion-modal :is-open="open" initial-breakpoint="0.98" :breakpoints="[0, 0.98, 0.98]" @didDismiss="closeModal"
    class="custom-modal">
    <ion-content class="p-0 overflow-hidden">
      <div class="bg-white rounded-t-3xl p-6 space-y-4">

        <div class="grid grid-cols-1 gap-3" v-for="voiture in data">
          <div  @click="() => { handleSelect(voiture) }">
            <CarBox :item="voiture" />
          </div>
        </div>

      </div>
    </ion-content>
  </ion-modal>

</template>
