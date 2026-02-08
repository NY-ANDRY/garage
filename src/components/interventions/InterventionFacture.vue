<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Intervention } from '@/types/types'
import { computed } from 'vue'
import InterventionBox from './InterventionBox.vue';
const props = defineProps<{
  items: Intervention[]
}>()


const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.prix, 0)
)
const totalDuration = computed(() =>
  props.items.reduce((sum, item) => sum + item.duree, 0)
)
const data = computed(() => props.items)
</script>

<template>
  <div v-if="!items || items.length <= 0" class="flex"></div>
  <div v-else class="pt-2 pb-4 bg-white rounded-lg w-full max-w-md mx-auto">

    <div class="flex flex-col gap-2 pb-4">
      <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="false" />
    </div>

    <div class="flex justify-end w-full text-sm">
      <div class="flex flex-col w-1/2">
        <div class="flex justify-between items-end">
          <div>
            Total:
          </div>
          <div class="font-inter-b text-xl">
            {{ total.toFixed(2) }}
          </div>
        </div>
        <div class="flex justify-between items-end">
          <div>
            Durée totale:
          </div>
          <div class="font-inter-b text-xl">
            {{ totalDuration }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
/* tr th{
 font-family:
} */
</style>