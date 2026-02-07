<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import ph from "../../assets/svg/ph-1.svg";
import { Intervention } from "@/types/types";
import { motionFade } from '@/components/animations/motionBind';

defineProps<{
  item: Intervention
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: "toggle", item: any): void
}>()

const pressEffect = { scale: 0.97 };
</script>

<template>
  <motion.div :while-press="pressEffect" @click="emit('toggle', item)" class="bg-white rounded-xl gap-2 relative flex h-16 items-center justify-between p-1 pl-2 pr-4 overflow-hidden
           transition-all">
    <AnimatePresence mode="wait">
      <motion.div v-if="isSelected" v-bind="motionFade" class="absolute top-0 right-0 w-2.5 h-full bg-emerald-400" />
    </AnimatePresence>

    <div class="flex">
      <img v-if="!item.image || item.image === ''" :src="ph" class="w-8 h-8 min-w-8 min-h-8 rounded-full" />
      <img v-else :src="item.image" class="w-8 h-8 min-w-8 min-h-8" />
    </div>

    <div class="flex-1 h-full flex flex-col justify-between py-1 max-w-full overflow-hidden">
      <div class="flex items-center justify-between font-[inter-m] text-neutral-500 text capitalize whitespace-nowrap">
        <div class="flex text-sm w-full overflow-hidden">
          {{ item.nom }}
        </div>
      </div>

      <div class="flex justify-between gap-2
        </div> text-neutral-400 text-sm">
        <div class="flex gap-px">
          <span>
            {{ item.duree }}
          </span>
          <span>
            {{ $t('second') }}
          </span>
        </div>

        <span>
          {{ $t('currency') }}{{ item.prix }}
        </span>
      </div>
    </div>
  </motion.div>
</template>
