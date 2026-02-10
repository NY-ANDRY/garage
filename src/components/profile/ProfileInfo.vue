<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { mailOutline, phonePortraitOutline } from 'ionicons/icons';
import { User } from '@/types/types';

defineProps<{
    user: User | null;
}>();
</script>

<template>
    <div class="bg-white mx-4 mb-5 overflow-hidden flex flex-col gap-2">
        <div class="flex px-4 text-sm text-neutral-400 capitalize">information</div>

        <div class="flex flex-col bg-neutral-100 rounded-3xl px-4">

            <!-- Email -->
            <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 bg-white rounded-lg">
                        <ion-icon :icon="mailOutline" class="text-xl text-black"></ion-icon>
                    </div>
                    <span class="text-sm text-neutral-700">Email</span>
                </div>
                <span class="text-sm text-gray-500 truncate max-w-50">{{ user?.email || 'N/A' }}</span>
            </div>

            <div class="flex w-full h-px bg-neutral-300"></div>

            <!-- FCM Token -->
            <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 bg-white rounded-lg">
                        <ion-icon :icon="phonePortraitOutline" class="text-xl text-black"></ion-icon>
                    </div>
                    <span class="text-sm text-neutral-700">FCM Token</span>
                </div>
                <span class="text-sm text-gray-500 truncate max-w-50">{{ user?.fcmToken || 'Not set' }}</span>
            </div>

        </div>
    </div>
</template>
