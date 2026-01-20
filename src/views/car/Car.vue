<script setup lang="ts">
import { IonPage, IonContent, IonItem } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Car.json';
import { useFirestoreData } from '@/composables/userFirestoreData';
import { Voiture } from '@/types/voitures';
import { motion } from 'motion-v';
import CarBox from '@/components/box/CarBox.vue';
import Create from './CarCreate.vue';

const { data, loading } = useFirestoreData<Voiture>("voitures");

const motionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};
</script>

<template>
  <ion-page>
    <Header title="Tab Car"></Header>
    <ion-content :fullscreen="true">
      <div class="default-screen">

        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

          <Create />

          <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-3">
            <CarBox v-for="item in data" :key="item.id" :item="item" />
          </motion.div>

        </LoadingWrapper>

      </div>
    </ion-content>
  </ion-page>
</template>
