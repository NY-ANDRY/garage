<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import InterventionBox from "@/components/interventions/InterventionBox.vue";
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../assets/animations/Running_Cat.json';
import { motion } from 'motion-v';
import { Intervention, Reparation, Voiture } from '@/types/types';
import CarSelect from '../components/add/SelectCar.vue';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';
import { Timestamp } from 'firebase/firestore';
import { useAuthStore } from '@/stores/auth';
import { motionFade } from '@/components/animations/motionBind';
import InterventionFacture from '@/components/interventions/InterventionFacture.vue';
import Header from '@/layout/Header.vue';

const { user } = useAuthStore();
const { mutate, loading: loadingCreate, error: errorCreate } = useFirestoreMutation("reparations");
const { data, loading } = useFirestoreCollection<Intervention>("interventions");
const car = ref<Voiture | null>(null);
const selectedIntervention = ref<Intervention[]>([]);
const toast = useToast()

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
  if (car.value == null) {
    toast.add({
      title: 'Error',
      description: 'veuillez selectionner une voiture',
      color: 'error'
    })
    return;
  }
  if (!selectedIntervention || selectedIntervention.value.length <= 0) {
    toast.add({
      title: 'Error',
      description: 'veuillez selectionner au moins 1 intervention',
      color: 'error'
    })
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

  try {
    await mutate(newReparation, { type: 'set' });
    toast.add({
      title: 'Success',
      description: 'Votre reparations est en attente.',
      color: 'success'
    })
    car.value = null;
    selectedIntervention.value = [];
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'réessayez plus tard',
      color: 'error'
    })
  }
}

</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <h6 class="font-inter-l capitalize text-sm text-neutral-400">voiture</h6>
        <div class="flex py-0">
          <CarSelect @select="setCar" :car="car" />
        </div>

        <h6 class="font-inter-l capitalize text-sm text-neutral-400">interventions</h6>
        <motion.div key="data" v-bind="motionFade" class="grid grid-cols-2 gap-2">
          <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
            @toggle="toggleIntervention" />
        </motion.div>

        <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-6!">facture</h6>

        <InterventionFacture :items="selectedIntervention" />

        <div class="flex overflow-hidden rounded mt-2">
          <UButton :loading="loadingCreate" loading-icon="i-lucide-loader" block @click="handleSubmit"
            class="h-12 py-4!">
            Créer
          </UButton>
        </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
