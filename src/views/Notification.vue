<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, } from '@ionic/vue';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import { motion } from 'motion-v';
import catAnimation from '../assets/animations/Running_Cat.json';
import NotificationBox from '@/components/notifications/NotificationBox.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import { Notification } from '@/types/types';
import { Preferences } from '@capacitor/preferences';
import { motionFade } from '@/components/animations/motionBind';

const { data, loading } = useFirestoreCollection<Notification>("notifications");

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Inbox' : '';
};

const savedToken = ref<any>('');

const loadToken = async () => {
  const { value } = await Preferences.get({ key: 'fcm_token' });
  savedToken.value = value;
};

onMounted(() => {
  loadToken();
});

const sendToken = async () => {
  if (!savedToken.value) {
    console.warn('Pas de token à envoyer.');
    return;
  }

  const encodedToken = encodeURIComponent(savedToken.value);
  const url = `https://garage-api-eta.vercel.app/send?token=${encodedToken}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (err) {
    console.error('Erreur lors de l’envoi du token :', err);
  }
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar-red">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <motion.div key="data" v-bind="motionFade" class="grid grid-cols-1 gap-4">
          <NotificationBox v-for="item in data" :key="item.id" :item="item" />
        </motion.div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>