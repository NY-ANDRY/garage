<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import dogAnimation from '../assets/animations/Car_revolving_animation.json';
import { useAuthStore} from '@/stores/auth';
import { ref } from 'vue';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';
import { useRouter } from 'vue-router';
import Button from '@/components/buttons/Button.vue';
import ButtonSecondary from '@/components/buttons/ButtonSecondary.vue';
import TextInput from '@/components/input/TextInput.vue';
import { motion, AnimatePresence } from 'motion-v';
import { motionFade, motionSwap } from '@/components/animations/motionBind';

const loginForm = ref(true);
const { user, login, register } = useAuthStore();
const { mutate, loading: loadingCreate, error: errorCreate } = useFirestoreMutation("users");
const router = useRouter();

const loading = ref<boolean>(false);
const email = ref<string>('abc@gmail.com');
const password = ref<string>('abcabcabcabc');

const toggleForm = () => {
  loginForm.value = !loginForm.value;
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  loading.value = true;
  try {


    if (loginForm.value) {
      await login(email.value, password.value);
    } else {
      await register(email.value, password.value);
    }

    router.replace('/tabs/home');
  } catch (error: any) {
    alert("Erreur : " + error.message);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <LoadingWrapper :loading="loading" :animationData="dogAnimation" :width="400" :height="400">

        <div class="flex flex-col flex-1 pb-28 items-center justify-center p-4">

          <div class="w-full min-h-full flex flex-col gap-6 items-center">
            <AnimatePresence mode="popLayout">
              <motion.div v-if="loginForm" v-bind="motionSwap"
                class="w-full text-2xl tracking-wider font-[interT-b] uppercase">Sign In</motion.div>
              <motion.div v-else v-bind="motionSwap" class="w-full text-2xl tracking-wider font-[interT-b] uppercase">
                Register
              </motion.div>
            </AnimatePresence>

            <TextInput label="Email" v-model="email" type="text" placeholder="email@gmail.com" />
            <TextInput label="Password" v-model="password" type="password" placeholder="Ex: 2023" />

            <div class="flex flex-col w-full gap-2">
              <div class="flex w-full gap-2">
                <Button @click="handleSubmit">Validate</Button>
              </div>
              <div class="flex w-full gap-2">
                <ButtonSecondary @click="toggleForm">
                  <AnimatePresence mode="popLayout">

                    <motion.div v-if="loginForm" v-bind="motionFade" class="flex items-center justify-center">Register</motion.div>
                    <motion.div v-else v-bind="motionFade" class="flex items-center justify-center">Login</motion.div>
                  </AnimatePresence>
                </ButtonSecondary>
              </div>
            </div>

          </div>

        </div>

      </LoadingWrapper>

    </ion-content>
  </ion-page>
</template>