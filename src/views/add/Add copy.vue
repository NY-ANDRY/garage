<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import InterventionBox from "@/components/box/InterventionBox.vue";
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Running_Cat.json';
import { motion } from 'motion-v';
import { Intervention, Reparation, Voiture } from '@/types/types';
import CarSelect from '../car/CarSelect.vue';
import Button from '@/components/buttons/Button.vue';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';
import { Timestamp } from 'firebase/firestore';
import { useAuthStore} from '@/stores/auth';
import { motionFade } from '@/components/animations/motionBind';

const { user } = useAuthStore();

const { mutate, loading: loadingCreate, error: errorCreate } = useFirestoreMutation("reparations");

const { data, loading } = useFirestoreCollection<Intervention>("interventions");


const selectedIntervention = ref<Intervention[]>([]);
const car = ref<Voiture | null>(null);

const setCar = (c: Voiture) => {
  car.value = c;
}

const toggleIntervention = (item: any) => {
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
  if (car.value == null) {
    return;
  }
  if (user == null) {
    return;
  }

  const newReparation: Reparation = {
    voiture: car.value,
    user: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    },
    interventions: selectedIntervention.value,
    statut: 0,
    statut_histo: [],
    paiements: [],
    paiement_statut: 0,
    paiement_total: 0,
    total_a_payer: 0,
    date: Timestamp.now()
  }
  console.log("begin");
  await mutate(newReparation, { type: 'set' });
  console.log("end");

}

import { computed } from "vue";

const totalInterventions = computed(() => {
  return selectedIntervention.value.reduce(
    (sum, item) => sum + (item.prix || 0),
    0
  );
});

const totalDuree = computed(() => {
  return selectedIntervention.value.reduce(
    (sum, item) => sum + (item.duree || 0),
    0
  );
});


</script>
<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <div class="flex py-2">
          <CarSelect @select="setCar" />
        </div>

        <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-3">
          <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
            @toggle="toggleIntervention" />
        </motion.div>

        

        <div class="mt-6 p-4 rounded-xl bg-neutral-100 space-y-3">
        <h3 class="text-lg font-semibold">🧾 Résumé</h3>

        <!-- Voiture -->
        <div v-if="car" class="text-sm text-neutral-600">
          🚗 <span class="font-medium">{{ car.marque }} {{ car.modele }}</span>
        </div>

        <!-- Interventions -->
        <div v-if="selectedIntervention.length > 0" class="space-y-2">
          <div
            v-for="item in selectedIntervention"
            :key="item.id"
            class="flex justify-between text-sm"
          >
            <span>{{ item.nom }}</span>
            <span>{{ $t('currency') }} {{ item.prix }}</span>
          </div>
        </div>

        <div v-else class="text-sm text-neutral-400">
          Aucune intervention sélectionnée
        </div>

        <hr />

        <!-- Totaux -->
        <div class="flex justify-between font-semibold">
          <span>Total</span>
          <span>{{ $t('currency') }} {{ totalInterventions }}</span>
        </div>

        <div class="text-xs text-neutral-500">
          ⏱️ Durée totale : {{ totalDuree }} {{ $t('second') }}
        </div>
      </div>


      

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
