<script setup lang="ts">
import { motion } from "motion-v"
import { useAuth } from '@/composables/useAuth';
import avatarr from '@/assets/svg/avatar.svg';
const { user } = useAuth();
const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="w-full h-full flex items-center justify-center">
    <div class="flex" v-if="user && user.photoURL && user.photoURL != ''">
      <img :src="user.photoURL || ''" alt="" class="w-8 h-8">
    </div>
    <img v-else :src="avatarr" alt="" class="w-8 h-8">
    
  </motion.div>
</template>
