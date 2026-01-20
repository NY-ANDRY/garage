<script setup lang="ts">
import { motion } from "motion-v"
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="w-full h-full flex items-center justify-center">
    <div class="flex" v-if="user">
      <img :src="user.photoURL || ''" alt="" class="w-8 h-8">
    </div>
    <svg v-else width="17" height="21" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 20C16 17.2018 12.6421 14.9333 8.5 14.9333C4.35786 14.9333 1 17.2018 1 20M8.5 11.1333C5.73858 11.1333 3.5 8.86491 3.5 6.06667C3.5 3.26842 5.73858 1 8.5 1C11.2614 1 13.5 3.26842 13.5 6.06667C13.5 8.86491 11.2614 11.1333 8.5 11.1333Z"
        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </motion.div>
</template>
