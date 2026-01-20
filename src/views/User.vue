<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import dogAnimation from '../assets/animations/Cute_Doggie.json';
import { ref } from 'vue';

import { useAuth } from '@/composables/useAuth';

const { login, logout } = useAuth();

const loading = ref<boolean>(false);

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


          <div class="flex flex-col gap-4">
            <!-- <ion-button @click="login"> -->
              <!-- login redirect -->
            <!-- </ion-button> -->
            <ion-button @click="login">
              login popup
            </ion-button>
            <ion-button @click="logout">
              logout
            </ion-button>
          </div>

        </LoadingWrapper>

      </div>
    </ion-content>
  </ion-page>
</template>
