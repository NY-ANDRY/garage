<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { provideAuth } from './composables/useAuth';

provideAuth();
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
