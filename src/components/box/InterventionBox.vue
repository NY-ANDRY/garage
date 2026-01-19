<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";

defineProps<{
  item: any
  isSelected: boolean
  placeholder: string
}>()

const emit = defineEmits<{
  (e: "toggle", item: any): void
}>()
const pressEffect = { scale: 0.96 };

</script>

<template>
  <motion.div
    :while-press="pressEffect"
    @click="emit('toggle', item)"

    class="relative flex h-full items-center justify-between p-2 rounded-xl gap-2 overflow-hidden
           transition-all bg-neutral-100"
  >
    <!-- Barre de sélection -->
    <AnimatePresence mode="wait">
      <motion.div
        v-if="isSelected"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.1 }"
        class="absolute top-0 right-0 w-1.5 h-full rounded-full bg-red-400"
      />
    </AnimatePresence>

    <!-- Image -->
    <div class="flex">
      <img
        v-if="!item.images || item.images.length === 0 || item.images[0] === ''"
        :src="placeholder"
        class="w-12 h-12 min-w-12 min-h-12"
      />
      <img
        v-else
        :src="item.images[0]"
        class="w-12 h-12 min-w-12 min-h-12"
      />
    </div>

    <!-- Texte -->
    <div class="flex-1 h-full flex flex-col justify-between">
      <div class="font-[figtree-m] text-base capitalize whitespace-nowrap">
        {{ item.nom }}
      </div>

      <div class="flex gap-2 text-neutral-400">
        <span>{{ item.duree }}{{ $t('second') }}</span>
        <span>-</span>
        <span>{{ item.prix }}{{ $t('currency') }}</span>
      </div>
    </div>
  </motion.div>
</template>
