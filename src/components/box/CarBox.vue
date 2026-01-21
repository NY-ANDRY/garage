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
  <motion.div @click="handleClick" :while-press="pressEffect" layout class="box relative flex flex-col h-full justify-between p-3 rounded-xl gap-3
           transition-all overflow-hidden bg-neutral-50 border-r-10 w-full"
    :style="{ borderColor: `#${item.couleurHex}` }">

    <img v-if="item.url_img || item.url_img !== ''" :src="ph" class="w-full max-w-full max-h-36 rounded-sm" />
    <!-- <img v-else :src="ph" class="w-full max-w-full max-h-36 rounded-sm" /> -->

    <div class="flex-1 flex flex-col py-2 gap-1">

      <div class="flex items-center justify-between font-[inter-m]">
        <div class="flex">{{ item.nom }}</div>
        <div class="flex">{{ item.marque }}</div>
      </div>

      <div class="flex text-sm text-neutral-500 justify-between wrap-break-word">
        <div class="flex">
          {{ item.description }}
        </div>
        <div class="flex rounded-sm overflow-hidden">
          <!-- <ColorPicker disabled v-model="color" /> -->
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