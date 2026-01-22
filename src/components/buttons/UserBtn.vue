<script setup lang="ts">
import { IonItem } from '@ionic/vue';
import CurUserIcon from '@/components/icons/CurUserIcon.vue';
import { motion } from 'motion-v';

defineProps({
    title: String,
});

const whilePress = { scale: 0.95 };

</script>

<template>
    <ion-item :routerLink="'/tabs/user'" class="bg-neutral-50 rounded-full">
        <motion.div :whilePress="whilePress" class="flex items-center gap-3 bg-neutral-50 px-1.5 py-1.5 rounded-full">
            <div class="flex abc w-full h-full pl-2">
                <CurUserIcon></CurUserIcon>
            </div>
            <div class="flex pr-4 font-[interT-b] text-xl tracking-wider">
                USER
            </div>
        </motion.div>
    </ion-item>
</template>

<style>
    a .item-native{
        padding: 0 !important;
    }
</style>