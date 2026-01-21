<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Cat_is_sleeping_and_rolling.json';
import { ref } from 'vue';

const loading = ref<boolean>(true);
</script>

<template>
  <ion-page>
    <Header title="Tabb 3"> </Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <div class="flex flex-col w-full h-full items-center justify-center">
          <h1 class="text-xl font-bold">Contenu chargé !</h1>
          <p>La Lottie ne s’affiche plus car loading = false.</p>
        </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
