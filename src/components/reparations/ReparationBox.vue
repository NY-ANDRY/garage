<script setup lang="ts">
import { motion } from "motion-v";
import { Reparation } from "@/types/types";
import { formatTime, formatDate } from "@/lib/utils";
import { computed } from "vue";
import { getStatutName } from "@/lib/constant";
import { useStatut } from "@/composables/useStatut";

const { getStatutBadge } = useStatut()
const rep = defineProps<{
    reparation: Reparation
    isSelected?: boolean
}>()

const emit = defineEmits<{
    (e: "toggle", item: any): void
}>()

const nbInterv = computed(() => (rep.reparation.interventions.length))
const nbIntervOk = computed(() => {
    return rep.reparation.interventions?.filter(el => el.statut > 1).length ?? 0
})

const pressEffect = { scale: 0.99 };
</script>

<template>
    <motion.div :while-press="pressEffect" @click="emit('toggle', reparation)" class="w-full grid grid-cols-10">

        <div class="col-span-3 border-r border-neutral-200 flex flex-col pb-8">
            <div class="flex font-inter-l text-neutral-700">{{ formatDate(reparation.date) }}</div>
            <div class="flex font-inter-l text-neutral-500">{{ formatTime(reparation.date) }}</div>
        </div>

        <div class="col-span-7 pl-4 text-neutral-900 pb-6">
            <div class="flex justify-between bg-neutral-100 rounded-2xl p-4.5">

                <div class="flex flex-col">
                    <div class="flex font-inter-b">
                        {{ reparation.voiture.nom }}
                    </div>
                    <div class="flex text-sm">
                        {{ reparation.voiture.marque }}
                    </div>
                    <div class="flex items-center gap-2 pt-2 relative">
                        <div class="w-2/3 h-3 rounded-xs"
                            :style="{ backgroundColor: `#${reparation.voiture.couleurHex}` }"></div>
                    </div>

                    <div class="flex h-8">

                    </div>

                    <div class="flex font-inter-l text-neutral-700 text-sm pt-1 pb-0">
                        <UBadge size="sm" v-bind="getStatutBadge(reparation.statut)" />
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <div class="flex font-inter-m text-neutral-600">
                        {{ nbIntervOk }} / {{ nbInterv }}
                    </div>
                </div>

            </div>
        </div>

    </motion.div>
</template>
