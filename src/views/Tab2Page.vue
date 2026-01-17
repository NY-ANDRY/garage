<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { Preferences } from '@capacitor/preferences';

const savedToken = ref<any>('');

const loadToken = async () => {
  const { value } = await Preferences.get({ key: 'fcm_token_debug' });
  savedToken.value = value;
};

onMounted(() => {
  loadToken();
});


// Fonction pour envoyer le token au serveur
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
    <Header title="Tabb 2"></Header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab </ion-title>
        </ion-toolbar>
      </ion-header>

          <ion-item>
            <p style="word-break: break-all; color: var(--ion-color-primary);">
              {{ savedToken || 'Chargement ou aucun token...' }}
            </p>
          </ion-item>

          <ion-button @click="sendToken">
            send
          </ion-button>
    </ion-content>
  </ion-page>
</template>
