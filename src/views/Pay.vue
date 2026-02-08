<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import PayForm from '@/components/pay/PayForm.vue';

</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content fullscreen>

        <PayForm />

    </ion-content>
  </ion-page>
</template>
