<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import ProfileInfo from '@/components/profile/ProfileInfo.vue';
import LogoutButton from '@/components/profile/LogoutButton.vue';
import EditProfileModal from '@/components/profile/EditProfileModal.vue';
import { logOutOutline } from 'ionicons/icons';

const authStore = useAuthStore();
const { user } = authStore;
const router = useRouter();

const isEditModalOpen = ref(false);

const toggleEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value;
};

const handleLogout = async () => {
  await authStore.logout();
  router.replace('/auth/login');
};
</script>

<template>
  <ion-page>
    <Header title="Profile"></Header>
    <ion-content :fullscreen="true" class="bg-gray-50">
      <div class="max-w-2xl mx-auto pb-10">
        <!-- Profile Header -->
        <ProfileHeader :user="user" @edit-profile="toggleEditModal" />

        <!-- Profile Info (Email, FCM Token) -->
        <ProfileInfo :user="user" />

        <!-- Logout Button -->
        <!-- <LogoutButton @logout="handleLogout" /> -->

        <div class="bg-white mx-4 mb-5 overflow-hidden flex flex-col gap-2">

          <div v-on:click="handleLogout"
            class="flex flex-col bg-neutral-100 rounded-3xl px-4 py-4 text-red-500 hover:scale-95 focus:scale-90 transition-all">

            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center p-2 bg-white rounded-lg">
                <ion-icon :icon="logOutOutline" class="text-xl"></ion-icon>
              </div>
              <div class="flex text-sm">logout</div>
            </div>

          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <EditProfileModal :is-open="isEditModalOpen" :user="user" @close="toggleEditModal" @updated="toggleEditModal" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* No extra styles needed here as modal handles its own padding */
</style>
