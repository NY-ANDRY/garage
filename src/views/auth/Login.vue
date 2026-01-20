<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import dogAnimation from '../../assets/animations/Cute_Doggie.json';
import { ref } from 'vue';

// Contrôle l'affichage de la Lottie
const loading = ref<boolean>(true); // false = contenu chargé, true = animation Lottie
</script>

<template>
  <ion-page>
    <Header title="Tabb 3"></Header>
    <ion-content :fullscreen="true">
      <div class="default-screen">

        <!-- Wrapper avec animation dynamique -->
        <LoadingWrapper :loading="loading" :animationData="dogAnimation" :width="400" :height="400">

          <!-- Contenu affiché une fois loading = false -->
          <div class="flex flex-col w-full h-full items-center justify-center">
            <h1 class="text-xl font-bold">Contenu chargé !</h1>
            <p>La Lottie ne s’affiche plus car loading = false.</p>
          </div>

        </LoadingWrapper>

      </div>
    </ion-content>
  </ion-page>
</template>
