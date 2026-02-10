<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../assets/animations/Car.json';
import { motion } from 'motion-v';
import CarBox from '@/components/car/CarBox.vue';
import Create from '../components/car/CarCreate.vue';
import { motionFade } from '@/components/animations/motionBind';
import { useFirestoreVoitures } from '@/composables/useFirestoreVoitures';
import EmptyCar from '@/components/empty/EmptyCar.vue';

const { data, loading } = useFirestoreVoitures();

</script>

<template>
  <ion-page>
    <Header title="Tab Car"> </Header>

    <ion-content fullscreen>
      <h2 class="font-inter-b text-neutral-800 mb-6!">Voitures</h2>
      <div class="flex pb-4">
        <Create />
      </div>
      <div class="flex">
        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">
          <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-4">
            <CarBox v-if="data && data.length" v-for="item in data" :key="item.id" :item="item" />
            <div v-else class="flex">
              <EmptyCar />
            </div>
          </motion.div>
        </LoadingWrapper>
      </div>
    </ion-content>
  </ion-page>
</template>
