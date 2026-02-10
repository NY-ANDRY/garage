<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { motion, AnimatePresence } from 'motion-v';
import { motionFade, motionSwap } from '@/components/animations/motionBind';
import TextInput from '@/components/input/TextInput.vue';
import { useToast } from '@nuxt/ui/runtime/composables/useToast';

const toast = useToast();
const loginForm = ref(true);
const { login, register } = useAuthStore();
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
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error'
    })
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <form @submit.prevent="handleSubmit" class="flex flex-col w-full min-h-full">

        <div class="flex flex-col flex-1 pb-12 items-center justify-center p-4 gap-8">

          <div class="w-full min-h-full flex flex-col gap-6 items-center">

            <AnimatePresence mode="popLayout">
              <motion.div v-if="loginForm" v-bind="motionSwap"
                class="w-full text-2xl tracking-wider font-[inter-sb] capitalize">Sign In</motion.div>
              <motion.div v-else v-bind="motionSwap" class="w-full text-2xl tracking-wider font-[inter-sb] capitalize">
                Register
              </motion.div>
            </AnimatePresence>

            <TextInput label="Email" v-model="email" type="text" placeholder="email@gmail.com" />
            <TextInput label="Password" v-model="password" type="password" placeholder="Ex: 2023" />

          </div>

          <div class="flex flex-col w-full gap-4 mt-4">
            <div class="flex w-full gap-2 rounded-xl mt-2 overflow-hidden">
              <UButton type="submit" :loading="loading" loading-icon="i-lucide-loader" block
                class="w-full h-12 flex justify-center text-lg">Validate</UButton>
            </div>
            <div class="flex w-full gap-2 h-12 ">
              <UButton @click="toggleForm" color="ghost" class="bg-neutral-10 w-full flex justify-center text-base">
                <AnimatePresence mode="popLayout">
                  <motion.div v-if="loginForm" v-bind="motionFade" class="flex items-center justify-center text-black">
                    Register
                  </motion.div>
                  <motion.div v-else v-bind="motionFade" class="flex items-center justify-center text-black">Login
                  </motion.div>
                </AnimatePresence>
              </UButton>
            </div>
          </div>

          <div class="flex"></div>
        </div>

      </form>

    </ion-content>
  </ion-page>
</template>