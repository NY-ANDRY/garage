<script setup lang="ts">
import { motion } from "motion-v"

const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="w-full min-w-full h-full flex items-center justify-center">
    <svg class="icon-stroke" width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10H16M2 2H16" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </motion.div>
</template>
