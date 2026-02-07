<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../assets/animations/Car.json';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import { Voiture } from '@/types/types';
import { motion } from 'motion-v';
import CarBox from '@/components/car/CarBox.vue';
import Create from '../components/car/CarCreate.vue';
import { motionFade } from '@/components/animations/motionBind';

const { data, loading } = useFirestoreCollection<Voiture>("voitures");

</script>

<template>
  <ion-page>
    <Header title="Tab Car"> </Header>

    <ion-content fullscreen>
      <h6 class="font-inter-l capitalize text-sm text-neutral-400">voitures</h6>
      <Create />
      <div class="flex">
        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">
          <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-4">
            <CarBox v-for="item in data" :key="item.id" :item="item" />
          </motion.div>
        </LoadingWrapper>
      </div>
    </ion-content>
  </ion-page>
</template>
