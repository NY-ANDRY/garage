<script setup lang="ts">
import { motion } from "motion-v"

const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="w-full h-full flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#323232"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-credit-card-icon lucide-credit-card">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  </motion.div>
</template>
