<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Vue3Lottie } from 'vue3-lottie';
import { motion } from 'motion-v';

defineProps<{
    loading: boolean
    animationData?: any // animation dynamique
    width?: number
    height?: number
}>()

const motionFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};
</script>

<template>
  <AnimatePresence mode="wait">

    <!-- Placeholder dynamique -->
    <motion.div v-if="loading" key="loading" v-bind="motionFade"
      class="flex w-full h-full items-center justify-center">

      <!-- Animation dynamique -->
      <Vue3Lottie 
        v-if="animationData" 
        :animationData="animationData" 
        :height="height ?? 400" 
        :width="width ?? 400" 
      />

      <!-- Ou fallback icon si pas d'animation -->
      <slot name="loadingIcon" v-else></slot>
      
    </motion.div>

    <!-- Contenu réel -->
    <motion.div v-else v-bind="motionFade" class="flex flex-col w-full h-full">
      <slot></slot>
    </motion.div>

  </AnimatePresence>
</template>
