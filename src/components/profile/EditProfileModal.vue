<script setup lang="ts">
import { IonModal, IonInput, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
import { ref, watch } from 'vue';
import { User } from '@/types/types';
import { useAuthStore } from '@/stores/auth';
import Button from '@/components/buttons/Button.vue';

const props = defineProps<{
    isOpen: boolean;
    user: User | null;
}>();

const emit = defineEmits<{
    close: [];
    updated: [];
}>();

const authStore = useAuthStore();
const newDisplayName = ref('');
const isUpdating = ref(false);

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        newDisplayName.value = props.user?.displayName || '';
    }
});

const closeModal = () => {
    emit('close');
};

const updateDisplayName = async () => {
    if (!newDisplayName.value.trim() || !props.user) return;

    isUpdating.value = true;
    try {
        await authStore.updateDisplayName(newDisplayName.value.trim());
        emit('updated');
        closeModal();
    } catch (error) {
        console.error('Error updating display name:', error);
    } finally {
        isUpdating.value = false;
    }
};
</script>

<template>
    <ion-modal :is-open="isOpen" @didDismiss="closeModal" :initial-breakpoint="0.8" :breakpoints="[0, 0.8, 0.8]">
        <ion-content class="ion-padding">
            <div class="flex flex-col h-full bg-white">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8 pt-2">
                    <h3 class="text-2xl font-bold text-black">Edit Profile</h3>
                    <button @click="closeModal" class="text-3xl text-gray-400">&times;</button>
                </div>

                <!-- Form -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-3">Display Name</label>
                    <ion-input v-model="newDisplayName" placeholder="Enter your name"
                        class="border-2 border-gray-100 rounded-2xl px-4 py-2 bg-gray-50 h-16 text-lg"></ion-input>
                </div>

                <!-- Footer Buttons -->
                <div class="flex gap-4 pb-6">
                    <Button @click="updateDisplayName" :disabled="isUpdating || !newDisplayName.trim()">
                        {{ isUpdating ? 'Saving...' : 'Save' }}
                    </Button>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped>
ion-input {
    --padding-start: 16px;
    --padding-end: 16px;
}
</style>
