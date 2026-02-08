<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { ref } from "vue";
import { Notification } from "@/types/types";
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import { Timestamp } from "firebase/firestore";
import { motionFade } from '@/components/animations/motionBind';

const props = defineProps<{ item: Notification }>();

const { mutate, loading, error } = useFirestoreMutation("notifications");

const selected = ref<boolean>(false);

const pressEffect = { scale: 0.98 };

const handleRead = () => {
  if (!props.item.read) {
    mutate({ read: Timestamp.now() }, { type: 'update', id: props.item.id });
  }
  selected.value = !selected.value;

}

</script>

<template>
  <motion.div @click="handleRead" :while-press="pressEffect" layout
    class="relative flex h-full justify-between pr-5 gap-2 transition-all overflow-hidden">

    <AnimatePresence mode="wait">
      <motion.div v-if="!item.read" v-bind="motionFade"
        class="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full"></motion.div>
    </AnimatePresence>

    <div class="flex-1 h-full flex flex-col">

      <div class="flex text-lg capitalize pt-1">
        {{ item.title }}
      </div>
      <div class="flex text-neutral-400 text-sm transition-all"
        :class="selected ? 'whitespace-normal' : 'whitespace-nowrap'">
        {{ item.description }}
      </div>


    </div>
  </motion.div>
</template>
