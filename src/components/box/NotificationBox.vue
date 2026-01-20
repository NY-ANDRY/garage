<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import ph from "../../assets/svg/ph-1.svg";
import { ref } from "vue";
import { Notification } from "@/types/notification";
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import { Timestamp } from "firebase/firestore";

const props = defineProps<{ item: Notification }>();

const { mutate, loading, error } = useFirestoreMutation("notifications");

const selected = ref<boolean>(false);

const pressEffect = { scale: 0.97 };

const handleRead = () => {
  if (!props.item.read) {
    mutate(props.item.id, { read: Timestamp.now() });
  }
  selected.value = !selected.value;

}

const motionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

</script>

<template>
  <motion.div @click="handleRead" :while-press="pressEffect" layout class="relative flex h-full justify-between p-2.5 pr-5 rounded-xl gap-3
           transition-all overflow-hidden bg-neutral-50">

    <AnimatePresence mode="wait">
      <motion.div v-if="!item.read" v-bind="motionFade"
        class="absolute top-2 right-2 w-3.5 h-3.5 bg-cyan-300 rounded-full"></motion.div>
    </AnimatePresence>


    <div class="flex flex-col">
      <img v-if="!item.url_img || item.url_img === ''" :src="ph" class="w-12 h-12 min-w-12 min-h-12 rounded-full" />
      <img v-else :src="item.url_img" class="w-12 h-12 min-w-12 min-h-12" />
    </div>

    <div class="flex-1 h-full flex flex-col">

      <div class="flex text-xl  capitalize pt-1">
        {{ item.title }}
      </div>
      <div class="flex text-neutral-400 text-sm transition-all"
        :class="selected ? 'whitespace-normal' : 'whitespace-nowrap'">
        {{ item.description }}
      </div>


    </div>

    <div class="flex justify-between gap-2 text-neutral-400 text-sm">

    </div>
  </motion.div>
</template>
