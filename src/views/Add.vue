<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useFirestoreData } from '@/composables/userFirestoreData';
import { AnimatePresence } from 'motion-v';
import ph from "../assets/svg/ph-1.svg";
import InterventionBox from "@/components/box/InterventionBox.vue";

import { Vue3Lottie } from 'vue3-lottie';
import catAnimation from '../assets/animations/Running_Cat.json';
import { motion } from 'motion-v';

const { data, loading } = useFirestoreData("interventions");

const selected = ref<any[]>([]);

const toggleSelect = (item: any) => {
  const index = selected.value.findIndex(i => i.id === item.id);

  if (index !== -1) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(item);
  }
};

const isSelected = (id: any) => {
  return selected.value.some(i => i.id === id)
}
const motionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

</script>
<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">
        <div class="default-screen flex flex-col gap-2">

        <AnimatePresence mode="wait">

          <motion.div v-if="loading" key="loading" v-bind="motionFade"
            class="flex w-full h-full items-center justify-center">
            <Vue3Lottie :animationData="catAnimation" :height="400" :width="400" />
          </motion.div>

          <motion.div v-else key="data" v-bind="motionFade" class="grid grid-cols-2 gap-3">
            <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
              :placeholder="ph" @toggle="toggleSelect" />
          </motion.div>

        </AnimatePresence>

        </div>
    </ion-content>
  </ion-page>
</template>
