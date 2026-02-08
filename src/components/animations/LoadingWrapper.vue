<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Vue3Lottie } from 'vue3-lottie';
import { motion } from 'motion-v';
import { motionFade } from '@/components/animations/motionBind';

defineProps<{
  loading: boolean
  animationData?: any
  width?: number
  height?: number
}>()

</script>

<template>
  <AnimatePresence mode="wait">

    <motion.div v-if="loading" key="loading" v-bind="motionFade"
      class="flex w-full min-h-full items-center justify-center">
      <Vue3Lottie v-if="animationData" :animationData="animationData" :height="height ?? 400" :width="width ?? 400" />
      <slot name="loadingIcon" v-else> </slot>
    </motion.div>

    <motion.div v-else v-bind="motionFade" class="flex-1 flex flex-col w-full min-h-full lw">
      <slot> </slot>
    </motion.div>

  </AnimatePresence>

</template>
