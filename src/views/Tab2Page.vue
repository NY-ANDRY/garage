<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<template>
  <ion-page>
    <Header title="Tabb 2"></Header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>
