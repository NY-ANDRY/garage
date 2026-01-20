<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, } from '@ionic/vue';
import { useFirestoreData } from '@/composables/userFirestoreData';
import { motion } from 'motion-v';
import catAnimation from '../assets/animations/Running_Cat.json';
import NotificationBox from '@/components/box/NotificationBox.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import { Notification } from '@/types/notification';

const { data, loading } = useFirestoreData<Notification>("notifications");

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Inbox' : '';
};

const motionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="default-screen flex flex-col gap-2">

        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

          <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-3">
            <NotificationBox v-for="item in data" :key="item.id" :item="item" />
          </motion.div>

        </LoadingWrapper>

      </div>

    </ion-content>
  </ion-page>
</template>