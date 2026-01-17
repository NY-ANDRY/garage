<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { motion, AnimatePresence, cubicBezier } from 'motion-v';
import { useFirestoreData } from '@/composables/userFirestoreData';

const { data } = useFirestoreData("reparations");</script>

<template>
  <ion-page>
    <Header title="Tabb 1"></Header>
    <ion-content :fullscreen="true">

      <div class="flex flex-col">
        <AnimatePresence mode="popLayout">
          <motion.div v-for="(item, index) in data" :key="item.id + item.score" layout :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }" :exit="{ opacity: 0 }" :transition="{ duration: 0.3 }">
            <div class="flex p-4">
              {{ item }}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </ion-content>
  </ion-page>
</template>
