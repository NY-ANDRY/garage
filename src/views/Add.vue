<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import InterventionBox from "@/components/interventions/InterventionBox.vue";
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import InterventionFacture from '@/components/interventions/InterventionFacture.vue';
import Header from '@/layout/Header.vue';
import { motion } from 'motion-v';
import { Intervention, Voiture } from '@/types/types';
import { motionFade } from '@/components/animations/motionBind';
import { useReparationCreation } from '@/composables/useReparationCreation';
import SelectCar from '@/components/add/SelectCar.vue';
import carAnimation from '../assets/animations/Car.json';

const { createReparation, loading: loadingCreate } = useReparationCreation()
const { data, loading } = useFirestoreCollection<Intervention>("interventions");
const car = ref<Voiture | null>(null);
const selectedIntervention = ref<Intervention[]>([]);

const setCar = (c: Voiture) => {
  car.value = c;
}

const toggleIntervention = (item: Intervention) => {
  item.statut = 0;
  const index = selectedIntervention.value.findIndex(i => i.id === item.id);

  if (index !== -1) {
    selectedIntervention.value.splice(index, 1);
  } else {
    selectedIntervention.value.push(item);
  }
};

const isSelected = (id: any) => {
  return selectedIntervention.value.some(i => i.id === id)
}

const handleSubmit = async () => {
  createReparation(
    car.value,
    selectedIntervention.value,
    () => {
      car.value = null
      selectedIntervention.value = []
    }
  )
}

</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="carAnimation" :width="400" :height="400">

        <h2 class="font-inter-b text-neutral-800">Signaler une reparation</h2>
        <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">voiture</h6>
        <div class="flex pb-4 pt-1">
          <SelectCar @select="setCar" :car="car" />
        </div>

        <h6 class="font-inter-l capitalize text-sm text-neutral-400">interventions</h6>
        <motion.div key="data" v-bind="motionFade" class="grid grid-cols-2 gap-3">
          <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
            @toggle="toggleIntervention" />
        </motion.div>

        <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-6!">facture</h6>

        <InterventionFacture :items="selectedIntervention" />

        <div class="flex overflow-hidden rounded mt-2 pb-4">
          <UButton :loading="loadingCreate" loading-icon="i-lucide-loader" block  @click="handleSubmit"
            class="h-12 py-4!">
            Créer
          </UButton>
        </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
