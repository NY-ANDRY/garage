<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useFirestoreData } from '@/composables/userFirestoreData';
import InterventionBox from "@/components/box/InterventionBox.vue";
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
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

        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

          <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-3">
            <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
              @toggle="toggleSelect" />
          </motion.div>

        </LoadingWrapper>

      </div>
    </ion-content>
  </ion-page>
</template>
