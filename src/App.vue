<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

</script>

<template>
  <ion-app>
    <UApp :toaster="{ position: 'top-right', duration: 3000 }">
      <ion-router-outlet />
    </UApp>
  </ion-app>
</template>
