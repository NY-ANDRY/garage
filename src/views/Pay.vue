<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import PayForm from '@/components/pay/PayForm.vue';

</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content fullscreen>
      <h2 class="font-inter-b text-neutral-800">Voiture a recuperer</h2>

      <div class="flex flex-col min-h-full">
        <PayForm />
      </div>

    </ion-content>
  </ion-page>
</template>
