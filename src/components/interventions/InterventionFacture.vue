<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Intervention } from '@/types/types'
import { computed } from 'vue'

const props = defineProps<{
  items: Intervention[]
}>()

const columns: TableColumn<Intervention>[] = [
  {
    accessorKey: 'nom',
    header: 'Nom'
  },
  {
    accessorKey: 'prix',
    header: 'Prix',
    cell: ({ row }) => row.original.prix.toFixed(2)
  },
  {
    accessorKey: 'duree',
    header: 'Durée'
  }
]

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
    <UTable :data="data" :columns="columns" sticky class="mb-4" />

    <div class="flex justify-end w-full text-sm">
      <div class="flex flex-col w-1/2">
        <div class="flex justify-between">
          <span>
            Total:
          </span>
          <span>
            {{ total.toFixed(2) }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>
            Durée totale:
          </span>
          <span>
            {{ totalDuration }}
          </span>
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