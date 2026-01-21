<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonItem, IonLabel, IonInput, IonList } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import dogAnimation from '../../assets/animations/Cute_Doggie.json';
import { useAuth } from '@/composables/useAuth';
import { ref } from 'vue';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';
import { User } from '@/types/types';
import { Preferences } from '@capacitor/preferences';

const { user, login, logout } = useAuth();
const { mutate, loading: loadingCreate, error: errorCreate } = useFirestoreMutation("users");

const loading = ref<boolean>(false);
const email = ref<string>('abc@gmail.com');
const password = ref<string>('abcabcabcabc');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  loading.value = true;
  try {
    await login(email.value, password.value);
    const { value } = await Preferences.get({ key: 'fcm_token' });
    const u : User = {
      uid: user.value?.uid,
      email: user.value?.email,
      displayName: user.value?.displayName,
      photoURL: user.value?.phoneNumber,
      fcmToken: value
    }
    mutate(u, { type: 'set', id: user.value?.uid})
  } catch (error: any) {
    alert("Erreur : " + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <ion-page>
    <Header title="Connexion"></Header>
    <ion-content :fullscreen="true">
      <div class="default-screen">

        <LoadingWrapper :loading="loading" :animationData="dogAnimation" :width="400" :height="400">

          <div class="flex flex-col w-full h-full items-center justify-center p-4">

            <div v-if="user" class="text-center">
              <h1 class="text-xl font-bold">Bienvenue !</h1>
              <p class="mb-4">{{ user.email }}</p>
              <ion-button color="danger" @click="logout">Déconnexion</ion-button>
            </div>

            <div v-else class="w-full max-w-sm">
              <h1 class="text-xl font-bold text-center mb-6">Identifiez-vous</h1>

              <ion-list lines="full" class="rounded-lg shadow-sm mb-4">
                <ion-item>
                  <ion-label position="stacked">Email</ion-label>
                  <ion-input v-model="email" type="email" placeholder="votre@email.com"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Mot de passe</ion-label>
                  <ion-input v-model="password" type="password" placeholder="******"></ion-input>
                </ion-item>
              </ion-list>

              <div class="flex flex-col gap-2">
                <ion-button expand="block" @click="handleLogin">
                  Se connecter
                </ion-button>
              </div>
            </div>

          </div>

        </LoadingWrapper>

      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Ajoute un peu d'espace pour le formulaire sur mobile */
ion-list {
  background: transparent;
}
</style>