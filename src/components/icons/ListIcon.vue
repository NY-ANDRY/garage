<script setup lang="ts">
import { motion } from "motion-v"

const pressEffect = { scale: 0.8 }
</script>

<template>
  <motion.div :while-press="pressEffect" class="w-full h-full flex items-center justify-center">
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.20056 1H11.9603C13.5015 1 14.7922 2.16772 14.9457 3.70117L16.1459 15.7012C16.3225 17.4672 14.9354 19 13.1605 19H4.00037C2.22551 19 0.83841 17.4672 1.01501 15.7012L2.21521 3.70117C2.36871 2.16772 3.65941 1 5.20056 1Z"
        stroke="white" stroke-width="2" />
    </svg>
  </motion.div>
</template>
