<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { User } from '@/types/types';
import Button from '@/components/buttons/Button.vue';
import { mailOutline, phonePortraitOutline, createOutline } from 'ionicons/icons';

const props = defineProps<{
    user: User | null;
}>();

const emit = defineEmits<{
    editProfile: [];
}>();

const username = computed(() => {
    if (!props.user?.email) return '';
    return '@' + props.user.email.split('@')[0];
});
</script>

<template>
    <div class="bg-white px-6 py-10 text-center mb-6">
        <!-- Avatar -->
        <div class="flex justify-center mb-4">
            <div v-if="user?.photoURL" class="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                <img :src="user.photoURL" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <div v-else
                class="w-24 h-24 rounded-full bg-gray-100 border-2 border-black flex items-center justify-center">
                <ion-icon :icon="personCircleOutline" class="text-6xl text-gray-400"></ion-icon>
            </div>
        </div>

        <!-- Display Name -->
        <h2 class="text-2xl font-bold text-black mb-1">
            {{ user?.displayName || 'User' }}
        </h2>

        <!-- Username -->
        <p class="text-sm text-gray-500 mb-6">{{ username }}</p>

        <div @click="emit('editProfile')" class="flex justify-center gap-2">
            <div class="flex justify-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-4xl relative">
                <!-- <ion-icon :icon="createOutline" class="text-2xl text-black"></ion-icon> -->
                <div class="flex font-inter-l relative top-px">Edit profile</div>
            </div>
        </div>
        <!-- Edit Profile Button -->
        <!-- <div class="flex justify-center px-10">
            <Button @click="emit('editProfile')">
                Edit Profile
            </Button>
        </div> -->
    </div>
</template>
