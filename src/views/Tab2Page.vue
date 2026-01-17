<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/vue';
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
    </ion-content>
  </ion-page>
</template>
