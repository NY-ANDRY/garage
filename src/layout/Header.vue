<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
defineProps({
  title: String,
});
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <div class="flex h-full w-full px-2">
        <ion-title>{{ title }}</ion-title>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<style>
.header-md {
  box-shadow: none;
}
</style>