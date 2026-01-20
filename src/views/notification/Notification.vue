<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, } from '@ionic/vue';
import { useFirestoreData } from '@/composables/userFirestoreData';
import { motion } from 'motion-v';
import catAnimation from '../../assets/animations/Running_Cat.json';
import NotificationBox from '@/components/box/NotificationBox.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import { Notification } from '@/types/notification';
import { Preferences } from '@capacitor/preferences';

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

        <div class="flex flex-col">
          <ion-item>
            <p style="word-break: break-all; color: var(--ion-color-primary);">
              {{ savedToken || 'Chargement ou aucun token...' }}
            </p>
          </ion-item>

          <ion-button @click="sendToken">
            send
          </ion-button>

          <ion-input :value="savedToken"></ion-input>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>