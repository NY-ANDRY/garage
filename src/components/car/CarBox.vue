<script setup lang="ts">
import { motion } from "motion-v";
import ph from "../../assets/svg/ph-2.svg";
import { Voiture } from "@/types/types";

const props = defineProps<{ item: Voiture }>();
const emit = defineEmits<{
  (e: "click"): void
}>()

const pressEffect = { scale: 0.97 };

const handleClick = () => {
  emit('click');
}

</script>

<template>
  <motion.div @click="handleClick" :while-press="pressEffect" layout class="box relative flex flex-col justify-between pl-3 pr-1 gap-1
           transition-all overflow-hidden border-l-6 w-full rounded" :style="{ borderColor: `#${item.couleurHex}` }">

    <img v-if="item.url_img || item.url_img !== ''" :src="ph" class="w-full max-w-full max-h-36" />

    <div class="flex-1 flex flex-col py-0 gap-0">

      <div class="flex items-center justify-between font-[inter-m]">
        <div class="flex">{{ item.nom }}</div>
        <div class="flex">{{ item.marque }}</div>
      </div>

      <div class="flex text-sm text-neutral-500 justify-between wrap-break-word">
        <div class="flex">
          {{ item.description }}
        </div>
        <div class="flex rounded-sm overflow-hidden">
        </div>
      </div>

    </div>

    <div class="flex justify-between gap-2 text-neutral-400 text-sm">
      <div class="flex">{{ item.annee }}</div>
      <div class="flex">#{{ item.couleurHex }}</div>
    </div>
  </motion.div>
</template>

<style>
.box .p-colorpicker-preview {
  width: 20px !important;
  height: 20px !important;
}
</style>