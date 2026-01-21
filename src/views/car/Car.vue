<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Car.json';
import { useFirestoreData } from '@/composables/userFirestoreData';
import { Voiture } from '@/types/types';
import { motion } from 'motion-v';
import CarBox from '@/components/box/CarBox.vue';
import Create from './CarCreate.vue';
import { motionFade } from '@/components/animations/motionBind';

const { data, loading } = useFirestoreData<Voiture>("voitures");

</script>

<template>
  <ion-page>
    <Header title="Tab Car"> </Header>

    <ion-content fullscreen>
      <LoadingWrapper
        :loading="loading"
        :animationData="catAnimation"
        :width="400"
        :height="400"
      >
        <Create />

        <motion.div
          key="data"
          v-bind="motionFade"
          class="grid grid-cols-1 gap-4"
        >
          <CarBox
            v-for="item in data"
            :key="item.id"
            :item="item"
          />
        </motion.div>
      </LoadingWrapper>
    </ion-content>
  </ion-page>
</template>

