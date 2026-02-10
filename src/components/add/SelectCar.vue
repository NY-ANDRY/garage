<script setup lang="ts">
import { IonModal, IonContent } from '@ionic/vue';
import { Voiture } from "@/types/types";
import { ref } from "vue";
import CarBox from '@/components/car/CarBox.vue';
import { useFirestoreVoitures } from '@/composables/useFirestoreVoitures';
import EmptyCar from '../empty/EmptyCar.vue';

const props = defineProps<{ car: Voiture | null }>();
const emit = defineEmits<{
  (e: "select", voiture: Voiture): void
}>()

const { data: voitures } = useFirestoreVoitures();

const open = ref(false);
const closeModal = () => {
  open.value = false;
};

const handleSelect = (v: Voiture) => {
  emit('select', v);
  closeModal();
}

</script>

<template>

  <div class="flex w-full pb-0" @click="open = true">

    <CarBox v-if="car" :item="car" />

    <div v-else
      class="flex rounded-xl items-center justify-center w-full h-20 min-h-20 border-dashed border-2 border-neutral-200 text-neutral-400">
      Selection de voiture
    </div>

  </div>

  <ion-modal :is-open="open" initial-breakpoint="0.98" :breakpoints="[0, 0.98, 0.98]" @didDismiss="closeModal"
    class="custom-modal">
    <ion-content class="p-0 overflow-hidden">
      <div class="bg-white rounded-t-3xl pt-8 px-2 space-y-4">

        <div v-if="voitures && voitures.length > 0" class="grid grid-cols-1 gap-3" v-for="voiture in voitures">
          <div @click="() => { handleSelect(voiture) }">
            <CarBox :item="voiture" />
          </div>
        </div>
        <div v-else class="flex flex-col justify-center py-8">
          <EmptyCar />
        </div>

      </div>
    </ion-content>
  </ion-modal>

</template>
