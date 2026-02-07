<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../assets/animations/Cat_is_sleeping_and_rolling.json';
import { ref } from 'vue';
import { useFirestoreDoc } from '@/composables/useFirestoreDoc';
import { Recuperation, Reparation } from '@/types/types';
import { computed } from 'vue';

const recuperationId = ref<string | null>('1');

const { data: dataRecuperation, loading: loadingRecuperation } = useFirestoreDoc<Recuperation>('recuperations', recuperationId);

const reparationId = computed(() => dataRecuperation.value?.reparation?.id ?? null);

const { data: dataReparation, loading: loadingReparation } = useFirestoreDoc<Reparation>('reparations', reparationId);

</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loadingRecuperation" :animationData="catAnimation" :width="400" :height="400">

        <div class=" flex justify-center">
          {{ dataRecuperation }}
        </div>
        --
        <div class=" flex justify-center">
          {{ dataReparation }}
        </div>

        <Button v-if="dataReparation && dataReparation.statut == 3">Recuperer</Button>
        <Button v-else>Payer</Button>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
