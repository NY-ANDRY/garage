<script setup lang="ts">
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '@/assets/animations/Car.json';
import ReparationBox from '@/components/reparations/ReparationBox.vue';
import { useFirestoreReparation } from '@/composables/useFirestoreReparation';

const { data, loading } = useFirestoreReparation('date');

</script>

<template>

    <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">

        <div class="flex flex-col p-4">

            <div class="grid grid-cols-6 text-neutral-300 capitalize font-inter-m mb-6">
                <div class="col-span-2">Time</div>
                <div class="col-span-4 pl-4">Reparations</div>
            </div>
            <ReparationBox v-for="rep in data" :key="rep.id" :reparation="rep" />

        </div>

    </LoadingWrapper>
</template>
