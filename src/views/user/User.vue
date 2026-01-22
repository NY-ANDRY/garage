<script setup lang="ts">
import { IonPage, IonContent, IonItem } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import dogAnimation from '../../assets/animations/Cute_Doggie.json';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import Button from '@/components/buttons/Button.vue';
import { useRouter } from 'vue-router';

const { user, logout } = useAuthStore();
const loading = ref(false);

const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.replace('/auth/login');
}

</script>

<template>
  <ion-page>
    <Header title="Connexion"></Header>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="dogAnimation" :width="400" :height="400">

        <Button color="danger" @click="handleLogout">Déconnexion</Button>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>
