<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import ReparationsList from '@/components/reparations/ReparationsList.vue';


</script>

<template>
  <ion-page>
    <Header title="Tabb 1"> </Header>
    <ion-content :fullscreen="true">

      <div class="flex">
        
      </div>
      <ReparationsList />

    </ion-content>
  </ion-page>
</template>
