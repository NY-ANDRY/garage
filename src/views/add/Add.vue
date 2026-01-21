<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useFirestoreData } from '@/composables/userFirestoreData';
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

const { data, loading } = useFirestoreData<Intervention>("interventions");


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

        <div class="flex gap-2 mt-4">
          <Button @click="handleSubmit">
            Créer
          </Button>
        </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
