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
  <motion.div :while-press="pressEffect" @click="emit('toggle', item)" class="relative flex h-full items-center justify-between p-2.5 pr-5 rounded-xl gap-2.5 overflow-hidden
           transition-all bg-neutral-50">
    <AnimatePresence mode="wait">
      <motion.div v-if="isSelected" v-bind="motionFade" class="absolute top-0 right-0 w-2.5 h-full bg-red-400" />
    </AnimatePresence>

    <div class="flex">
      <img v-if="!item.image || item.image === ''" :src="ph"
        class="w-12 h-12 min-w-12 min-h-12 rounded-full" />
      <img v-else :src="item.image" class="w-12 h-12 min-w-12 min-h-12" />
    </div>

    <div class="flex-1 h-full flex flex-col justify-between">
      <div class="flex items-center justify-between font-[inter-m] text-neutral-500 text capitalize whitespace-nowrap">
        <div class="flex flex-col">
          <div class="flex">
            {{ item.nom }}
          </div>
        </div>

        <div class="flex items-center gap-0.5 font-[interT-m] relative">
          <span class="text-[14px] relative bottom-px">{{ $t('currency') }} </span>
          <span>{{ item.prix }}</span>
        </div>
      </div>

      <div class="flex justify-between gap-2 text-neutral-400 text-sm">
        <div class="flex gap-px">
          <span>
            {{ item.duree }}
          </span>
          <span>
            {{ $t('second') }}
          </span>
        </div>

        <div>
          <span>
            +
          </span>
          <span>
            {{ $t('currency') }}0.00
          </span>
        </div>
      </div>
    </div>
  </motion.div>
</template>
