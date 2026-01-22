<script setup lang="ts">
import { motion } from "motion-v"

const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="flex items-center justify-center bg-neutral-950 rounded-full p-3 shadow-2xl">
    <svg width="14" height="14" viewBox="0 0 21 21"  xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 10.5H10.5M10.5 10.5H19.5M10.5 10.5V19.5M10.5 10.5V1.5" class="stroke-white!" stroke="white" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </motion.div>
</template>
