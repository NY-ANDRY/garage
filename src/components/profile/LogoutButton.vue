<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import Button from '@/components/buttons/Button.vue';

const emit = defineEmits<{
    logout: [];
}>();
</script>

<template>
    <div class="px-6 mb-10">
        <Button @click="emit('logout')" class="flex items-center justify-center gap-3">
            <ion-icon :icon="logOutOutline" class="text-xl"></ion-icon>
            <span>Log out</span>
        </Button>
    </div>
</template>
