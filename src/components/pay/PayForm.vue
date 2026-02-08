<script setup lang="ts">
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '@/assets/animations/Car_Animation2.json';
import emptyAnimation from '@/assets/animations/loading_carrr.json';
import { ref } from 'vue';
import { useFirestoreDoc } from '@/composables/useFirestoreDoc';
import { Recuperation, Reparation } from '@/types/types';
import { computed } from 'vue';
import ReparationBox from '@/components/reparations/ReparationBox.vue';
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import { Vue3Lottie } from 'vue3-lottie';

const { mutate: mutateReparations, loading: loadingMutateReparations, error: errorMutateReparations } = useFirestoreMutation("reparations");
const { mutate: mutateRecuperation, loading: loadingMutateRecuperation, error: errorMutateRecuperation } = useFirestoreMutation("recuperations");

const recuperationId = ref<string | null>('1');

const { data: dataRecuperation, loading: loadingRecuperation } = useFirestoreDoc<Recuperation>('recuperations', recuperationId);

const reparationId = computed(() => dataRecuperation.value?.reparation?.id ?? null);

const { data: dataReparation, loading: loadingReparation } = useFirestoreDoc<Reparation>('reparations', reparationId);

const handlePay = () => {
    mutateReparations({ statut: 3 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
}
const handleRecuperer = () => {
    mutateReparations({ statut: 4 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
    mutateRecuperation({ reparation: { id: '' } }, { type: 'update', id: '1' });
}

</script>

<template>

    <LoadingWrapper :loading="loadingRecuperation" :animationData="catAnimation" :width="400" :height="400">

        <div v-if="dataReparation" class="flex flex-col justify-center w-full h-full gap-4 px-4 py-6 rounded-2xl shadow">
            <div class="flex flex-col gap-2">
                <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">Proprietaire</h6>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">uid</div>
                    <div class="col-span-2">{{ dataReparation.user.uid }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">nom</div>
                    <div class="col-span-2">{{ dataReparation.user.displayName }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">email</div>
                    <div class="col-span-2">{{ dataReparation.user.email }}</div>
                </div>
            </div>

            <!-- <div class="flex flex-col gap-2">
                <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">Voiture</h6>
                <CarBox :item="dataReparation.voiture" />
            </div> -->

            <div class="flex flex-col gap-2">
                <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">Reparation</h6>
                <ReparationBox :reparation="dataReparation" />
            </div>

            <UButton :loading="loadingMutateReparations || loadingMutateRecuperation"  loading-icon="i-lucide-loader" block
                v-if="dataReparation && dataReparation.statut == 3" v-on:click="handleRecuperer"
                class="flex justify-center h-12">Recuperer</UButton>
            <UButton :loading="loadingMutateReparations || loadingMutateRecuperation" v-else v-on:click="handlePay"  loading-icon="i-lucide-loader" block
                class="flex justify-center h-12">Payer
            </UButton>
        </div>

        <div v-else class="flex-1 items-center justify-center">
            EMPTYYYYYY
        </div>

    </LoadingWrapper>
</template>
