<script setup lang="ts">
import { motion } from "motion-v";
import ph from "../../assets/svg/ph-2.svg";
import { Voiture } from "@/types/voitures";
import ColorPicker from 'primevue/colorpicker';
import { ref } from "vue";

const props = defineProps<{ item: Voiture }>();


const pressEffect = { scale: 1 };

const handleRead = () => {
}

const color = ref("000000");
</script>

<template>
  <motion.div @click="handleRead" :while-press="pressEffect" layout class="box relative flex flex-col h-full justify-between p-3 rounded-xl gap-3
           transition-all overflow-hidden bg-neutral-100">

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
          <ColorPicker disabled v-model="color" />
        </div>
      </div>

    </div>

    <div class="flex justify-between gap-2 text-neutral-400 text-sm">
      <div class="flex">{{ item.couleurHex }}</div>
      <div class="flex">{{ item.annee }}</div>
    </div>
  </motion.div>
</template>

<style>
.box .p-colorpicker-preview {
  width: 20px !important;
  height: 20px !important;
}
</style>