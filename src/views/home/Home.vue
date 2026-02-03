<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Car.json';
import { Reparation } from '@/types/types';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';

// const loading = ref<boolean>(true);

const { data, loading } = useFirestoreCollection<Reparation>("reparations");

</script>

<template>
  <ion-page>
    <Header title="Tabb 1"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <div class="flex flex-col gap-4 p-4">

        <div
          v-for="rep in data"
          :key="rep.id"
          class="w-full bg-neutral-50 rounded-xl p-4 shadow-sm space-y-2"
        >
          <!-- Voiture -->
          <div class="flex justify-between items-center">
            <div class="font-semibold text-lg">
              🚗 {{ rep.voiture.marque }} {{ rep.voiture.nom }}
            </div>
            <span class="text-xs text-neutral-400">
              {{ rep.date?.toDate().toLocaleDateString() }}
            </span>
          </div>

          <!-- Interventions -->
          <div class="text-sm text-neutral-600 space-y-1">
            <div
              v-for="inter in rep.interventions"
              :key="inter.id"
              class="flex justify-between"
            >
              <span>• {{ inter.nom }}</span>
              <span>{{ inter.prix }}</span>
            </div>
          </div>

          <hr />

          <!-- Total -->
          <div class="flex justify-between font-semibold">
            <span>Total à payer</span>
            <span>{{ rep.total_a_payer }}</span>
          </div>

          <!-- Statut -->
          <div class="text-xs text-neutral-500">
            Statut : {{ rep.statut }}
          </div>
        </div>

      </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
